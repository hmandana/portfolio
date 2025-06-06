import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { useTheme } from './hooks/useTheme'

// Layout
import Layout from './components/Layout/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'

function App() {
  const { isDarkMode } = useTheme()

  useEffect(() => {
    // Apply dark mode class to document based on system preference
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
