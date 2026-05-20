# MSMEHub — India's One-Stop MSME Resource Platform

A complete, free, static website for Indian MSMEs covering Government Schemes, Business Tools, Finance, Tax, Compliance, and Growth.

## 🗂 File Structure

```
msme-hub/
├── index.html              ← Main entry point (Home + all sections)
├── css/
│   └── style.css           ← Complete stylesheet
├── js/
│   └── main.js             ← All interactive logic
├── pages/
│   ├── schemes.html        ← Government Schemes (standalone)
│   ├── tools.html          ← Business Tools (standalone)
│   ├── finance.html        ← Finance Solutions (standalone)
│   ├── guidebook.html      ← Guidebooks (standalone)
│   ├── tax.html            ← Tax & Certificates (standalone)
│   ├── compliance.html     ← Compliance Calendar (standalone)
│   ├── growth.html         ← Growth Strategies (standalone)
│   └── connect.html        ← Contact Us (standalone)
└── README.md
```

## 🚀 How to Deploy on GitHub Pages

1. Create a new GitHub repository (e.g., `msmehub`)
2. Upload all files maintaining the folder structure
3. Go to **Settings → Pages**
4. Under **Source**, select `main` branch → `/ (root)` → Save
5. Your site will be live at `https://yourusername.github.io/msmehub/`

## ✨ Features

### 🏛 Government Schemes
- ECLGS, CGTMSE, Startup India, PMEGP, Export Finance, PMLUPY, GIFT City, Women Entrepreneur schemes
- Filter by: Industry Type, State, Trade Type, Gender/Category
- List and Tile/Grid view toggle
- Detailed modal with eligibility criteria, benefits
- Built-in Eligibility Checker (Q&A based)
- Links to official gazette / government portals

### 🧮 Business Tools
- **EMI Calculator** — Live slider-based with repo rate display
- **OD Interest Calculator** — Live with utilisation % slider
- **GST Calculator** — Full table with HSN, CGST/SGST/IGST auto-calc
- **Invoice Maker** — Live preview + print/download
- **E-Visiting Card Maker** — Live preview with QR placeholder, color themes

### 📚 Guidebooks
- Udyam Registration, GST Registration, Bank Selection, IEC, FSSAI, LEI, Income Tax, GST Composition vs Regular
- Links to official portals for each

### 💰 Finance Solutions
- Overdraft, Term Loan, WCTL, LRD, Bank Guarantee, Letter of Credit, LC Discounting, Cash Credit, SBLC, LER, Commercial LAP
- Full explanation: what it is, how to avail, secured/unsecured, EMI vs EPI

### 🧾 Tax & Certificates
- New vs Old Income Tax Regime slabs
- Presumptive Taxation (44AD / 44ADA)
- GST Composition vs Regular
- Certificates: Udyam, FSSAI, IEC, LEI, GST
- TDS/TCS rate table

### ⚖️ Compliance
- GST filing calendar
- Income Tax advance tax dates
- TDS compliance
- Labour Laws (PF, ESI, PT)
- Environmental (CTE/CTO)
- ROC/MCA for companies
- Factories Act
- MSME Samadhaan

### 📈 Growth
- Social Media Marketing
- Website Creation
- Import/Export
- Business Automation tools
- Manpower Hiring platforms
- Lead Generation strategies

### 🤝 Connect
- Contact form with business categorisation
- Expert connect for personalised guidance

## 🎨 Design
- Color scheme: Indian Saffron (#FF6B00), Navy (#0A1628), Green (#138808)
- Fonts: Syne (headings) + DM Sans (body)
- Fully responsive (mobile-first)
- Single-page app with section routing (no page reloads)

## 📝 Customisation

1. **Contact details**: Search for `support@msmehub.in` and replace with yours
2. **Phone number**: Replace `+91 98765 43210`
3. **Brand name**: Replace `MSMEHub` with your brand
4. **Repo Rate**: Update the repo rate in `index.html` and `tools.html` as RBI changes it
5. **New Schemes**: Copy any `.scheme-card` block and update the content + modal

## ⚠️ Disclaimer
This website is for informational purposes only. Always verify scheme details, eligibility, and compliance requirements from official government sources.
