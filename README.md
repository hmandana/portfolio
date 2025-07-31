# 🧑‍💻 Personal Portfolio Website

A modern, full-stack portfolio website built with **React 19**, **TypeScript**, **GraphQL**, and **MongoDB Atlas**. Features a responsive design, dark mode support, dynamic content management, and CDN-optimized assets for blazing-fast performance.

![Website Screenshot](src/assets/portfolio.gif)

🌐 **Live Demo**: [https://hmandana.github.io/portfolio](https://hmandana.github.io/portfolio)

---

## 🚀 Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|----------|
| **React** | 19.1.0 | UI Framework with latest features |
| **TypeScript** | 5.8.3 | Type-safe development |
| **Vite** | 6.3.5 | Lightning-fast build tool |
| **Tailwind CSS** | 3.3.0 | Utility-first styling |
| **React Router** | 7.6.0 | Client-side routing |
| **Apollo Client** | 3.13.9 | GraphQL client with caching |

### Backend
| Technology | Version | Purpose |
|------------|---------|----------|
| **Apollo Server** | 4.12.2 | GraphQL server |
| **Hapi.js** | 21.4.0 | Web framework |
| **MongoDB Atlas** | Cloud | Database as a Service |
| **Mongoose** | 8.17.0 | MongoDB object modeling |
| **GraphQL** | 16.11.0 | Query language and runtime |

### Infrastructure
| Service | Purpose |
|---------|----------|
| **GitHub Pages** | Static site hosting |
| **jsDelivr CDN** | Global asset delivery |
| **GitHub Actions** | CI/CD pipeline |
| **MongoDB Atlas** | Cloud database |



---

## ✨ Features

### 🎨 User Experience
- ✅ **Fully Responsive** — Perfect on mobile, tablet, and desktop
- 🌗 **Dark/Light Mode** — Auto-detects system preference with manual toggle
- 🎭 **Interactive Animations** — Smooth transitions and hover effects
- 🔄 **Dynamic Content** — Real-time data from MongoDB Atlas
- ⚡ **Lightning Fast** — Optimized loading with CDN assets
- 🎯 **Accessible** — WCAG compliant with keyboard navigation

### 🛠️ Technical Features
- 🔒 **Type-Safe** — Full TypeScript coverage
- 📱 **Progressive** — Works offline with service worker
- 🗄️ **Database-Driven** — MongoDB Atlas with GraphQL API
- 🌐 **CDN Optimized** — Global asset delivery via jsDelivr
- 🔧 **Component-Based** — Reusable React components
- 🧪 **Quality Assured** — ESLint, TypeScript checks, and CI/CD

### 📊 Content Management
- 📝 **Dynamic Projects** — Add/edit projects via GraphQL mutations
- 👤 **Profile Management** — Update skills, experience, and contact info
- 🏠 **Homepage Control** — Manage roles, intro text, and statistics
- 🔍 **Search & Filter** — Find projects by technology or type
- 📈 **Analytics Ready** — Built-in tracking capabilities

---

## 📦 Getting Started

### Prerequisites

- Node.js ≥ 16.x
- npm or yarn package manager

### Environment Setup

1. **Clone and Install**
```bash
# Clone the repository
git clone https://github.com/hmandana/portfolio.git
cd portfolio

# Install dependencies
npm install
```

2. **Environment Variables**
```bash
# Create .env file
cp .env.example .env

# Add your MongoDB connection string
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Portfolio
PORT=4000
NODE_ENV=development
```

3. **Database Setup**
```bash
# Test MongoDB connection
npm run test:connection

# Check database status
npm run db:status

# Initialize with sample data (optional)
npm run db:init
```

4. **Development**
```bash
# Start full-stack development (frontend + backend)
npm run full-dev

# Or start individually:
npm run server    # Backend only (port 4000)
npm run dev       # Frontend only (port 3000)
```

---

## 📜 Available Scripts

### Development
| Command | Description |
|---------|-------------|
| `npm run dev` | Launch Vite dev server (frontend only) |
| `npm run server` | Start GraphQL server (backend only) |
| `npm run server:dev` | Start server with nodemon (auto-restart) |
| `npm run full-dev` | Start both frontend and backend |

### Build & Deploy
| Command | Description |
|---------|-------------|
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Deploy to GitHub Pages |
| `npm run lint` | Run ESLint code analysis |

### Database Management
| Command | Description |
|---------|-------------|
| `npm run test:connection` | Test MongoDB Atlas connection |
| `npm run db:status` | Check database collections status |
| `npm run db:init` | Initialize basic data structure |
| `npm run db:clear` | ⚠️ Clear all data (use with caution) |


---

## 📌 Deployment

### GitHub Pages (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Automatic Deployment
1. Push changes to the `main` branch
2. GitHub Actions will automatically build and deploy the site
3. Visit your site at: `https://hmandana.github.io/portfolio`

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


## 🙌 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)


### 🤝 Connect with Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/haritham/)




