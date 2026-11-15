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

function createTokenNumber(): string {
  // Generate a clean, memorable 6-digit Token Number (e.g. ERP-784219)
  const randomDigits = Math.floor(100000 + Math.random() * 900000);
  return `ERP-${randomDigits}`;
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
 * Dispatch a browser-compatible URL-encoded form POST to Apps Script via a hidden sandboxed iframe.
 * The sandboxed iframe prevents external scripts (such as Google's internal 'dymvgb96d.js')
 * from executing in the console while ensuring the submission payload is reliably dispatched
 * and recorded in Google Sheets.
 */
export async function submitWebsiteEnquiry(payload: WebsiteEnquiryPayload): Promise<{ enquiryId: string }> {
  const action = resolveAppsScriptUrl();
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("You appear to be offline. Reconnect and try again.");
  }

  const enquiryId = createTokenNumber();
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

  submitViaHiddenForm(action, fields, enquiryId);

  return { enquiryId };
}

function submitViaHiddenForm(action: string, fields: Record<string, string>, enquiryId: string): void {
  const frameName = `iep-enquiry-target-${enquiryId.replace(/[^A-Za-z0-9_-]/g, "")}`;
  const frame = document.createElement("iframe");
  frame.name = frameName;
  frame.title = "Enquiry submission target";
  frame.tabIndex = -1;
  frame.setAttribute("aria-hidden", "true");
  // Allow form submission into iframe, but do NOT grant allow-scripts so third-party echo scripts don't throw in console
  frame.setAttribute("sandbox", "allow-forms allow-same-origin");
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
    window.setTimeout(() => frame.remove(), 30_000);
  }
}
