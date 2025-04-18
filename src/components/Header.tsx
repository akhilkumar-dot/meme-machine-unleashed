
import React from 'react';
import { Zap, Laugh } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6 border-b">
      <div className="container max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Laugh className="h-10 w-10 text-meme-pink animate-bounce-slight" />
          <h1 className="text-4xl font-bold">
            <span className="fun-gradient">Meme</span> Machine
          </h1>
        </div>
        <div className="flex items-center gap-1 bg-gradient-to-r from-meme-pink to-meme-blue p-[1px] rounded-full">
          <div className="bg-white dark:bg-black rounded-full px-4 py-2 flex items-center gap-2">
            <Zap className="h-5 w-5 text-meme-orange animate-pulse-slight" />
            <p className="text-lg font-medium">Unleash Your Inner Meme Master!</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
