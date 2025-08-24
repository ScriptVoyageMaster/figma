import { Plus, Download } from 'lucide-react'
import { Card, CardContent, CardHeader } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'

interface FontCardProps {
  name: string
  category: string
  author: string
  previewText?: string
}

export function FontCard({ 
  name, 
  category, 
  author, 
  previewText = "Швидка коричнева лисиця" 
}: FontCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-muted-foreground">від {author}</p>
          </div>
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4 min-h-[80px] flex items-center justify-center">
          <p 
            className="text-2xl text-center"
            style={{ fontFamily: name }}
          >
            {previewText}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button size="sm" className="flex-1">
            <Plus className="h-3 w-3 mr-1" />
            Додати
          </Button>
          <Button size="sm" variant="outline">
            <Download className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}