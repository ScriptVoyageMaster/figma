import { useState, useEffect } from 'react'
import { Save, Play, Share, Eye, Code, Palette, Braces } from 'lucide-react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Badge } from './ui/badge'
import { toast } from 'sonner@2.0.3'

interface ProjectEditorProps {
  onNavigate?: (page: string) => void
}

export function ProjectEditor({ onNavigate }: ProjectEditorProps) {
  const [projectTitle, setProjectTitle] = useState('Новий проект')
  const [projectDescription, setProjectDescription] = useState('')
  const [projectTags, setProjectTags] = useState('')
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мій проект</title>
</head>
<body>
    <div class="container">
        <h1>Привіт, світ!</h1>
        <p>Це мій новий проект.</p>
        <button onclick="changeColor()">Змінити колір</button>
    </div>
</body>
</html>`)
  
  const [cssCode, setCssCode] = useState(`body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 100%;
}

h1 {
    color: #333;
    margin-bottom: 20px;
    font-size: 2.5rem;
}

p {
    color: #666;
    margin-bottom: 30px;
    font-size: 1.1rem;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s ease;
}

button:hover {
    background: #5a6fd8;
}`)

  const [jsCode, setJsCode] = useState(`function changeColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector('button').style.background = randomColor;
    
    // Змінюємо також фон градієнта
    const body = document.body;
    body.style.background = \`linear-gradient(135deg, \${randomColor} 0%, #764ba2 100%)\`;
}

// Додаємо обробник для демонстрації
document.addEventListener('DOMContentLoaded', function() {
    console.log('Проект завантажено!');
});`)

  const [previewContent, setPreviewContent] = useState('')
  const [isAutoPreview, setIsAutoPreview] = useState(true)
  const [lastSaved, setLastSaved] = useState<string>('')

  // Generate preview content
  const generatePreview = () => {
    const combinedContent = htmlCode.replace(
      '</head>',
      `<style>${cssCode}</style></head>`
    ).replace(
      '</body>',
      `<script>${jsCode}</script></body>`
    )
    setPreviewContent(combinedContent)
  }

  // Auto-generate preview when code changes
  useEffect(() => {
    if (isAutoPreview) {
      const debounceTimer = setTimeout(() => {
        generatePreview()
      }, 500)
      return () => clearTimeout(debounceTimer)
    }
  }, [htmlCode, cssCode, jsCode, isAutoPreview])

  const handleSave = () => {
    // Mock save functionality
    const projectData = {
      title: projectTitle,
      description: projectDescription,
      tags: projectTags.split(',').map(tag => tag.trim()).filter(Boolean),
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      lastModified: new Date().toISOString()
    }
    
    // Simulate saving to localStorage
    localStorage.setItem('currentProject', JSON.stringify(projectData))
    setLastSaved(new Date().toLocaleTimeString())
    toast.success('Проект збережено!')
  }

  const handlePublish = () => {
    handleSave()
    toast.success('Проект опубліковано!')
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Посилання скопійовано!')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1>Редактор проектів</h1>
              {lastSaved && (
                <Badge variant="outline" className="text-xs">
                  Збережено {lastSaved}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAutoPreview(!isAutoPreview)}
              >
                <Eye className="h-4 w-4 mr-1" />
                {isAutoPreview ? 'Авто-прев\'ю' : 'Ручний прев\'ю'}
              </Button>
              
              {!isAutoPreview && (
                <Button variant="outline" size="sm" onClick={generatePreview}>
                  <Play className="h-4 w-4 mr-1" />
                  Оновити прев'ю
                </Button>
              )}
              
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-1" />
                Зберегти
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4 mr-1" />
                Поділитися
              </Button>
              
              <Button size="sm" onClick={handlePublish}>
                Опублікувати
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-140px)]">
          {/* Left Panel - Code Editor */}
          <div className="space-y-4">
            {/* Project Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Налаштування проекту</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label htmlFor="title" className="text-sm">Назва проекту</Label>
                  <Input
                    id="title"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-sm">Опис</Label>
                  <Textarea
                    id="description"
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                    className="mt-1 h-16"
                    placeholder="Короткий опис проекту..."
                  />
                </div>
                <div>
                  <Label htmlFor="tags" className="text-sm">Теги (через кому)</Label>
                  <Input
                    id="tags"
                    value={projectTags}
                    onChange={(e) => setProjectTags(e.target.value)}
                    className="mt-1"
                    placeholder="React, HTML, CSS, JavaScript"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Code Editor Tabs */}
            <Card className="flex-1">
              <CardContent className="p-0 h-full">
                <Tabs defaultValue="html" className="h-full flex flex-col">
                  <TabsList className="justify-start border-b rounded-none h-12 p-0">
                    <TabsTrigger value="html" className="flex items-center space-x-2 px-4">
                      <Code className="h-4 w-4" />
                      <span>HTML</span>
                    </TabsTrigger>
                    <TabsTrigger value="css" className="flex items-center space-x-2 px-4">
                      <Palette className="h-4 w-4" />
                      <span>CSS</span>
                    </TabsTrigger>
                    <TabsTrigger value="js" className="flex items-center space-x-2 px-4">
                      <Braces className="h-4 w-4" />
                      <span>JavaScript</span>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="html" className="flex-1 p-4">
                    <div className="h-full">
                      <Label className="text-sm font-medium">HTML</Label>
                      <Textarea
                        value={htmlCode}
                        onChange={(e) => setHtmlCode(e.target.value)}
                        className="h-[calc(100%-2rem)] mt-2 font-mono text-sm"
                        placeholder="Введіть HTML код..."
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="css" className="flex-1 p-4">
                    <div className="h-full">
                      <Label className="text-sm font-medium">CSS</Label>
                      <Textarea
                        value={cssCode}
                        onChange={(e) => setCssCode(e.target.value)}
                        className="h-[calc(100%-2rem)] mt-2 font-mono text-sm"
                        placeholder="Введіть CSS код..."
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="js" className="flex-1 p-4">
                    <div className="h-full">
                      <Label className="text-sm font-medium">JavaScript</Label>
                      <Textarea
                        value={jsCode}
                        onChange={(e) => setJsCode(e.target.value)}
                        className="h-[calc(100%-2rem)] mt-2 font-mono text-sm"
                        placeholder="Введіть JavaScript код..."
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Live Preview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-[calc(100%-4rem)]">
              <div className="h-full border rounded-lg overflow-hidden">
                <iframe
                  srcDoc={previewContent}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}