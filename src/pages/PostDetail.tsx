
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '@/lib/api';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts
  });
  
  const post = React.useMemo(() => {
    return posts.find(p => p.id === id);
  }, [posts, id]);
  
  // If post not found, navigate to 404
  useEffect(() => {
    if (!isLoading && !post) {
      navigate('/not-found', { replace: true });
    }
  }, [post, isLoading, navigate]);
  
  // Format date
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-secondary rounded-md w-3/4"></div>
          <div className="h-4 bg-secondary rounded-md w-1/4"></div>
          <div className="h-64 bg-secondary rounded-md"></div>
          <div className="space-y-2">
            <div className="h-4 bg-secondary rounded-md"></div>
            <div className="h-4 bg-secondary rounded-md"></div>
            <div className="h-4 bg-secondary rounded-md w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return null; // Will redirect to 404
  }
  
  return (
    <article className="py-8 md:py-12">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time>{formatDate(post.createdAt)}</time>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {post.coverImage && (
          <div className="aspect-[21/9] mb-8 overflow-hidden rounded-lg border border-border/40">
            <img 
              src={post.coverImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-invert max-w-none editor-content">
          {/* Render content as HTML */}
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </div>
    </article>
  );
};

export default PostDetail;
