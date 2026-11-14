# Website enquiry submission

The Contact Us form and the Customization lead form submit directly from the browser to the Google Apps Script Web App. The website posts `application/x-www-form-urlencoded` fields to the configured `VITE_GOOGLE_APPS_SCRIPT_URL`; it does not call the Express API and sends no API secret or authorization header.

The request contains `enquiryId`, `submittedDate`, `customerName`, `email`, `phone`, `schoolName`, `requestType`, `sourcePage`, `pageUrl`, `message`, and `website`. The browser-generated enquiry ID is only a reference. The Apps Script must validate it and deduplicate under a `ScriptLock` before appending to the `All Enquiries` tab.

## Browser confirmation limitation

The form is posted to a hidden iframe so the browser can dispatch a normal URL-encoded cross-origin form submission without `no-cors`. Same-origin policy prevents the website from reading the Apps Script response. The UI therefore reports **Request dispatched**, not saved or delivered. It cannot confirm the spreadsheet row, customer acknowledgement, or team notification. It displays failures detectable before dispatch, such as a missing/invalid URL or offline browser state.

## Apps Script deployment requirement

The Apps Script project source is not part of this website repository. Its `doPost(e)` handler must read `e.parameter`, reject a non-empty `website` honeypot, validate/limit fields, lock and deduplicate by `enquiryId`, append one row, and record customer/team email statuses independently. No Apps Script source was changed or deployed as part of this website-only change. The deployed endpoint's GET currently reports that `doGet` is not defined, so browser-side receipt verification is unavailable.

For local development, set `VITE_GOOGLE_APPS_SCRIPT_URL` in `.env` to the deployed web app URL, then run the website on localhost. A real submission writes to the connected spreadsheet and may send both emails; use clearly marked test data and an approved test inbox when exercising it.
