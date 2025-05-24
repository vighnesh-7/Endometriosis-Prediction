
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold gradient-text">404</h1>
        <h2 className="text-2xl font-medium">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved to another location.
        </p>
        <div className="mt-8">
          <Link to="/">
            <Button variant="default" className="bg-endo hover:bg-endo/90 text-white">
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
