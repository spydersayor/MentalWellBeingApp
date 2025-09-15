"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  Plus,
  Heart,
  MessageCircle,
  Flag,
  Search,
  Clock,
  Users,
  Shield,
  Lightbulb,
  BookOpen,
  Coffee,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Post {
  id: string
  title: string
  content: string
  author: string
  authorInitials: string
  category: "support" | "advice" | "success" | "question" | "general"
  tags: string[]
  timestamp: Date
  replies: number
  hearts: number
  isAnonymous: boolean
  isModerated: boolean
}

interface Reply {
  id: string
  postId: string
  content: string
  author: string
  authorInitials: string
  timestamp: Date
  hearts: number
  isAnonymous: boolean
}

export function CommunityPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showNewPost, setShowNewPost] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general" as Post["category"],
    tags: "",
    isAnonymous: true,
  })

  const [newReply, setNewReply] = useState("")

  const posts: Post[] = [
    {
      id: "1",
      title: "Feeling overwhelmed with finals approaching",
      content:
        "Hey everyone, I'm really struggling with the pressure of upcoming finals. I feel like I'm drowning in assignments and can't seem to catch up. Has anyone else felt this way? How did you manage?",
      author: "Anonymous Student",
      authorInitials: "AS",
      category: "support",
      tags: ["finals", "stress", "overwhelmed"],
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      replies: 8,
      hearts: 12,
      isAnonymous: true,
      isModerated: true,
    },
    {
      id: "2",
      title: "Small victory: I asked for help today!",
      content:
        "I've been struggling with anxiety for months and today I finally reached out to the counseling center. It was scary but I'm proud of myself for taking that first step. To anyone hesitating - you're worth the help!",
      author: "Sarah M.",
      authorInitials: "SM",
      category: "success",
      tags: ["anxiety", "counseling", "victory"],
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      replies: 15,
      hearts: 28,
      isAnonymous: false,
      isModerated: true,
    },
    {
      id: "3",
      title: "Tips for better sleep during stressful times?",
      content:
        "My sleep schedule has been completely messed up since midterms started. I lie awake thinking about everything I need to do. Any practical tips that have worked for you?",
      author: "Anonymous Student",
      authorInitials: "AS",
      category: "advice",
      tags: ["sleep", "stress", "tips"],
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      replies: 6,
      hearts: 9,
      isAnonymous: true,
      isModerated: true,
    },
    {
      id: "4",
      title: "How do you deal with homesickness?",
      content:
        "I'm a freshman and really missing home lately. It's affecting my mood and motivation. I know this is normal but it still feels really hard. What helped you adjust?",
      author: "Alex K.",
      authorInitials: "AK",
      category: "question",
      tags: ["homesickness", "freshman", "adjustment"],
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      replies: 11,
      hearts: 16,
      isAnonymous: false,
      isModerated: true,
    },
    {
      id: "5",
      title: "Study group for accountability?",
      content:
        "Looking to form a virtual study group where we can check in with each other and stay motivated. Anyone interested in joining? We could meet a few times a week just to share goals and progress.",
      author: "Jamie L.",
      authorInitials: "JL",
      category: "general",
      tags: ["study group", "accountability", "motivation"],
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      replies: 4,
      hearts: 7,
      isAnonymous: false,
      isModerated: true,
    },
  ]

  const replies: Reply[] = [
    {
      id: "1",
      postId: "1",
      content:
        "I totally understand this feeling! What helped me was breaking everything down into smaller tasks and celebrating small wins. Also, don't forget to take breaks - your brain needs rest to function well.",
      author: "Anonymous Student",
      authorInitials: "AS",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      hearts: 5,
      isAnonymous: true,
    },
    {
      id: "2",
      postId: "1",
      content:
        "Have you tried the Pomodoro technique? 25 minutes of focused work, then a 5-minute break. It really helps me when I feel overwhelmed. You've got this! 💪",
      author: "Mike R.",
      authorInitials: "MR",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      hearts: 3,
      isAnonymous: false,
    },
  ]

  const categories = [
    { id: "all", label: "All Posts", icon: Users },
    { id: "support", label: "Support", icon: Heart },
    { id: "advice", label: "Advice", icon: Lightbulb },
    { id: "success", label: "Success Stories", icon: Coffee },
    { id: "question", label: "Questions", icon: MessageCircle },
    { id: "general", label: "General", icon: BookOpen },
  ]

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return b.timestamp.getTime() - a.timestamp.getTime()
      } else if (sortBy === "popular") {
        return b.hearts + b.replies - (a.hearts + a.replies)
      }
      return 0
    })

  const getCategoryColor = (category: Post["category"]) => {
    switch (category) {
      case "support":
        return "bg-red-100 text-red-800"
      case "advice":
        return "bg-blue-100 text-blue-800"
      case "success":
        return "bg-green-100 text-green-800"
      case "question":
        return "bg-yellow-100 text-yellow-800"
      case "general":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const handleCreatePost = () => {
    // In a real app, this would submit to the backend
    console.log("Creating post:", newPost)
    setShowNewPost(false)
    setNewPost({
      title: "",
      content: "",
      category: "general",
      tags: "",
      isAnonymous: true,
    })
  }

  const handleReply = () => {
    // In a real app, this would submit to the backend
    console.log("Adding reply:", newReply)
    setNewReply("")
  }

  if (showNewPost) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card p-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" onClick={() => setShowNewPost(false)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Create New Post</h1>
              <p className="text-muted-foreground">Share your thoughts with the community</p>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 lg:p-6">
          <Card>
            <CardHeader>
              <CardTitle>New Community Post</CardTitle>
              <CardDescription>
                Share your experiences, ask questions, or offer support to fellow students
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All posts are moderated to ensure a safe and supportive environment. Please be respectful and follow
                  community guidelines.
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label className="text-sm font-medium">Post Title</label>
                <Input
                  placeholder="What would you like to discuss?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    value={newPost.category}
                    onValueChange={(value) => setNewPost({ ...newPost, category: value as Post["category"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="advice">Advice</SelectItem>
                      <SelectItem value="success">Success Story</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags (comma-separated)</label>
                  <Input
                    placeholder="stress, finals, anxiety"
                    value={newPost.tags}
                    onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <Textarea
                  placeholder="Share your thoughts, experiences, or questions..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={newPost.isAnonymous}
                  onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                />
                <label htmlFor="anonymous" className="text-sm">
                  Post anonymously (recommended for sensitive topics)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreatePost} disabled={!newPost.title || !newPost.content}>
                  Create Post
                </Button>
                <Button variant="outline" onClick={() => setShowNewPost(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedPost) {
    const postReplies = replies.filter((reply) => reply.postId === selectedPost.id)

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card p-4">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <Button variant="ghost" size="icon" onClick={() => setSelectedPost(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold line-clamp-1">{selectedPost.title}</h1>
              <p className="text-muted-foreground">Community Discussion</p>
            </div>
            <Button variant="ghost" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
          {/* Original Post */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>{selectedPost.authorInitials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{selectedPost.author}</span>
                    <Badge className={getCategoryColor(selectedPost.category)} variant="secondary">
                      {selectedPost.category}
                    </Badge>
                    {selectedPost.isAnonymous && (
                      <Badge variant="outline" className="text-xs">
                        Anonymous
                      </Badge>
                    )}
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{formatTimeAgo(selectedPost.timestamp)}</span>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold">{selectedPost.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{selectedPost.content}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="h-4 w-4" />
                      {selectedPost.hearts}
                    </Button>
                    <span className="text-sm text-muted-foreground">{selectedPost.replies} replies</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Replies ({postReplies.length})</h3>

            {postReplies.map((reply) => (
              <Card key={reply.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-sm">{reply.authorInitials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{reply.author}</span>
                        {reply.isAnonymous && (
                          <Badge variant="outline" className="text-xs">
                            Anonymous
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{formatTimeAgo(reply.timestamp)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{reply.content}</p>
                      <Button variant="ghost" size="sm" className="gap-1 h-6 px-2">
                        <Heart className="h-3 w-3" />
                        {reply.hearts}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Reply Form */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium">Add a reply</label>
                  <Textarea
                    placeholder="Share your thoughts or offer support..."
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="reply-anonymous" defaultChecked />
                      <label htmlFor="reply-anonymous" className="text-xs text-muted-foreground">
                        Reply anonymously
                      </label>
                    </div>
                    <Button onClick={handleReply} disabled={!newReply.trim()} size="sm">
                      Post Reply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Peer Support Community</h1>
              <p className="text-muted-foreground">Connect with fellow students in a safe, supportive space</p>
            </div>
          </div>
          <Button onClick={() => setShowNewPost(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Post
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 lg:p-6">
        {/* Community Guidelines */}
        <Alert className="mb-6">
          <Shield className="h-4 w-4" />
          <AlertDescription>
            This is a moderated community focused on peer support. Please be respectful, kind, and remember that
            everyone is on their own journey. If you're in crisis, please seek immediate professional help.
          </AlertDescription>
        </Alert>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts, topics, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedPost(post)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarFallback>{post.authorInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{post.author}</span>
                      <Badge className={getCategoryColor(post.category)} variant="secondary">
                        {post.category}
                      </Badge>
                      {post.isAnonymous && (
                        <Badge variant="outline" className="text-xs">
                          Anonymous
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{formatTimeAgo(post.timestamp)}</span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg leading-tight">{post.title}</h3>
                      <p className="text-muted-foreground line-clamp-2 leading-relaxed">{post.content}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        {post.hearts}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {post.replies} replies
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatTimeAgo(post.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or browse different categories</p>
            <Button onClick={() => setShowNewPost(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create the first post
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
