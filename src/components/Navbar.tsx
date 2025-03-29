
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PenLine, Menu, X } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <PenLine className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RavenWords</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Home
          </Link>
          <Link 
            to="/posts" 
            className={`text-sm font-medium transition-colors ${isActive('/posts') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Blogs
          </Link>
          <Link 
            to="/editor" 
            className={`text-sm font-medium transition-colors ${isActive('/editor') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            Write
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            About
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/editor">
            <Button>Start Writing</Button>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="container py-4 flex flex-col gap-4">
            <Link 
              to="/" 
              className={`px-2 py-2 text-base font-medium rounded-md ${isActive('/') ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/posts" 
              className={`px-2 py-2 text-base font-medium rounded-md ${isActive('/posts') ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <Link 
              to="/editor" 
              className={`px-2 py-2 text-base font-medium rounded-md ${isActive('/editor') ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Write
            </Link>
            <Link 
              to="/about" 
              className={`px-2 py-2 text-base font-medium rounded-md ${isActive('/about') ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary/50'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link to="/editor" className="mt-2" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Start Writing</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
