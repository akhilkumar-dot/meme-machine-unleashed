
import React from 'react';
import { Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-6 border-t mt-12">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              Created with meme magic!
            </p>
            <Heart className="h-4 w-4 text-meme-pink animate-pulse-slight" />
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-meme-blue transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-meme-blue transition-colors">
              Privacy
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-meme-blue transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
