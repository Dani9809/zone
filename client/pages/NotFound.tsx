import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-heading font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! We couldn't find the page you're looking for. Let's get you back
          on track with your dreams.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-heading font-bold hover:bg-primary/90 transition-colors"
        >
          <Home className="w-5 h-5" />
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
