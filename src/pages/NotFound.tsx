
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container flex flex-col items-center justify-center py-24 md:py-32 text-center">
      <h1 className="text-7xl md:text-9xl font-bold text-primary mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-semibold mb-6">Page not found</p>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved to another URL.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/">
          <Button size="lg">Return to Home</Button>
        </Link>
        <Link to="/posts">
          <Button variant="outline" size="lg">Browse Posts</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
