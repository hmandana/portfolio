import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import './App.css'
import { ThemeProvider } from './hooks/ThemeProvider';
import apolloClient from './apollo';

// Layout
import Layout from './components/Layout/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'

// Get base path for GitHub Pages
const basename = import.meta.env.PROD ? '/portfolio' : ''

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider>
        <BrowserRouter basename={basename}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
