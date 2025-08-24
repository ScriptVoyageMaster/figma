import { ArrowRight, Code2, Type, Users } from 'lucide-react'
import { Button } from './ui/button'
import { ProjectCard } from './ProjectCard'
import { FontCard } from './FontCard'

interface LandingPageProps {
  onNavigate?: (page: string) => void
  onAuthAction?: (action: 'login' | 'register') => void
}

export function LandingPage({ onNavigate, onAuthAction }: LandingPageProps) {
  // Mock data для проектів
  const popularProjects = [
    {
      title: "Modern Dashboard UI",
      author: "John Doe",
      description: "Сучасний інтерфейс панелі управління з темною темою та анімаціями",
      tags: ["React", "Dashboard", "Dark Theme"],
      rating: 4.8,
      views: 1234,
      likes: 89,
      onClick: () => onNavigate?.('project-view')
    },
    {
      title: "E-commerce Landing",
      author: "Jane Smith",
      description: "Стильна лендінг сторінка для інтернет-магазину з адаптивним дизайном",
      tags: ["Landing", "E-commerce", "Responsive"],
      rating: 4.9,
      views: 2156,
      likes: 145,
      onClick: () => onNavigate?.('project-view')
    },
    {
      title: "Mobile Chat App",
      author: "Alex Johnson",
      description: "Мобільний інтерфейс чат-додатку з сучасним дизайном",
      tags: ["Mobile", "Chat", "UI/UX"],
      rating: 4.7,
      views: 876,
      likes: 67,
      onClick: () => onNavigate?.('project-view')
    }
  ]

  // Mock data для шрифтів
  const popularFonts = [
    {
      name: "ModernSans",
      category: "Sans-serif",
      author: "Typography Studio"
    },
    {
      name: "CodePro",
      category: "Monospace",
      author: "DevFonts"
    },
    {
      name: "CreativeScript",
      category: "Script",
      author: "Design House"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl font-medium text-foreground">
              Figma AI Prompts
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Платформа для створення та обміну AI промптами для Figma. 
              Відкрийте нові можливості дизайну з нашими проектами та шрифтами.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8"
                onClick={() => onAuthAction?.('register')}
              >
                Почати зараз
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8"
                onClick={() => onNavigate?.('projects')}
              >
                Переглянути проекти
              </Button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto">
                  <Code2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3>Проекти</h3>
                <p className="text-sm text-muted-foreground">
                  Готові шаблони та компоненти для ваших проектів
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto">
                  <Type className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3>Шрифти</h3>
                <p className="text-sm text-muted-foreground">
                  Унікальні шрифти та типографіка для ваших дизайнів
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3>Спільнота</h3>
                <p className="text-sm text-muted-foreground">
                  Діліться досвідом та отримуйте зворотний зв'язок
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2>Популярні проекти</h2>
            <Button variant="ghost" onClick={() => onNavigate?.('projects')}>
              Дивитися всі
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Fonts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2>Популярні шрифти</h2>
            <Button variant="ghost" onClick={() => onNavigate?.('fonts')}>
              Дивитися всі
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularFonts.map((font, index) => (
              <FontCard key={index} {...font} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4">code.bit.city</h3>
              <p className="text-sm text-muted-foreground">
                Платформа для створення та обміну AI промптами для Figma
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Платформа</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => onNavigate?.('projects')}
                    className="hover:text-foreground"
                  >
                    Проекти
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('fonts')}
                    className="hover:text-foreground"
                  >
                    Шрифти
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate?.('community')}
                    className="hover:text-foreground"
                  >
                    Спільнота
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Підтримка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Про нас</a></li>
                <li><a href="#" className="hover:text-foreground">Допомога</a></li>
                <li><a href="#" className="hover:text-foreground">Контакти</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Правова інформація</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Умови використання</a></li>
                <li><a href="#" className="hover:text-foreground">Політика конфіденційності</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 code.bit.city. Всі права захищені.
          </div>
        </div>
      </footer>
    </div>
  )
}