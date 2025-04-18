
import React from 'react';
import Header from '@/components/Header';
import MemeGenerator from '@/components/MemeGenerator';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-12 px-4">
        <MemeGenerator />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
