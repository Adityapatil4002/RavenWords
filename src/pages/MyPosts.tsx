
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { PlusCircle, Eye, EyeOff, Pencil, Search } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyPosts = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  
  // Format date
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);
  
  const publishedPosts = React.useMemo(() => {
    return filteredPosts.filter((post) => post.published);
  }, [filteredPosts]);
  
  const draftPosts = React.useMemo(() => {
    return filteredPosts.filter((post) => !post.published);
  }, [filteredPosts]);
  
  return (
    <div className="py-8">
      <div className="container max-w-5xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">My Posts</h1>
          
          <Link to="/editor">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search your posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All ({filteredPosts.length})
            </TabsTrigger>
            <TabsTrigger value="published">
              Published ({publishedPosts.length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({draftPosts.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-secondary rounded-md"></div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery 
                    ? "No posts match your search criteria." 
                    : "You haven't created any posts yet."}
                </p>
                {searchQuery ? (
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                ) : (
                  <Link to="/editor">
                    <Button>Create your first post</Button>
                  </Link>
                )}
              </div>
            ) : (
              renderPostList(filteredPosts)
            )}
          </TabsContent>
          
          <TabsContent value="published" className="space-y-4">
            {publishedPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No published posts</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any published posts yet.
                </p>
                {filteredPosts.length > 0 ? (
                  <p className="text-sm">
                    Go to the "All" tab to see your drafts.
                  </p>
                ) : (
                  <Link to="/editor">
                    <Button>Create your first post</Button>
                  </Link>
                )}
              </div>
            ) : (
              renderPostList(publishedPosts)
            )}
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-4">
            {draftPosts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No drafts</h3>
                <p className="text-muted-foreground mb-4">
                  You don't have any draft posts.
                </p>
                <Link to="/editor">
                  <Button>Create a new post</Button>
                </Link>
              </div>
            ) : (
              renderPostList(draftPosts)
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
  
  function renderPostList(postList: typeof posts) {
    return postList.map((post) => (
      <Card key={post.id} className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {post.coverImage && (
              <div className="sm:w-1/4 aspect-[3/2] sm:aspect-auto">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className={`p-4 flex-1 ${post.coverImage ? 'sm:w-3/4' : 'w-full'}`}>
              <div className="flex justify-between mb-2">
                <h3 className="text-lg font-medium truncate">{post.title}</h3>
                <Badge variant={post.published ? "default" : "outline"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </div>
              
              <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
                {post.excerpt}
              </p>
              
              <div className="text-xs text-muted-foreground">
                Last updated: {formatDate(post.updatedAt)}
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="bg-card border-t border-border/40 p-3 flex justify-end gap-2">
          <Link to={`/post/${post.id}`}>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-1" /> View
            </Button>
          </Link>
          
          <Link to={`/editor/${post.id}`}>
            <Button size="sm">
              <Pencil className="h-4 w-4 mr-1" /> Edit
            </Button>
          </Link>
        </CardFooter>
      </Card>
    ));
  }
};

export default MyPosts;
