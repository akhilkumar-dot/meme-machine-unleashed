
import React, { useState, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface ImageUploadProps {
  onImageSelected: (image: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((file: File) => {
    // Basic validation
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Oops! That's not an image",
        description: "Please select a valid image file (JPEG, PNG, GIF, etc.)",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Image too large!",
        description: "Please select an image smaller than 5MB",
        variant: "destructive"
      });
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageSelected(file);
    
    toast({
      title: "Image uploaded!",
      description: "Now let's make some meme magic!",
    });
  }, [onImageSelected, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  return (
    <div className="w-full md:max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-3 text-center">Upload an image to meme-ify</h2>
      
      {previewUrl ? (
        <div className="relative rounded-xl overflow-hidden">
          <img src={previewUrl} alt="Preview" className="w-full h-auto object-cover" />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button 
              onClick={() => {
                URL.revokeObjectURL(previewUrl);
                setPreviewUrl(null);
              }}
              variant="destructive"
            >
              Choose Another Image
            </Button>
          </div>
        </div>
      ) : (
        <div 
          className={`image-upload-zone ${isDragging ? 'border-primary bg-primary/10' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-meme-blue" />
            </div>
            
            <p className="text-lg mb-2">Drag & drop an image here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            
            <Button 
              variant="outline"
              className="button-hover"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <ImageIcon className="mr-2 h-4 w-4" />
              Choose File
            </Button>
            <input 
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
            />
            
            <p className="text-xs text-muted-foreground mt-4">
              Supported formats: JPEG, PNG, GIF, etc. (Max 5MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
