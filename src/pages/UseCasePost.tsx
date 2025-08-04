import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Building, BarChart, CheckCircle, Target, TrendingUp, Calendar, DollarSign, Users, Zap } from 'lucide-react';
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
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading use case...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!useCase) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📄</div>
          <p className="text-gray-600 text-lg">Use case not found.</p>
        </div>
      </div>
    );
  }

  // Split industry string to separate client from category
  const [clientName, category] = useCase.industry.split(' - ');

  // Extract key metrics from results for visual display
  const extractMetric = (result: string) => {
    const percentMatch = result.match(/(\d+)%/);
    const dollarMatch = result.match(/\$([0-9,]+)/);
    const numberMatch = result.match(/(\d+)x/);
    
    if (percentMatch) return { value: percentMatch[1], unit: '%', color: 'text-green-600' };
    if (dollarMatch) return { value: dollarMatch[1], unit: '$', color: 'text-blue-600' };
    if (numberMatch) return { value: numberMatch[1], unit: 'x', color: 'text-purple-600' };
    return null;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-700 to-red-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <Link to="/use-cases" className="text-red-100 hover:text-white inline-flex items-center transition-colors">
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to All Use Cases
                </Link>
              </div>
              
              <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
                <div className="lg:col-span-8">
                  <div className="mb-6">
                    <div className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-full text-sm font-semibold mb-4">
                      <Target className="h-4 w-4 mr-2" />
                      {category}
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                      {useCase.title}
                    </h1>
                    <p className="mt-4 text-xl text-red-100 max-w-3xl">
                      Discover how a {useCase.industry.split(' - ')[0].toLowerCase()} company transformed their operations with our {category.toLowerCase()} solution
                    </p>
                  </div>
                </div>
                
                <div className="lg:col-span-4 mt-12 lg:mt-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Impact Overview</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {useCase.results.slice(0, 4).map((result, index) => {
                        const metric = extractMetric(result);
                        return (
                          <div key={index} className="text-center">
                            {metric ? (
                              <>
                                <div className={`text-2xl font-bold ${metric.color}`}>
                                  {metric.unit === '$' && metric.unit}{metric.value}{metric.unit !== '$' && metric.unit}
                                </div>
                                <div className="text-xs text-gray-600 mt-1">
                                  {result.replace(/\d+[%x]|\$[0-9,]+/g, '').trim()}
                                </div>
                              </>
                            ) : (
                              <div className="text-sm text-gray-700">{result}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-8 space-y-16">
                {/* Challenge and Solution */}
                <div className="prose prose-lg max-w-none">
                  <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <div dangerouslySetInnerHTML={{ __html: useCase.challenge }} />
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div dangerouslySetInnerHTML={{ __html: useCase.solution }} />
                  </div>
                </div>
              </div>

              {/* Enhanced Sidebar */}
              <div className="lg:col-span-4 mt-16 lg:mt-0">
                <div className="sticky top-24 space-y-8">
                  
                  {/* Project Details */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <Building className="h-6 w-6 text-red-500 mr-3" />
                      Project Snapshot
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-semibold text-gray-900 mb-1">Industry</p>
                        <p className="text-lg text-gray-700">{useCase.industry.split(' - ')[0]}</p>
                      </div>
                      
                      <div className="border-l-4 border-purple-500 pl-4">
                        <p className="font-semibold text-gray-900 mb-1">Solution Type</p>
                        <p className="text-lg text-gray-700">{category}</p>
                      </div>
                    </div>
                  </div>

                  {/* Results Showcase */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <TrendingUp className="h-6 w-6 text-green-600 mr-3" />
                      Measurable Results
                    </h3>
                    
                    <div className="space-y-4">
                      {useCase.results.map((result, index) => {
                        const metric = extractMetric(result);
                        return (
                          <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-green-100">
                            <div className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                              </div>
                              <div className="ml-4 flex-1">
                                {metric ? (
                                  <div className="flex items-center justify-between">
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                      {result.replace(/\d+[%x]|\$[0-9,]+/g, '').trim()}
                                    </p>
                                    <div className={`text-2xl font-bold ${metric.color} ml-3`}>
                                      {metric.unit === '$' && metric.unit}{metric.value}{metric.unit !== '$' && metric.unit}
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-gray-700 text-sm leading-relaxed font-medium">{result}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-8 text-center text-white">
                    <Zap className="h-12 w-12 mx-auto mb-4 text-red-200" />
                    <h3 className="text-xl font-bold mb-4">Ready for Similar Results?</h3>
                    <p className="text-red-100 mb-6 text-sm leading-relaxed">
                      Let's discuss how we can help you achieve comparable transformation in your organization.
                    </p>
                    <Link 
                      to="/contact" 
                      className="inline-block bg-white text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Start Your Project
                    </Link>
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