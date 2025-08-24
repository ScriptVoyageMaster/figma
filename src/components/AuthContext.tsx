import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  username: string
  email: string
  avatar?: string
  bio?: string
  rating: number
  joinDate: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<User>) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        username: 'john_doe',
        email: email,
        avatar: '/api/placeholder/64/64',
        bio: 'Frontend Developer з досвідом у React та TypeScript',
        rating: 4.8,
        joinDate: '2024-01-15'
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return true
    }
    return false
  }

  // Mock register function
  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    if (username && email && password) {
      const mockUser: User = {
        id: '2',
        username: username,
        email: email,
        rating: 0,
        joinDate: new Date().toISOString().split('T')[0]
      }
      setUser(mockUser)
      localStorage.setItem('user', JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}