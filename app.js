// Navigation Logic
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(sec => sec.classList.remove('active-section'));

    // Remove active class from nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => link.classList.remove('active'));

    // Show target section
    document.getElementById(sectionId).classList.add('active-section');
    event.currentTarget.classList.add('active');
}

// Scheme List/Tile View Toggle
function toggleView() {
    const container = document.getElementById('schemes-container');
    if (container.classList.contains('grid-view')) {
        container.classList.remove('grid-view');
        // A standard block layout will apply automatically in CSS
    } else {
        container.classList.add('grid-view');
    }
}

// Live EMI Calculator
function updateEmiROI() {
    const roi = document.getElementById('emi-roi').value;
    document.getElementById('emi-roi-display').innerText = roi + '%';
    calculateEMI();
}

function calculateEMI() {
    const P = parseFloat(document.getElementById('emi-amount').value);
    const annualRate = parseFloat(document.getElementById('emi-roi').value);
    const N = parseFloat(document.getElementById('emi-tenure').value);

    if (P > 0 && annualRate > 0 && N > 0) {
        // Monthly interest rate
        const R = (annualRate / 12) / 100;
        
        // EMI Formula: P x R x (1+R)^N / ((1+R)^N - 1)
        const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
        
        document.getElementById('emi-result').innerText = '₹' + Math.round(emi).toLocaleString('en-IN');
    } else {
        document.getElementById('emi-result').innerText = '₹0';
    }
}

// Live Overdraft (OD) Interest Calculator
function updateOdUtil() {
    const util = document.getElementById('od-util').value;
    document.getElementById('od-util-display').innerText = util + '%';
    calculateOD();
}

function calculateOD() {
    const limit = parseFloat(document.getElementById('od-limit').value);
    const utilPercent = parseFloat(document.getElementById('od-util').value);
    const roi = parseFloat(document.getElementById('od-roi').value);

    if (limit > 0 && roi > 0) {
        // Utilized Amount
        const utilizedAmount = (limit * utilPercent) / 100;
        
        // Monthly Interest = (Utilized Amount * ROI) / (100 * 12)
        const monthlyInterest = (utilizedAmount * roi) / (100 * 12);
        
        document.getElementById('od-result').innerText = '₹' + Math.round(monthlyInterest).toLocaleString('en-IN');
    } else {
        document.getElementById('od-result').innerText = '₹0';
    }
}

// Digital Visiting Card QR Generator (Requires qrcode.js loaded in HTML)
function generateQR() {
    const name = document.getElementById('vc-name').value;
    const phone = document.getElementById('vc-phone').value;
    const qrContainer = document.getElementById('qrcode');
    
    // Clear previous QR
    qrContainer.innerHTML = "";
    
    if(name && phone) {
        // Standard vCard format
        const vcard = `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nTEL;TYPE=WORK,VOICE:${phone}\nEND:VCARD`;
        
        new QRCode(qrContainer, {
            text: vcard,
            width: 128,
            height: 128,
            colorDark : "#0f4c81",
            colorLight : "#ffffff",
        });
    } else {
        alert("Please enter Name and Phone to generate QR.");
    }
}

// Initialize calculators on page load
window.onload = function() {
    calculateEMI();
    calculateOD();
};