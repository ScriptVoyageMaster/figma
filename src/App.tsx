import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { LandingPage } from './components/LandingPage'
import { Dashboard } from './components/Dashboard'
import { ProjectEditor } from './components/ProjectEditor'
import { ProjectView } from './components/ProjectView'
import { AuthModals } from './components/AuthModals'
import { AuthProvider, useAuth } from './components/AuthContext'
import { Toaster } from './components/ui/sonner'

type Page = 'landing' | 'dashboard' | 'project-editor' | 'project-view'

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState('ua')
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login')
  
  const { isAuthenticated, logout } = useAuth()

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Handle theme toggle
  const handleThemeToggle = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
    localStorage.setItem('language', language)
  }

  // Handle navigation
  const handleNavigation = (page: Page) => {
    setCurrentPage(page)
  }

  // Handle authentication modals
  const handleAuthAction = (action: 'login' | 'register') => {
    setAuthModalTab(action)
    setIsAuthModalOpen(true)
  }

  // Handle header actions
  const handleHeaderAction = (action: string) => {
    switch (action) {
      case 'login':
        handleAuthAction('login')
        break
      case 'register':
        handleAuthAction('register')
        break
      case 'dashboard':
        handleNavigation('dashboard')
        break
      case 'projects':
        handleNavigation('dashboard')
        break
      case 'create':
        handleNavigation('project-editor')
        break
      case 'home':
        handleNavigation('landing')
        break
      case 'logout':
        logout()
        handleNavigation('landing')
        break
    }
  }

  // Enhanced Header with navigation handlers
  const EnhancedHeader = () => (
    <Header 
      isAuthenticated={isAuthenticated}
      isDarkMode={isDarkMode}
      onThemeToggle={handleThemeToggle}
      currentLanguage={currentLanguage}
      onLanguageChange={handleLanguageChange}
      onAction={handleHeaderAction}
      currentPage={currentPage}
    />
  )

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />
      case 'project-editor':
        return <ProjectEditor onNavigate={handleNavigation} />
      case 'project-view':
        return <ProjectView onNavigate={handleNavigation} />
      case 'landing':
      default:
        return <LandingPage onNavigate={handleNavigation} onAuthAction={handleAuthAction} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      <main>
        {renderPage()}
      </main>
      
      <AuthModals 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
      
      <Toaster position="top-right" />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}