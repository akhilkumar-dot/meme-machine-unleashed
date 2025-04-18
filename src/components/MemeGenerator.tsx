
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageUpload from './ImageUpload';
import TopicInput from './TopicInput';
import MemeResult from './MemeResult';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { ImageIcon, Sparkles } from 'lucide-react';

const MemeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('upload');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState<{ url: string; caption: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock AI generation functions (to be replaced with actual API calls)
  const generateMemeFromImage = async (image: File) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a placeholder result - in a real app this would come from API
      const caption = "When you finally fix that bug after 8 hours of debugging";
      
      setGeneratedMeme({
        url: URL.createObjectURL(image),
        caption,
      });
      
      toast({
        title: "Meme created!",
        description: "Your hilarious meme is ready to share!"
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "We couldn't generate your meme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMemeFromTopic = async (topic: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we're using a placeholder image
      const response = await fetch('/placeholder.svg');
      const blob = await response.blob();
      
      // Create a placeholder result - in a real app this would come from API
      const caption = `${topic}: When expectations meet reality`;
      
      setGeneratedMeme({
        url: URL.createObjectURL(blob),
        caption,
      });
      
      toast({
        title: "Meme created!",
        description: "Your AI-generated meme is ready to share!"
      });
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "We couldn't generate your meme. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelected = (image: File) => {
    setSelectedImage(image);
    generateMemeFromImage(image);
  };

  const handleTopicSubmit = (topic: string) => {
    generateMemeFromTopic(topic);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setGeneratedMeme(null);
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-lg border-t-4 border-t-meme-purple">
      <CardContent className="pt-6">
        {generatedMeme ? (
          <MemeResult
            memeUrl={generatedMeme.url}
            caption={generatedMeme.caption}
            onReset={handleReset}
          />
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Create an Epic Meme</h2>
              <p className="text-muted-foreground">Upload an image or let AI generate one from a topic</p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="upload" className="flex gap-2 items-center">
                  <ImageIcon className="h-4 w-4" />
                  Upload Image
                </TabsTrigger>
                <TabsTrigger value="topic" className="flex gap-2 items-center">
                  <Sparkles className="h-4 w-4" />
                  Enter Topic
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload">
                <ImageUpload onImageSelected={handleImageSelected} />
              </TabsContent>
              
              <TabsContent value="topic">
                <TopicInput onTopicSubmit={handleTopicSubmit} isLoading={isLoading} />
              </TabsContent>
            </Tabs>
            
            {isLoading && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
                  <div className="h-5 w-5 animate-spin border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="font-medium">Creating meme magic...</span>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MemeGenerator;
