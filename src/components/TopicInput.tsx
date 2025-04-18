
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';

interface TopicInputProps {
  onTopicSubmit: (topic: string) => void;
  isLoading: boolean;
}

const TopicInput: React.FC<TopicInputProps> = ({ onTopicSubmit, isLoading }) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onTopicSubmit(topic.trim());
    }
  };

  return (
    <div className="w-full md:max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-3 text-center">Or enter a topic for an AI-generated meme</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Got a funny idea? Type it here!"
            className="pr-12"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Sparkles className="h-5 w-5 text-meme-purple" />
          </div>
        </div>
        
        <Button 
          type="submit"
          className="w-full bg-gradient-fun hover:opacity-90 button-hover"
          disabled={!topic.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full"></div>
              Creating meme magic...
            </>
          ) : (
            <>Generate Meme!</>
          )}
        </Button>
      </form>
    </div>
  );
};

export default TopicInput;
