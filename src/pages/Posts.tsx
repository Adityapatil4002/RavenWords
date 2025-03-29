
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, Post } from '@/lib/api';
import PostCard from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Tag as TagIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const Posts = () => {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['publishedPosts'],
    queryFn: getAllPosts // Changed from getPublishedPosts to getAllPosts to show all blogs
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract all unique tags from posts
  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    
    posts.forEach((post) => {
      post.tags.forEach((tag) => {
        tags.add(tag);
      });
    });
    
    return Array.from(tags);
  }, [posts]);
  
  // Filter posts based on search query and selected tags
  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery = searchQuery === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every((tag) => post.tags.includes(tag));
      
      return matchesQuery && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);
  
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => 
      prev.includes(tag) 
        ? prev.filter((t) => t !== tag) 
        : [...prev, tag]
    );
  };
  
  return (
    <div className="py-8 md:py-12">
      <div className="container">
        <motion.div 
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          
          <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>
        
        {/* Tags */}
        {allTags.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TagIcon className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Filter by tag</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag, index) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 + (index * 0.03) }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
              {selectedTags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: 0.3 }}
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedTags([])}
                    className="text-xs h-7"
                  >
                    Clear filters
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Results count */}
        <motion.p 
          className="text-sm text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {isLoading 
            ? 'Loading posts...' 
            : filteredPosts.length === 0 
              ? 'No posts found' 
              : `Showing ${filteredPosts.length} ${filteredPosts.length === 1 ? 'post' : 'posts'}`}
        </motion.p>
        
        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + (index * 0.05) }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredPosts.length === 0 && !isLoading && (
          <motion.div 
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="bg-primary/10 p-3 rounded-full mb-4"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              <Search className="h-6 w-6 text-primary" />
            </motion.div>
            <h3 className="text-xl font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground max-w-md mb-6">
              {selectedTags.length > 0 
                ? "Try removing some filters or changing your search query." 
                : "No posts match your search criteria. Try a different search term."}
            </p>
            {searchQuery || selectedTags.length > 0 ? (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTags([]);
                  }}
                >
                  Clear all filters
                </Button>
              </motion.div>
            ) : null}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Posts;
