
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share, Download, Twitter, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface MemeResultProps {
  memeUrl: string;
  caption: string;
  onReset: () => void;
}

const MemeResult: React.FC<MemeResultProps> = ({ memeUrl, caption, onReset }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = memeUrl;
    link.download = `meme-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Your Meme is Ready!</h2>
      
      <div className="relative rounded-xl overflow-hidden border-4 border-meme-purple shadow-lg mb-6">
        <img src={memeUrl} alt="Generated Meme" className="w-full h-auto" />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="meme-text text-xl md:text-2xl text-center">{caption}</p>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <Button onClick={handleDownload} className="button-hover">
          <Download className="mr-2 h-4 w-4" />
          Download Meme
        </Button>
        
        <Button variant="outline" onClick={onReset} className="button-hover">
          Create Another Meme
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          <span className="text-sm font-medium">Share your meme with the world!</span>
        </div>
        
        <Separator />
        
        <div className="flex gap-3 justify-center">
          <Button variant="outline" size="icon" className="rounded-full button-hover">
            <Twitter className="h-5 w-5 text-[#1DA1F2]" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full button-hover">
            <Facebook className="h-5 w-5 text-[#4267B2]" />
          </Button>
        </div>
        
        <p className="text-center text-sm text-muted-foreground">
          Feeling funny yet? Your meme is about to go viral!
        </p>
      </div>
    </div>
  );
};

export default MemeResult;
