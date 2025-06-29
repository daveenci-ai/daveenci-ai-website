
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Comparison from '@/components/Comparison';
import UseCases from '@/components/UseCases';
import Stats from '@/components/Stats';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Comparison />
      <UseCases />
      <Stats />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
