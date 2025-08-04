import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getUseCaseBySlug } from '@/config/api';
import { UseCase } from '@/types';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';

const UseCasePost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [useCase, setUseCase] = useState<UseCase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUseCase = async () => {
      try {
        setLoading(true);
        const response = await getUseCaseBySlug(slug as string);
        setUseCase(response.data);
      } catch (err) {
        setError('Failed to load the use case.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchUseCase();
    }
  }, [slug]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!useCase) {
    return <div className="flex justify-center items-center h-screen">Use case not found.</div>;
  }

  return (
    <div className="bg-white">
      <Navigation />
      <div className="px-4 py-8 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/use-cases" className="text-gray-600 hover:text-gray-900 inline-flex items-center mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Use Cases
          </Link>
          
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{useCase.title}</h1>
            <p className="text-lg text-red-600 font-medium">{useCase.industry}</p>
          </div>

          <img src={useCase.image_url} alt={useCase.title} className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl mb-12" />

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: useCase.solution }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UseCasePost; 