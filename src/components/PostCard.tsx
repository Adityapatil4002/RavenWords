
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag } from 'lucide-react';
import { Post } from '@/lib/api';
import { motion } from 'framer-motion';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Format date to readable string
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }} 
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="overflow-hidden border-border/40 transition-all hover:shadow-md">
        <Link to={`/post/${post.id}`}>
          {post.coverImage && (
            <div className="aspect-video w-full overflow-hidden">
              <motion.img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
          
          <CardHeader className="px-4 py-3">
            <motion.h3 
              className="text-xl font-bold tracking-tight"
              whileHover={{ color: "hsl(var(--primary))" }}
              transition={{ duration: 0.2 }}
            >
              {post.title}
            </motion.h3>
          </CardHeader>
          
          <CardContent className="px-4 py-2">
            <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
          </CardContent>
          
          <CardFooter className="px-4 py-3 flex flex-wrap gap-2 text-xs text-muted-foreground border-t border-border/40">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
            
            {post.tags.length > 0 && (
              <div className="flex items-center gap-1 ml-auto">
                <Tag className="h-3 w-3" />
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{post.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardFooter>
        </Link>
      </Card>
    </motion.div>
  );
};

export default PostCard;
