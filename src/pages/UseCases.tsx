import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Users, Zap, FileText, CheckCircle, Building } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { getUseCases } from '@/config/api';
import { UseCase } from '@/types';

const UseCases = () => {
  const [useCases, setUseCases] = useState<UseCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUseCases = async () => {
      try {
        setLoading(true);
        const response = await getUseCases();
        setUseCases(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load use cases. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUseCases();
  }, []);

  // Extract key metrics from results for display
  const extractMetric = (result: string) => {
    const percentMatch = result.match(/(\d+)%/);
    const dollarMatch = result.match(/\$([0-9,]+)/);
    const numberMatch = result.match(/(\d+)x/);
    
    if (percentMatch) return { value: percentMatch[1], unit: '%', text: result };
    if (dollarMatch) return { value: dollarMatch[1], unit: '$', text: result };
    if (numberMatch) return { value: numberMatch[1], unit: 'x', text: result };
    return { value: '', unit: '', text: result };
  };

  // Get clean text content from HTML
  const getTextFromHTML = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <FileText className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              <span className="text-red-600">Use Cases</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real-world examples of how we've helped businesses transform their operations with AI-powered solutions and automation.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading use cases...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-20">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="grid lg:grid-cols-2 gap-12">
              {useCases.map((useCase) => {
                const industry = useCase.industry.includes(' - ') ? useCase.industry.split(' - ')[1] : useCase.industry;
                const challengeText = getTextFromHTML(useCase.challenge);
                const solutionText = getTextFromHTML(useCase.solution);
                
                return (
                  <div key={useCase.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {/* Header with Category */}
                    <div className="px-8 pt-8 pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-red-600">{industry}</span>
                        </div>
                        <Building className="h-5 w-5 text-gray-400" />
                      </div>
                      <Link to={`/use-cases/${useCase.slug}`}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-red-700 transition-colors duration-300 cursor-pointer">
                          {useCase.title}
                        </h3>
                      </Link>
                    </div>

                    {/* Image */}
                    <div className="px-8 mb-6">
                      <div className="relative rounded-xl overflow-hidden">
                        <img 
                          src={useCase.image_url} 
                          alt={useCase.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 pb-4">
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Challenge</h4>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {challengeText.replace(/^The Challenge\s*/i, '')}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 text-sm">Solution</h4>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                            {solutionText.replace(/^Our Solution\s*/i, '')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Results Grid */}
                    <div className="px-8 mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4 text-sm">Results</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {useCase.results.slice(0, 4).map((result, index) => {
                          const metric = extractMetric(result);
                          return (
                            <div key={index} className="bg-green-50 rounded-lg p-3 border border-green-100">
                              <div className="flex items-start space-x-2">
                                <TrendingUp className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <div className="flex-1">
                                  {metric.value ? (
                                    <>
                                      <div className="text-lg font-bold text-green-700">
                                        {metric.unit === '$' && metric.unit}{metric.value}{metric.unit !== '$' && metric.unit}
                                      </div>
                                      <div className="text-xs text-gray-600 leading-tight">
                                        {metric.text.replace(/\d+[%x]|\$[0-9,]+/g, '').trim()}
                                      </div>
                                    </>
                                  ) : (
                                    <div className="text-xs text-gray-700 font-medium leading-tight">
                                      {result}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Read More CTA */}
                    <div className="px-8 pb-8">
                      <Link 
                        to={`/use-cases/${useCase.slug}`}
                        className="inline-flex items-center text-red-600 font-semibold text-sm hover:text-red-700 transition-colors duration-200 group-hover:underline"
                      >
                        Read more...
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Results Across Industries
            </h2>
            <p className="text-xl text-gray-600">
              Our track record speaks for itself
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-4">
                <Users className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Successful Projects</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">300%</div>
              <div className="text-gray-600">Average ROI Increase</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl mx-auto mb-4">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">80%</div>
              <div className="text-gray-600">Time Savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 via-red-700 to-red-800">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-xl text-red-100 mb-8 leading-relaxed">
            Let's discuss how we can help you achieve similar results with AI-powered automation.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UseCases; 