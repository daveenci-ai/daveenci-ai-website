import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, BarChart, CheckCircle, Target } from 'lucide-react';
import { getUseCaseBySlug } from '@/config/api';
import { UseCase } from '@/types';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

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

  // Split industry string to separate client from category
  const [clientName, category] = useCase.industry.split(' - ');

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navigation />
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <Link to="/use-cases" className="text-gray-600 hover:text-red-700 inline-flex items-center transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to All Use Cases
              </Link>
            </div>

            <div className="lg:grid lg:grid-cols-3 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Header */}
                <div className="pb-8 border-b border-gray-200">
                  <p className="text-base font-semibold text-red-600 uppercase tracking-wide">{category}</p>
                  <h1 className="mt-2 text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">{useCase.title}</h1>
                </div>

                {/* Challenge and Solution */}
                <div className="prose prose-lg max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: useCase.challenge }} />
                  <div className="mt-8" dangerouslySetInnerHTML={{ __html: useCase.solution }} />
                </div>
              </div>

              {/* Sidebar */}
              <div className="mt-12 lg:mt-0 lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Snapshot</h3>
                    
                    <div className="space-y-5">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Building className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">Client</p>
                          <p className="text-gray-600">{clientName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <BarChart className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">Industry</p>
                          <p className="text-gray-600">{useCase.industry.split(' - ')[0]}</p> {/* Extracting industry from client name */}
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <Target className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">Category</p>
                          <p className="text-gray-600">{category}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-5">Key Results</h3>
                    <ul className="space-y-4">
                      {useCase.results.map((result, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0">
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          </div>
                          <p className="ml-4 text-gray-700 font-medium">{result}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UseCasePost; 