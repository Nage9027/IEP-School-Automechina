export interface WebsiteEnquiryPayload {
  customerName: string;
  email: string;
  phone: string;
  schoolName: string;
  requestType: string;
  sourcePage: string;
  pageUrl: string;
  message: string;
  website?: string;
}

const APPS_SCRIPT_URL = (import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined)?.trim();

function createEnquiryId(): string {
  const randomId = globalThis.crypto?.randomUUID?.()
    ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
  return `IEP-WEB-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${randomId}`;
}

function resolveAppsScriptUrl(): string {
  if (!APPS_SCRIPT_URL) {
    throw new Error("The enquiry form is not configured. Please contact us by phone or WhatsApp.");
  }

  let url: URL;
  try {
    url = new URL(APPS_SCRIPT_URL);
  } catch {
    throw new Error("The enquiry form URL is invalid. Please contact us by phone or WhatsApp.");
  }

  if (url.protocol !== "https:" || url.hostname !== "script.google.com") {
    throw new Error("The enquiry form URL is invalid. Please contact us by phone or WhatsApp.");
  }

  return url.toString();
}

/**
 * Dispatch a clean URL-encoded POST to Google Apps Script using fetch (no-cors).
 * Because fetch mode is 'no-cors', the browser sends the submission directly
 * without injecting an iframe into the DOM. This prevents third-party scripts
 * (such as Google's internal 'dymvgb96d.js' echo wrapper) from executing in the
 * document and throwing console errors.
 */
export async function submitWebsiteEnquiry(payload: WebsiteEnquiryPayload): Promise<{ enquiryId: string }> {
  const action = resolveAppsScriptUrl();
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You appear to be offline. Reconnect and try again.");
  }

  const enquiryId = createEnquiryId();
  const fields: Record<string, string> = {
    enquiryId,
    submittedDate: new Date().toISOString(),
    customerName: payload.customerName.trim(),
    email: payload.email.trim(),
    phone: payload.phone.trim(),
    schoolName: payload.schoolName.trim(),
    requestType: payload.requestType.trim(),
    sourcePage: payload.sourcePage.trim(),
    pageUrl: payload.pageUrl,
    message: payload.message.trim(),
    website: payload.website?.trim() ?? "",
  };

  const body = new URLSearchParams(fields).toString();

  try {
    await fetch(action, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
  } catch (err) {
    // If fetch fails (e.g. adblocker or network restriction), use form fallback
    submitViaHiddenForm(action, fields, enquiryId);
  }

  return { enquiryId };
}

function submitViaHiddenForm(action: string, fields: Record<string, string>, enquiryId: string): void {
  const frameName = `iep-enquiry-target-${enquiryId.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const frame = document.createElement("iframe");
  frame.name = frameName;
  frame.title = "Enquiry submission target";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  Object.assign(frame.style, {
    position: "absolute",
    width: "1px",
    height: "1px",
    border: "0",
    opacity: "0",
    pointerEvents: "none",
  });

  const form = document.createElement("form");
  form.method = "POST";
  form.action = action;
  form.target = frameName;
  form.enctype = "application/x-www-form-urlencoded";
  form.acceptCharset = "UTF-8";
  form.style.display = "none";

  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  document.body.append(frame, form);
  try {
    form.submit();
  } finally {
    form.remove();
    window.setTimeout(() => frame.remove(), 10_000);
  }
}
