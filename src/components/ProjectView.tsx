import { useState } from 'react'
import { Star, Eye, Heart, MessageCircle, Share, Bookmark, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Textarea } from './ui/textarea'
import { useAuth } from './AuthContext'
import { toast } from 'sonner@2.0.3'

interface Comment {
  id: string
  author: {
    username: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

interface ProjectViewProps {
  projectId?: string
  onNavigate?: (page: string) => void
}

export function ProjectView({ projectId = '1', onNavigate }: ProjectViewProps) {
  const { user, isAuthenticated } = useAuth()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        username: 'jane_designer',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Чудовий проект! Дуже подобається дизайн та анімації. Можна було б додати більше інтерактивності.',
      timestamp: '2024-01-20T10:30:00Z',
      likes: 5,
      isLiked: false
    },
    {
      id: '2',
      author: {
        username: 'dev_master',
        avatar: '/api/placeholder/40/40'
      },
      content: 'Код дуже чистий та зрозумілий. Гарна робота з CSS анімаціями!',
      timestamp: '2024-01-20T09:15:00Z',
      likes: 3,
      isLiked: true
    }
  ])

  // Mock project data
  const project = {
    id: projectId,
    title: 'Modern Dashboard UI',
    author: {
      username: 'john_doe',
      avatar: '/api/placeholder/64/64',
      rating: 4.8
    },
    description: 'Сучасний інтерфейс панелі управління з темною темою та плавними анімаціями. Включає графіки, таблиці та інтерактивні елементи.',
    tags: ['React', 'Dashboard', 'Dark Theme', 'Animation', 'Charts'],
    stats: {
      views: 1234,
      likes: 89,
      rating: 4.8,
      totalRatings: 23
    },
    publishDate: '2024-01-15',
    lastUpdated: '2024-01-18',
    htmlCode: `<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <div class="dashboard">
        <h1>Analytics Dashboard</h1>
        <div class="stats">
            <div class="stat-card">
                <h3>Total Users</h3>
                <p>12,345</p>
            </div>
        </div>
    </div>
</body>
</html>`,
    cssCode: `body { font-family: Arial, sans-serif; margin: 0; background: #1a1a1a; color: white; }
.dashboard { padding: 20px; }
.stats { display: flex; gap: 20px; }
.stat-card { background: #2a2a2a; padding: 20px; border-radius: 8px; flex: 1; }`,
    jsCode: `console.log('Dashboard loaded');`
  }

  const previewContent = project.htmlCode.replace(
    '</head>',
    `<style>${project.cssCode}</style></head>`
  ).replace(
    '</body>',
    `<script>${project.jsCode}</script></body>`
  )

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Лайк знято' : 'Проект вподобано!')
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? 'Видалено зі збережених' : 'Додано до збережених!')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Посилання скопійовано!')
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    toast.success(`Ви оцінили проект на ${rating} зірок`)
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        username: user?.username || 'Anonymous',
        avatar: user?.avatar || '/api/placeholder/40/40'
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      isLiked: false
    }
    
    setComments([comment, ...comments])
    setNewComment('')
    toast.success('Коментар додано!')
  }

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) return `${diffInMinutes} хв тому`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} год тому`
    return `${Math.floor(diffInMinutes / 1440)} днів тому`
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <h1>{project.title}</h1>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={project.author.avatar} />
                          <AvatarFallback>{project.author.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{project.author.username}</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{project.author.rating}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Опубліковано {formatDate(project.publishDate)}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Live Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video border rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={previewContent}
                    className="w-full h-full border-0"
                    title="Project Preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle>Коментарі ({comments.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {isAuthenticated && (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Додайте свій коментар..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[80px]"
                    />
                    <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                      Додати коментар
                    </Button>
                  </div>
                )}
                
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.author.avatar} />
                          <AvatarFallback>{comment.author.username[0].toUpperCase()}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{comment.author.username}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatTimeAgo(comment.timestamp)}
                            </span>
                          </div>
                          
                          <p className="text-sm">{comment.content}</p>
                          
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleCommentLike(comment.id)}
                              className="h-6 px-2"
                            >
                              <ThumbsUp className={`h-3 w-3 mr-1 ${comment.isLiked ? 'fill-current' : ''}`} />
                              {comment.likes}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats & Actions */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span>{project.stats.views}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Переглядів</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center space-x-1">
                      <Heart className="h-4 w-4 text-muted-foreground" />
                      <span>{project.stats.likes}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Лайків</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{project.stats.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({project.stats.totalRatings} оцінок)
                    </span>
                  </div>
                  
                  {isAuthenticated && (
                    <div className="flex justify-center space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRating(star)}
                          className="text-yellow-400 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`h-5 w-5 ${
                              star <= userRating ? 'fill-current' : ''
                            }`} 
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {isAuthenticated && (
                  <div className="space-y-2">
                    <Button 
                      variant={isLiked ? 'default' : 'outline'} 
                      className="w-full"
                      onClick={handleLike}
                    >
                      <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Вподобано' : 'Подобається'}
                    </Button>
                    
                    <Button 
                      variant={isBookmarked ? 'default' : 'outline'} 
                      className="w-full"
                      onClick={handleBookmark}
                    >
                      <Bookmark className={`mr-2 h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      {isBookmarked ? 'Збережено' : 'Зберегти'}
                    </Button>
                    
                    <Button variant="outline" className="w-full" onClick={handleShare}>
                      <Share className="mr-2 h-4 w-4" />
                      Поділитися
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Про автора</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar>
                    <AvatarImage src={project.author.avatar} />
                    <AvatarFallback>{project.author.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{project.author.username}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground">{project.author.rating}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Переглянути профіль
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}