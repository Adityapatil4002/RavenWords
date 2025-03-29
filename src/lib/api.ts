
import { toast } from "sonner";

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  tags: string[];
}

// Local storage keys
const POSTS_STORAGE_KEY = 'darkwrite-posts';

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Get posts from localStorage
const getPosts = (): Post[] => {
  try {
    const posts = localStorage.getItem(POSTS_STORAGE_KEY);
    const parsedPosts = posts ? JSON.parse(posts) : [];
    return parsedPosts;
  } catch (error) {
    console.error("Failed to parse posts from localStorage:", error);
    return [];
  }
};

// Save posts to localStorage
const savePosts = (posts: Post[]): void => {
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Failed to save posts to localStorage:", error);
    toast.error("Failed to save posts to storage");
  }
};

// Get a specific post by ID
export const getPostById = (id: string): Post | undefined => {
  const posts = getPosts();
  return posts.find(post => post.id === id);
};

// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const posts = getPosts();
    // Convert string dates to Date objects
    return posts.map(post => ({
      ...post,
      createdAt: new Date(post.createdAt),
      updatedAt: new Date(post.updatedAt)
    }));
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    toast.error("Failed to load posts");
    return [];
  }
};

// Get published posts
export const getPublishedPosts = async (): Promise<Post[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const posts = getPosts();
    // Filter published posts and convert dates
    return posts
      .filter(post => post.published)
      .map(post => ({
        ...post,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.updatedAt)
      }));
  } catch (error) {
    console.error("Failed to fetch published posts:", error);
    toast.error("Failed to load posts");
    return [];
  }
};

// Create a new post
export const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const posts = getPosts();
    const now = new Date();
    
    const newPost: Post = {
      id: generateId(),
      ...post,
      createdAt: now,
      updatedAt: now
    };
    
    posts.push(newPost);
    savePosts(posts);
    toast.success("Post created successfully");
    return newPost;
  } catch (error) {
    console.error("Failed to create post:", error);
    toast.error("Failed to create post");
    throw error;
  }
};

// Update an existing post
export const updatePost = async (id: string, updates: Partial<Omit<Post, 'id' | 'createdAt'>>): Promise<Post> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const posts = getPosts();
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
      throw new Error("Post not found");
    }
    
    const updatedPost: Post = {
      ...posts[postIndex],
      ...updates,
      updatedAt: new Date()
    };
    
    posts[postIndex] = updatedPost;
    savePosts(posts);
    toast.success("Post updated successfully");
    return updatedPost;
  } catch (error) {
    console.error("Failed to update post:", error);
    toast.error("Failed to update post");
    throw error;
  }
};

// Delete a post
export const deletePost = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const posts = getPosts();
    const filteredPosts = posts.filter(post => post.id !== id);
    
    if (filteredPosts.length === posts.length) {
      throw new Error("Post not found");
    }
    
    savePosts(filteredPosts);
    toast.success("Post deleted successfully");
  } catch (error) {
    console.error("Failed to delete post:", error);
    toast.error("Failed to delete post");
    throw error;
  }
};

// Toggle publish state
export const togglePublishState = async (id: string): Promise<Post> => {
  try {
    const post = getPostById(id);
    if (!post) {
      throw new Error("Post not found");
    }
    
    return await updatePost(id, { published: !post.published });
  } catch (error) {
    console.error("Failed to toggle publish state:", error);
    toast.error("Failed to update post");
    throw error;
  }
};

// Generate an excerpt from the content
export const generateExcerpt = (content: string, maxLength: number = 150): string => {
  // Remove HTML tags if present
  const text = content.replace(/<[^>]*>?/gm, '');
  
  if (text.length <= maxLength) {
    return text;
  }
  
  // Find the last space before maxLength
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return truncated.substring(0, lastSpace) + '...';
};
