
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  createPost, 
  updatePost, 
  getPostById, 
  getAllPosts, 
  generateExcerpt,
  deletePost,
  togglePublishState
} from '@/lib/api';
import Editor from '@/components/Editor';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  ArrowLeft, 
  Trash, 
  Save, 
  Tag as TagIcon,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const EditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!id;
  
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  
  // Get post data if in edit mode
  const { data: posts = [] } = useQuery({
    queryKey: ['allPosts'],
    queryFn: getAllPosts,
    enabled: isEditMode
  });
  
  const post = React.useMemo(() => {
    if (!isEditMode) return null;
    return posts.find(p => p.id === id);
  }, [posts, id, isEditMode]);
  
  // Initialize state with post data if in edit mode
  React.useEffect(() => {
    if (post) {
      setTags(post.tags);
      setCoverImage(post.coverImage || '');
    }
  }, [post]);
  
  // Save post mutation
  const saveMutation = useMutation({
    mutationFn: async ({ title, content }: { title: string, content: string }) => {
      setIsSaving(true);
      const excerpt = generateExcerpt(content);
      
      if (isEditMode && post) {
        return updatePost(post.id, {
          title,
          content,
          excerpt,
          coverImage,
          tags
        });
      } else {
        return createPost({
          title,
          content,
          excerpt,
          coverImage,
          tags,
          published: false
        });
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      
      if (!isEditMode) {
        navigate(`/editor/${data.id}`);
        toast.success("Post created successfully!");
      } else {
        toast.success("Post updated successfully!");
      }
      setIsSaving(false);
    },
    onError: () => {
      setIsSaving(false);
      toast.error("Failed to save post. Please try again.");
    }
  });
  
  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!id) return Promise.reject("No post ID");
      return deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      navigate('/my-posts');
      toast.success("Post deleted successfully");
    }
  });
  
  // Toggle publish state mutation
  const publishMutation = useMutation({
    mutationFn: () => {
      if (!id) return Promise.reject("No post ID");
      return togglePublishState(id);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['allPosts'] });
      queryClient.invalidateQueries({ queryKey: ['publishedPosts'] });
      
      if (data.published) {
        toast.success("Post published successfully!");
      } else {
        toast.success("Post unpublished");
      }
    }
  });
  
  const handleSave = (title: string, content: string) => {
    if (!title.trim()) {
      toast.error("Please add a title to your post");
      return;
    }
    
    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    
    saveMutation.mutate({ title, content });
  };
  
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div className="py-6">
      <div className="container max-w-5xl">
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Post' : 'New Post'}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            {isEditMode && (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="outline" 
                    onClick={() => publishMutation.mutate()}
                    disabled={publishMutation.isPending}
                  >
                    {post?.published ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" /> Unpublish
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" /> Publish
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Post</DialogTitle>
                    </DialogHeader>
                    <p className="text-muted-foreground">
                      Are you sure you want to delete this post? This action cannot be undone.
                    </p>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => null}>Cancel</Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </motion.div>
        
        <div className="space-y-6">
          {/* Cover Image Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <label className="text-sm font-medium mb-2 block">Cover Image URL</label>
            <Input 
              placeholder="Enter image URL for cover image"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
            {coverImage && (
              <motion.div 
                className="mt-2 aspect-[21/9] w-full overflow-hidden rounded-md border border-border/40"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={coverImage} 
                  alt="Cover preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    toast.error("Invalid image URL");
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = 'block';
                  }}
                />
              </motion.div>
            )}
          </motion.div>
          
          {/* Tags Input */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <label className="text-sm font-medium mb-2 block flex items-center gap-2">
              <TagIcon className="h-4 w-4" /> Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <motion.div 
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1"
                >
                  <span>{tag}</span>
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleRemoveTag(tag)} 
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleAddTag} variant="secondary">Add</Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Editor Component */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Editor
              initialTitle={post?.title || ''}
              initialContent={post?.content || ''}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;
