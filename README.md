# MSME Sahayak Web Portal

This repository contains the front-end code (HTML, CSS, JS) for an Indian MSME support portal. 

## Features Included
* **Single Page App (SPA) Navigation:** Seamlessly switch between Govt Schemes, Tools, Guidebooks, Finance, Tax, Compliance, and Growth sections.
* **Live EMI Calculator:** Accurately calculates monthly installments based on input constraints.
* **Live Overdraft Calculator:** Calculates expected monthly interest based on limit utilization.
* **E-Visiting Card Maker:** Generates a scannable vCard QR code instantly.
* **Responsive UI:** Grid systems and flexbox designed to work on both Desktop and Mobile.

## How to upload and host for free on GitHub Pages:
1. Create a GitHub account and create a new repository (e.g., `msme-portal`).
2. Upload the `index.html`, `styles.css`, and `app.js` files directly to the root of this new repository.
3. Commit the changes.
4. Go to the repository **Settings** tab.
5. On the left sidebar, click on **Pages**.
6. Under "Build and deployment", set the **Source** to "Deploy from a branch".
7. Select the `main` (or `master`) branch and click **Save**.
8. Wait 1-2 minutes. GitHub will provide you with a live URL (e.g., `https://yourusername.github.io/msme-portal/`) where your website is now live!

## Next Steps for Customization
* **HTML Content:** Expand the `<section>` tags in `index.html` to add your specific write-ups for Tax Regimes, Compliance, and Growth strategies.
* **Invoice/GST Calculators:** You can replicate the HTML structure used in the `tool-card` class and add straightforward JS math functions to `app.js` to multiply quantities by GST rates.
