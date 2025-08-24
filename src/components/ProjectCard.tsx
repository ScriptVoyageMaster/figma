import { Star, Eye, Heart } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

interface ProjectCardProps {
  title: string
  author: string
  description: string
  tags: string[]
  rating: number
  views: number
  likes: number
  imageUrl?: string
  onClick?: () => void
}

export function ProjectCard({ 
  title, 
  author, 
  description, 
  tags, 
  rating, 
  views, 
  likes,
  imageUrl,
  onClick 
}: ProjectCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={onClick}>
      <CardHeader className="p-0">
        <div className="aspect-video bg-muted rounded-t-lg relative overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
              <span className="text-muted-foreground">Прев'ю проекту</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-medium line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground">від {author}</p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{likes}</span>
              </div>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 px-2"
              onClick={(e) => {
                e.stopPropagation()
                onClick?.()
              }}
            >
              Переглянути
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}