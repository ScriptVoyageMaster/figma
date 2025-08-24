import { useState } from 'react'
import { User, FolderOpen, Type, Users, Bookmark, Settings, Star, Eye, Heart, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { useAuth } from './AuthContext'

interface DashboardProps {
  onNavigate?: (page: string) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('projects')

  // Mock data для проектів користувача
  const userProjects = [
    {
      id: '1',
      title: 'My Portfolio Website',
      description: 'Особистий портфоліо сайт з анімаціями',
      tags: ['Portfolio', 'React', 'Animation'],
      status: 'published',
      views: 234,
      likes: 18,
      lastModified: '2024-01-20'
    },
    {
      id: '2',
      title: 'E-commerce Dashboard',
      description: 'Адмін панель для інтернет-магазину',
      tags: ['Dashboard', 'Admin', 'Charts'],
      status: 'draft',
      views: 0,
      likes: 0,
      lastModified: '2024-01-18'
    }
  ]

  // Mock data для шрифтів користувача
  const userFonts = [
    {
      id: '1',
      name: 'MyCustomFont',
      category: 'Sans-serif',
      status: 'published',
      downloads: 45,
      likes: 12
    }
  ]

  // Mock data для друзів
  const friends = [
    { id: '1', username: 'jane_smith', avatar: '/api/placeholder/40/40', status: 'online' },
    { id: '2', username: 'alex_dev', avatar: '/api/placeholder/40/40', status: 'offline' },
    { id: '3', username: 'design_pro', avatar: '/api/placeholder/40/40', status: 'online' }
  ]

  // Mock data для збережених проектів
  const bookmarkedProjects = [
    {
      id: '1',
      title: 'Modern UI Kit',
      author: 'design_master',
      rating: 4.9,
      likes: 156
    }
  ]

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3>{user.username}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    {user.bio && (
                      <p className="text-sm text-muted-foreground mt-2">{user.bio}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{user.rating}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <Button
                    variant={activeTab === 'projects' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('projects')}
                  >
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Мої проекти
                  </Button>
                  
                  <Button
                    variant={activeTab === 'fonts' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('fonts')}
                  >
                    <Type className="mr-2 h-4 w-4" />
                    Мої шрифти
                  </Button>
                  
                  <Button
                    variant={activeTab === 'friends' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('friends')}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Друзі
                  </Button>
                  
                  <Button
                    variant={activeTab === 'bookmarks' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('bookmarks')}
                  >
                    <Bookmark className="mr-2 h-4 w-4" />
                    Збережені
                  </Button>
                  
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Налаштування
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2>Мої проекти</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Новий проект
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {userProjects.map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{project.title}</CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                          </div>
                          <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                            {project.status === 'published' ? 'Опубліковано' : 'Чернетка'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          {project.status === 'published' && (
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{project.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{project.likes}</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Редагувати</Button>
                            {project.status === 'published' && (
                              <Button size="sm" variant="ghost">Переглянути</Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'fonts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2>Мої шрифти</h2>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Новий шрифт
                  </Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {userFonts.map((font) => (
                    <Card key={font.id}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3>{font.name}</h3>
                              <p className="text-sm text-muted-foreground">{font.category}</p>
                            </div>
                            <Badge variant={font.status === 'published' ? 'default' : 'secondary'}>
                              {font.status === 'published' ? 'Опубліковано' : 'Чернетка'}
                            </Badge>
                          </div>
                          
                          <div className="bg-muted/50 rounded-lg p-3 text-center">
                            <p className="text-lg" style={{ fontFamily: font.name }}>
                              Швидка коричнева лисиця
                            </p>
                          </div>
                          
                          {font.status === 'published' && (
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{font.downloads} завантажень</span>
                              <span>{font.likes} лайків</span>
                            </div>
                          )}
                          
                          <Button size="sm" variant="outline" className="w-full">
                            Редагувати
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'friends' && (
              <div className="space-y-6">
                <h2>Друзі</h2>
                <div className="space-y-3">
                  {friends.map((friend) => (
                    <Card key={friend.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={friend.avatar} />
                              <AvatarFallback>{friend.username[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p>{friend.username}</p>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  friend.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                                }`} />
                                <span className="text-sm text-muted-foreground">
                                  {friend.status === 'online' ? 'В мережі' : 'Не в мережі'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Переглянути профіль
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookmarks' && (
              <div className="space-y-6">
                <h2>Збережені проекти</h2>
                <div className="space-y-3">
                  {bookmarkedProjects.map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3>{project.title}</h3>
                            <p className="text-sm text-muted-foreground">від {project.author}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{project.rating}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{project.likes}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Переглянути
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2>Налаштування профілю</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Ім'я користувача</label>
                        <input 
                          type="text" 
                          defaultValue={user.username}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input 
                          type="email" 
                          defaultValue={user.email}
                          className="w-full p-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Біографія</label>
                        <textarea 
                          defaultValue={user.bio}
                          className="w-full p-2 border rounded-lg h-20"
                          placeholder="Розкажіть про себе..."
                        />
                      </div>
                      <Button>Зберегти зміни</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}