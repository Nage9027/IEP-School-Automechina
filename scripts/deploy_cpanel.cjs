/**
 * cPanel Deployment Script for erp.iepsolutions.in
 * Used by GitHub Actions and local command line
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const { execSync } = require('child_process');

// 1. Load .env if present locally
function loadEnv(file) {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const k = trimmed.substring(0, idx).trim();
        const v = trimmed.substring(idx + 1).trim();
        if (!process.env[k]) process.env[k] = v;
      }
    }
  }
}

loadEnv(path.resolve(__dirname, '../.env'));

// 2. Support single combined CPANEL secret (key: value per line)
if (process.env.CPANEL) {
  const lines = process.env.CPANEL.split(/\r?\n/);
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx !== -1) {
      const key = line.substring(0, idx).trim();
      const val = line.substring(idx + 1).trim();
      if (key && val && !process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const CPANEL_USER = process.env.CPANEL_USER || 'root1';
const CPANEL_PASS = process.env.CPANEL_PASS || 'HH#Y@5#&ieps@K8';
const CPANEL_HOST = process.env.CPANEL_HOST || 'iepsolutions.in';
const CPANEL_PORT = parseInt(process.env.CPANEL_PORT || '2083', 10);
// Domain is strictly erp.iepsolutions.in for this website
const DOMAIN = process.env.ERP_CPANEL_DOMAIN || 
  (process.env.CPANEL_DOMAIN && process.env.CPANEL_DOMAIN.includes('erp') ? process.env.CPANEL_DOMAIN : 'erp.iepsolutions.in');
const REMOTE_DIR = `/home/${CPANEL_USER}/${DOMAIN}`;

const AUTH_HEADER = process.env.CPANEL_AUTH_HEADER || 
  ((CPANEL_USER && CPANEL_PASS) ? ('Basic ' + Buffer.from(`${CPANEL_USER}:${CPANEL_PASS}`).toString('base64')) : null);

if (!AUTH_HEADER) {
  console.error('\n❌ Deployment Error: Missing cPanel credentials.');
  console.error('Please configure GitHub Actions Secrets:');
  console.error('  - CPANEL (combined secret) OR');
  console.error('  - CPANEL_USER and CPANEL_PASS (or CPANEL_AUTH_HEADER)\n');
  process.exit(1);
}

function callUapi(module, func, params = {}) {
  return new Promise((resolve, reject) => {
    const postData = querystring.stringify(params);
    const req = https.request({
      hostname: CPANEL_HOST,
      port: CPANEL_PORT,
      path: '/execute/' + module + '/' + func,
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': AUTH_HEADER
      }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch(e) { resolve(d); }
      });
    });
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function uploadFileStream(localFilePath, remoteDir, remoteFileName) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(localFilePath)) {
      return reject(new Error(`Local file not found: ${localFilePath}`));
    }
    const stat = fs.statSync(localFilePath);
    const fileSize = stat.size;
    console.log(`Uploading ${remoteFileName} (${(fileSize / (1024 * 1024)).toFixed(2)} MB)...`);

    const boundary = '----WebKitFormBoundary' + Math.random().toString(36).substring(2);

    const headStr = '--' + boundary + '\r\n' +
      'Content-Disposition: form-data; name="dir"\r\n\r\n' +
      remoteDir + '\r\n' +
      '--' + boundary + '\r\n' +
      'Content-Disposition: form-data; name="overwrite"\r\n\r\n' +
      '1\r\n' +
      '--' + boundary + '\r\n' +
      'Content-Disposition: form-data; name="file-0"; filename="' + remoteFileName + '"\r\n' +
      'Content-Type: application/octet-stream\r\n\r\n';

    const headerBuf = Buffer.from(headStr, 'utf-8');
    const footerBuf = Buffer.from('\r\n--' + boundary + '--\r\n', 'utf-8');
    const totalLength = headerBuf.length + fileSize + footerBuf.length;

    const req = https.request({
      hostname: CPANEL_HOST,
      port: CPANEL_PORT,
      path: '/execute/Fileman/upload_files',
      method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary,
        'Content-Length': totalLength,
        'Authorization': AUTH_HEADER
      }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.status === 1) {
            console.log(`✅ Uploaded ${remoteFileName} successfully.`);
            resolve(true);
          } else {
            console.error(`❌ Upload failed for ${remoteFileName}:`, data);
            resolve(false);
          }
        } catch (e) {
          console.error(`❌ Error parsing response for ${remoteFileName}:`, data);
          reject(e);
        }
      });
    });

    req.on('error', reject);

    req.write(headerBuf);
    const readStream = fs.createReadStream(localFilePath);
    let uploadedBytes = 0;
    let lastPercent = 0;

    readStream.on('data', (chunk) => {
      uploadedBytes += chunk.length;
      const percent = Math.floor((uploadedBytes / fileSize) * 100);
      if (percent >= lastPercent + 10) {
        lastPercent = percent;
        process.stdout.write(` Progress: ${percent}%\r`);
      }
      req.write(chunk);
    });

    readStream.on('end', () => {
      req.write(footerBuf);
      req.end();
      console.log(`\n Upload stream complete. Waiting for server confirmation...`);
    });

    readStream.on('error', (err) => {
      req.destroy(err);
      reject(err);
    });
  });
}

async function uploadTextFile(content, remoteDir, remoteFileName) {
  const payload = {
    dir: remoteDir,
    file: remoteFileName,
    content: content,
    fallback: 1
  };
  const result = await callUapi('Fileman', 'save_file_content', payload);
  if (result.status === 1) {
    console.log(`✅ Saved text file: ${remoteFileName}`);
    return true;
  } else {
    console.error(`❌ Failed to save ${remoteFileName}:`, JSON.stringify(result));
    return false;
  }
}

async function main() {
  console.log(`=== Deploying IEP-School-Automechina to ${DOMAIN} ===`);
  console.log(`Host: ${CPANEL_HOST} | User: ${CPANEL_USER} | Path: ${REMOTE_DIR}`);

  const rootDir = path.resolve(__dirname, '..');
  const distDir = path.join(rootDir, 'dist');
  let zipPath = path.join(rootDir, 'erp_dist.zip');

  // If zip does not exist but dist exists, package it
  if (!fs.existsSync(zipPath)) {
    if (!fs.existsSync(distDir)) {
      console.log('Building project...');
      execSync('npm run build', { cwd: rootDir, stdio: 'inherit' });
    }
    console.log('Packaging dist into erp_dist.zip...');
    if (process.platform === 'win32') {
      execSync(`powershell -Command "Compress-Archive -Path '${distDir}\\*' -DestinationPath '${zipPath}' -Force"`, { stdio: 'inherit' });
    } else {
      execSync(`cd "${distDir}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });
    }
  }

  // Ensure public/.htaccess content exists in case zip missed dot-files
  const htaccessContent = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/x-icon "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript application/json
</IfModule>
`;

  // 1. Upload unzipper script
  const unzipperPhp = `<?php
header('Content-Type: text/plain');
set_time_limit(300);
echo "=== ERP Unzip Process ===\\n";
$zip = __DIR__ . '/erp_dist.zip';
if (!file_exists($zip)) {
    echo "ERROR: erp_dist.zip not found\\n";
    exit(1);
}
echo "Unzipping erp_dist.zip...\\n";
echo shell_exec('unzip -o ' . escapeshellarg($zip) . ' -d ' . escapeshellarg(__DIR__) . ' 2>&1') . "\\n";
@unlink($zip);
echo "Done! Files extracted.\\n";
`;
  await uploadTextFile(unzipperPhp, REMOTE_DIR, 'unzip_erp.php');

  // 2. Upload erp_dist.zip
  const uploaded = await uploadFileStream(zipPath, REMOTE_DIR, 'erp_dist.zip');
  if (!uploaded) {
    console.error('❌ Failed to upload erp_dist.zip');
    process.exit(1);
  }

  // 3. Trigger unzip_erp.php
  console.log('Triggering server-side extraction...');
  await new Promise((resolve, reject) => {
    https.get(`https://${DOMAIN}/unzip_erp.php`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('Unzip Output:\n', data);
        resolve(data);
      });
    }).on('error', reject);
  });

  // 4. Ensure .htaccess is uploaded
  await uploadTextFile(htaccessContent, REMOTE_DIR, '.htaccess');

  // 5. Clean up temporary setup scripts
  console.log('Cleaning up temporary setup scripts...');
  await callUapi('Fileman', 'delete_files', {
    dir: REMOTE_DIR,
    'file-0': 'unzip_erp.php',
    'file-1': 'test_probe.txt'
  });

  // 6. Verify deployment
  console.log('Verifying deployment on https://' + DOMAIN + ' ...');
  await new Promise((resolve, reject) => {
    https.get(`https://${DOMAIN}/`, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        console.log(`HTTP Root Status: ${res.statusCode}`);
        if (res.statusCode === 200 && (body.includes('IEP Schools') || body.includes('root'))) {
          console.log('✅ Deployment verified successfully! Title/body contains expected application markers.');
          resolve(true);
        } else {
          console.error('❌ Verification failed. Status:', res.statusCode);
          reject(new Error(`Deployment verification failed with status ${res.statusCode}`));
        }
      });
    }).on('error', reject);
  });
}

main().catch(err => {
  console.error('\n❌ Deployment failed:', err.message);
  process.exit(1);
});
