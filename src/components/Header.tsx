import { Search, Sun, Moon, Bell, Users, FolderOpen, Plus, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useAuth } from './AuthContext'

interface HeaderProps {
  isAuthenticated?: boolean
  isDarkMode: boolean
  onThemeToggle: () => void
  currentLanguage: string
  onLanguageChange: (lang: string) => void
  onAction?: (action: string) => void
  currentPage?: string
}

export function Header({ 
  isAuthenticated = false, 
  isDarkMode, 
  onThemeToggle, 
  currentLanguage, 
  onLanguageChange,
  onAction,
  currentPage
}: HeaderProps) {
  const { user } = useAuth()

  const handleAction = (action: string) => {
    onAction?.(action)
  }

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            className="hover:opacity-80 transition-opacity"
            onClick={() => handleAction('home')}
          >
            <h1 className="text-xl font-medium text-primary">
              code.bit.city
            </h1>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Пошук проектів, шрифтів..."
              className="pl-10 bg-input-background border-0"
            />
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <Select value={currentLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-20 border-0 bg-transparent">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ua">UA</SelectItem>
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="pl">PL</SelectItem>
            </SelectContent>
          </Select>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onThemeToggle}
            className="h-9 w-9"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Bell className="h-4 w-4" />
              </Button>

              {/* Friends */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => handleAction('friends')}
              >
                <Users className="h-4 w-4" />
              </Button>

              {/* Projects */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => handleAction('projects')}
              >
                <FolderOpen className="h-4 w-4" />
              </Button>

              {/* Create */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9"
                onClick={() => handleAction('create')}
              >
                <Plus className="h-4 w-4" />
              </Button>

              {/* User Avatar Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 p-0">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleAction('dashboard')}>
                    Особистий кабінет
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('profile')}>
                    Профіль
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('settings')}>
                    Налаштування
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('logout')}>
                    Вийти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button 
                variant="ghost"
                onClick={() => handleAction('login')}
              >
                Увійти
              </Button>
              <Button 
                onClick={() => handleAction('register')}
              >
                Реєстрація
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}