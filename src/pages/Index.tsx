
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getPublishedPosts } from '@/lib/api';
import PostCard from '@/components/PostCard';
import { ArrowRight, PenLine, Zap, Shield, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const Index = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ['publishedPosts'],
    queryFn: getPublishedPosts
  });

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40 py-16 md:py-24">
        <div className="container relative z-10">
          <motion.div 
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gradient-primary"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Express Your Ideas in the Dark
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              The modern blog writing platform designed for focused writing with a beautiful dark theme. Start writing your thoughts in style.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/editor">
                  <Button size="lg" className="font-medium">
                    Start Writing <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/posts">
                  <Button size="lg" variant="outline" className="font-medium">
                    Read Blogs
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Background gradient */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-primary/20 to-background pointer-events-none" 
            style={{ filter: 'blur(120px)' }}
            animate={{ 
              opacity: [0.5, 0.7, 0.5], 
              scale: [1, 1.1, 1] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              repeatType: "reverse" 
            }}
          ></motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Designed for Modern Writers
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-lg border border-border/40 bg-card/50"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <motion.div 
                className="bg-primary/10 p-3 rounded-full mb-4"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(var(--primary), 0.2)"
                }}
              >
                <PenLine className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-medium mb-2">Clean Editor</h3>
              <p className="text-muted-foreground">Distraction-free writing environment that lets you focus on your content</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-lg border border-border/40 bg-card/50"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <motion.div 
                className="bg-primary/10 p-3 rounded-full mb-4"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(var(--primary), 0.2)"
                }}
              >
                <Zap className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-medium mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">Optimized performance for a smooth writing experience</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center p-6 rounded-lg border border-border/40 bg-card/50"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)" }}
            >
              <motion.div 
                className="bg-primary/10 p-3 rounded-full mb-4"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(var(--primary), 0.2)"
                }}
              >
                <Shield className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="text-xl font-medium mb-2">Content Security</h3>
              <p className="text-muted-foreground">Your work is securely stored and backed up automatically</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Dark Mode Showcase Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container">
          <motion.div 
            className="flex flex-col md:flex-row gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-primary/10 p-2 rounded-full w-fit mb-4">
                <Palette className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">Beautiful Dark Theme</h2>
              <p className="text-muted-foreground mb-6">
                Our elegant dark theme reduces eye strain and creates an immersive writing environment. Perfect for night owls and those who prefer a more comfortable writing experience.
              </p>
              <motion.ul 
                className="space-y-3 mb-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <motion.li 
                  className="flex items-center gap-2"
                  variants={itemVariants}
                >
                  <div className="rounded-full bg-primary/20 p-1">
                    <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-muted-foreground">Reduces eye strain during long writing sessions</span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2"
                  variants={itemVariants}
                >
                  <div className="rounded-full bg-primary/20 p-1">
                    <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-muted-foreground">Modern UI with carefully selected color palette</span>
                </motion.li>
                <motion.li 
                  className="flex items-center gap-2"
                  variants={itemVariants}
                >
                  <div className="rounded-full bg-primary/20 p-1">
                    <svg className="h-3 w-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <span className="text-sm text-muted-foreground">Beautiful typography for optimal readability</span>
                </motion.li>
              </motion.ul>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.div 
                className="bg-card/50 border border-border/40 rounded-lg p-4 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-2 mb-4 border-b border-border/40 pb-3">
                  <div className="rounded-full w-3 h-3 bg-red-500"></div>
                  <div className="rounded-full w-3 h-3 bg-yellow-500"></div>
                  <div className="rounded-full w-3 h-3 bg-green-500"></div>
                  <div className="ml-auto text-xs text-muted-foreground">darkwrite.app</div>
                </div>
                <div className="space-y-3">
                  <motion.div 
                    className="h-6 bg-secondary rounded-md w-3/4"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                  <motion.div 
                    className="h-4 bg-secondary rounded-md w-full"
                    animate={{ opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
                  ></motion.div>
                  <motion.div 
                    className="h-4 bg-secondary rounded-md w-5/6"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: 0.4 }}
                  ></motion.div>
                  <motion.div 
                    className="h-4 bg-secondary rounded-md w-full"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 2.7, repeat: Infinity, delay: 0.6 }}
                  ></motion.div>
                  <motion.div 
                    className="h-4 bg-secondary rounded-md w-4/5"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, delay: 0.8 }}
                  ></motion.div>
                  <motion.div 
                    className="h-6 bg-secondary rounded-md w-2/3 mt-6"
                    animate={{ opacity: [0.6, 0.8, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: 1 }}
                  ></motion.div>
                  <motion.div 
                    className="h-4 bg-secondary rounded-md w-full"
                    animate={{ opacity: [0.7, 0.9, 0.7] }}
                    transition={{ duration: 2.1, repeat: Infinity, delay: 1.2 }}
                  ></motion.div>
                  <motion.div 
                    className="h-4 bg-secondary rounded-md w-5/6"
                    animate={{ opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: 1.4 }}
                  ></motion.div>
                  <motion.div 
                    className="h-4 bg-secondary rounded-md w-full"
                    animate={{ opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 2.3, repeat: Infinity, delay: 1.6 }}
                  ></motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Recent Posts Section */}
      {posts.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <motion.div 
              className="flex items-center justify-between mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight">Recent Posts</h2>
              <motion.div whileHover={{ x: 5 }} whileTap={{ x: 0 }}>
                <Link to="/posts" className="text-primary hover:underline flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {posts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  custom={index}
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary/5 border-y border-border/40">
        <div className="container text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Start Writing?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join other writers who have already discovered the joy of writing with our dark-themed editor.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/editor">
              <Button size="lg" className="font-medium">
                Create Your First Post
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
