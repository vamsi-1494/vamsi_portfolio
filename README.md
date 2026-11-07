# Mandalapu Vamsi &mdash; Professional MERN Stack Developer Portfolio

A modern, high-performance, fully responsive personal portfolio website built with pure semantic **HTML5**, **CSS3**, and **vanilla JavaScript**. Features a sleek dark/light mode toggle with `localStorage` memory, subtle scroll-reveal animations, responsive mobile navigation drawer, interactive contact form with Formspree integration and mailto fallback, and an included PDF resume.

---

## 📁 1. Project Folder Structure

```text
portfolio_vamsi/
│
├── index.html                     # Semantic HTML5 markup with SEO & Open Graph meta tags
├── style.css                      # Modern CSS3 styles, CSS variables, dark/light themes & responsive queries
├── script.js                      # Vanilla JavaScript (theme toggle, scrollspy, typing effect, validation)
├── firebase.json                  # Firebase Hosting configuration file
├── .gitignore                     # Git ignore rules for clean repository management
│
└── assets/
    └── Mandalapu_Vamsi_Resume.pdf # Pre-generated resume PDF (ready to view or download)
```

---

## 🚀 2. How to Run Locally

Because this project is built entirely with pure HTML5, CSS3, and vanilla JavaScript without any compilers, package managers, or server frameworks, running it locally is instantaneous:

### Method A: Direct Browser Opening (No Server Needed)
1. Navigate to the project directory: `e:\Downloads\portfolio_vamsi`
2. Double-click **`index.html`** or right-click &rarr; **Open with** &rarr; **Google Chrome** (or Edge/Firefox/Brave/Safari).
3. The portfolio will load immediately with all styling, icons, and interactions working out of the box!

### Method B: Using VS Code Live Server (Recommended for Development)
1. Open the `portfolio_vamsi` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey) if not already installed.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/index.html` with hot-reloading on save.

### Method C: Using Python Built-in HTTP Server
If you prefer a terminal-based local server:
```bash
# Navigate to the folder
cd e:\Downloads\portfolio_vamsi

# Start Python 3 HTTP server
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🎨 3. Customization & Placeholders Guide

### A. Theme Colors & Fonts (`style.css`)
At the very top of `style.css` (lines 10&ndash;35), all design tokens are defined as CSS custom properties:
```css
:root {
  --primary: #2563eb;           /* Modern Electric Blue Accent */
  --primary-hover: #1d4ed8;     /* Darker Blue on Hover */
  --accent-cyan: #06b6d4;       /* Secondary Cyan Accent */
  --accent-emerald: #10b981;    /* Live Status Badge Accent */
  --font-main: 'Plus Jakarta Sans', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```
Change `--primary` to your preferred brand color (e.g., `#10b981` emerald, `#8b5cf6` violet, or `#f97316` coral) to update the entire portfolio's color scheme instantly.

### B. Contact Form Setup (Formspree)
The contact form is configured to send messages directly to your inbox without requiring a backend server:
1. Go to [https://formspree.io](https://formspree.io) and sign up for a free account.
2. Click **+ New Form**, enter a name (e.g., "Portfolio Contact Form"), and copy your Form ID (e.g. `xpznvqyk`).
3. Open `index.html` and locate line 782:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" novalidate>
   ```
4. Replace `YOUR_FORMSPREE_ID` with your actual ID.
5. If someone tries to submit while the placeholder is in place, the JavaScript automatically alerts them and provides a 1-click **"Open Email App"** mailto fallback!

### C. Replacing Marked Placeholder Links (`index.html`)
Search for `PLACEHOLDER` in `index.html` to find the exact lines:
- **Project 1 (Cricket Ground Booking) GitHub Repository**:
  Replace `https://github.com/yourusername/cricket-booking-system` with your GitHub repo link.
- **Project 2 (Doctor Appointment Booking) Live Demo**:
  Replace `https://doctor-appointment-vamsi-demo.web.app` when deployed.
- **Project 2 (Doctor Appointment Booking) GitHub Repository**:
  Replace `https://github.com/yourusername/doctor-appointment-app` with your GitHub repo link.
- **Social Profile (GitHub)**:
  Replace `https://github.com/yourusername` in the Contact Section and Footer with your GitHub profile.
- **Resume PDF**:
  To update your resume, simply overwrite `assets/Mandalapu_Vamsi_Resume.pdf` with your new PDF file while keeping the same file name.

---

## 🌐 4. Free Hosting Deployment Steps

### Option A: Firebase Hosting (Recommended)
Because your projects are already hosted on Firebase Hosting, you can deploy your portfolio there in 3 minutes:

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```
2. **Log into Firebase**:
   ```bash
   firebase login
   ```
3. **Initialize Firebase in the project folder**:
   ```bash
   cd e:\Downloads\portfolio_vamsi
   firebase init hosting
   ```
   - When asked: *"Please select an option"*: Select **Use an existing project** (or create a new one).
   - What do you want to use as your public directory? Enter `.` (a period for current directory).
   - Configure as a single-page app? Enter `No`.
   - Set up automatic builds and deploys with GitHub? Enter `No` (or `Yes` if you want GitHub Actions).
   - File ./index.html already exists. Overwrite? Enter `No` (**IMPORTANT: Do not overwrite**).
4. **Deploy to production**:
   ```bash
   firebase deploy --only hosting
   ```
   Firebase will output your live URL (e.g., `https://vamsi-portfolio-2026.web.app`).

---

### Option B: GitHub Pages (100% Free, Zero Setup)
1. Initialize a git repository and commit your files:
   ```bash
   cd e:\Downloads\portfolio_vamsi
   git init
   git add .
   git commit -m "Initial commit: Mandalapu Vamsi Portfolio"
   ```
2. Create a new public repository on [GitHub](https://github.com/new) named `portfolio` (or `<your-username>.github.io`).
3. Push your code to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```
4. On GitHub, go to your repository **Settings &rarr; Pages**.
5. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
6. Within 60 seconds, your portfolio will be live at:
   `https://<your-username>.github.io/portfolio/`

---

### Option C: Netlify (Drag & Drop in 30 Seconds)
1. Go to [https://app.netlify.com](https://app.netlify.com) and log in.
2. Go to **Sites** &rarr; Drag and drop the `portfolio_vamsi` folder directly onto the browser window.
3. Netlify will deploy it instantly and provide a live `.netlify.app` URL with free HTTPS.

---

## 💡 5. Optional Future Improvements

- **Interactive Project Modal / Lightbox**: Add a screenshot gallery modal when clicking on project cards.
- **Dynamic GitHub Stats**: Fetch real-time public repositories and contribution statistics using the GitHub REST API.
- **Client Testimonials / Recommendations Section**: Add a slider carousel for peer and mentor recommendations when available.
- **Interactive Tech Stack Filter**: Add filter buttons ("All", "Frontend", "Backend", "Database") to filter project cards.
- **PWA (Progressive Web App)**: Add a `manifest.json` and basic service worker so visitors can install the portfolio like a native mobile app.

