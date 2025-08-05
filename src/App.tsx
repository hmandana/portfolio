import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import './App.css'
import { ThemeProvider } from './hooks/ThemeProvider';
import { DataProvider } from './contexts/DataContext';
import { GraphQLErrorBoundary } from './hooks/useQueryWithFallback';
import DataStatusIndicator from './components/Status/DataStatusIndicator';
import apolloClient from './apollo';

// Layout
import Layout from './components/Layout/Layout'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

// Get base path for GitHub Pages
const basename = import.meta.env.PROD ? '/portfolio' : ''

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <DataProvider useStaticFallback={true}>
        <ThemeProvider>
          <GraphQLErrorBoundary>
            <BrowserRouter basename={basename}>
              <DataStatusIndicator />
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </GraphQLErrorBoundary>
        </ThemeProvider>
      </DataProvider>
    </ApolloProvider>
  )
}

export default App
