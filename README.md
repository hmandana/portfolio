# 🧑‍💻 Personal Portfolio Website

A high-performance, mobile-first portfolio website developed with **React**, **TypeScript**, **Tailwind CSS** and **Vite**. Designed to showcase professional experience, projects, and technical capabilities with an intuitive user experience and dark mode support.

![Website Screenshot](src/assets/portfolio.png)
---

## 🚀 Tech Stack

| Category           | Technology                                    |
|--------------------|-----------------------------------------------|
| **Frontend**        | React 18 + TypeScript                         |
| **Build Tooling**   | Vite for fast dev + optimized production      |
| **Styling**         | Tailwind CSS (utility-first approach)         |
| **Routing**         | React Router DOM                              |
| **Linting**         | ESLint with TypeScript rules                  |
| **PostCSS**         | PostCSS with Autoprefixer                     |

---

## 📁 Folder Structure

```
src/
├── assets/                   # Static files (images, icons)
├── components/
│   └── Layout/
│       ├── Layout.tsx        # Page wrapper with layout
│       ├── Navbar.tsx        # Top navigation bar
│       └── Footer.tsx        # Footer with social/contact links
├── hooks/
│   └── useTheme.tsx          # Custom dark/light mode hook
├── pages/
│   ├── Home.tsx              # Landing/intro page
│   ├── About.tsx             # Bio and professional summary
│   ├── Projects.tsx          # Featured project gallery
│   └── Contact.tsx           # Contact form or social links
├── App.tsx                   # Route setup and layout composition
├── main.tsx                  # App entry point
└── index.css                 # Global styles (Tailwind base)
```

---

## ✨ Features

- ✅ **Responsive Design** — Optimized for all devices and screen sizes  
- 🌗 **Dark Mode** — Automatically adapts to system preferences  
- 🔄 **Smooth Routing** — Client-side navigation using React Router  
- ⚡ **Blazing Fast** — Vite ensures near-instant feedback loop during development  
- 🔒 **Type-Safe** — Built with TypeScript for reliability  
- ♻️ **Reusable Components** — Modular component-based architecture  
- 🧪 **Linting Enabled** — Code quality checks using ESLint

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 16.x
- npm or yarn package manager

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
# → Access at http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview

# Run lint checks
npm run lint
```

---

## 🛠️ Customization

### 🖌️ Styling

- Tailwind config: `tailwind.config.js`  
- Global CSS: `src/index.css`  
- Utility classes used in components for styling

### 🌙 Theme (Dark/Light)

- Managed via `useTheme` custom hook  
- Supports system-based and manual toggling  
- Example usage:

```tsx
const { theme, toggleTheme } = useTheme();
```

### 📄 Content

- Edit page content in `src/pages/`
- Add new sections by creating a page and adding routes in `App.tsx`
- Modify navigation via `components/Layout/Navbar.tsx`

---

## 📜 NPM Scripts

| Command           | Description                           |
|------------------|---------------------------------------|
| `npm run dev`     | Launch dev server with HMR            |
| `npm run build`   | Build optimized production bundle     |
| `npm run preview` | Preview production locally            |
| `npm run lint`    | Run static code analysis (ESLint)     |

---

## 📌 Deployment

### GitHub Pages (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Automatic Deployment
1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. Visit your site at: `https://hmandana.github.io/portfolio-next-react`

#### Manual Deployment
```bash
# Build and deploy manually
npm run deploy
```

#### Setup GitHub Pages
1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Set Source to "GitHub Actions"
4. The workflow will handle the rest automatically

### Alternative Deployment Options

- **[Vercel](https://vercel.com)** – Zero-config deployment for React apps  
- **[Netlify](https://netlify.com)** – CI/CD with Git integration  

> **Note**: The project is pre-configured with the correct base path for GitHub Pages deployment.

---

## 🙌 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

## 📫 Contact

**Name**: Your Full Name  
**Email**: your.email@example.com  
**LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---
