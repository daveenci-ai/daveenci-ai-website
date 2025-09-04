import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, BarChart3, Zap, Target, CheckCircle } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const AISolutions = () => {
  const features = [
    {
      icon: Brain,
      title: "Machine Learning Integration",
      description: "Custom ML models trained on your business data to predict trends, optimize processes, and automate decision-making."
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "Advanced analytics that forecast customer behavior, market trends, and business outcomes with high accuracy."
    },
    {
      icon: Target,
      title: "Intelligent Automation",
      description: "AI-powered workflows that adapt and improve over time, handling complex tasks with minimal human intervention."
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast AI systems that process and analyze data in real-time for immediate insights and actions."
    }
  ];

  const benefits = [
    "Reduce manual work by up to 80%",
    "Improve decision accuracy by 45%",
    "Increase operational efficiency by 60%",
    "Scale operations without increasing headcount",
    "Gain competitive advantage through data insights",
    "Automate complex business processes"
  ];

  const useCases = [
    {
      title: "Customer Behavior Prediction",
      description: "Predict which customers are most likely to purchase, churn, or upgrade based on historical data and behavioral patterns."
    },
    {
      title: "Dynamic Pricing Optimization",
      description: "Automatically adjust pricing based on demand, competition, and market conditions to maximize revenue."
    },
    {
      title: "Intelligent Lead Scoring",
      description: "Score and rank leads automatically based on engagement, demographics, and conversion probability."
    },
    {
      title: "Automated Content Generation",
      description: "Generate personalized marketing content, product descriptions, and email campaigns at scale."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <Brain className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              <span className="text-red-600">AI</span> Solutions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Harness the power of artificial intelligence to automate complex processes, predict outcomes, and make data-driven decisions that drive business growth.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI-Powered Capabilities</h2>
            <p className="text-xl text-gray-600">Advanced AI technologies tailored to your business needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-600 group-hover:to-red-700 rounded-2xl mx-auto mb-6 transition-all duration-300">
                    <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Our AI Solutions?</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our AI solutions are designed to deliver measurable results while being easy to implement and scale with your business growth.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                alt="AI Solutions"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Use Cases</h2>
            <p className="text-xl text-gray-600">Real-world applications of AI in business</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{useCase.title}</h3>
                <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our AI Implementation Process</h2>
            <p className="text-xl text-gray-600">From strategy to deployment in 4 simple steps</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Discovery", description: "Analyze your business processes and identify AI opportunities" },
              { step: "02", title: "Strategy", description: "Design custom AI solutions aligned with your business goals" },
              { step: "03", title: "Development", description: "Build and train AI models using your data and requirements" },
              { step: "04", title: "Deployment", description: "Launch and monitor AI systems with ongoing optimization" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center mx-auto">
                    <span className="text-white font-bold text-lg">{item.step}</span>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-red-200 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Implement AI in Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's discuss how our AI solutions can transform your operations and drive measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25">
              Start Your AI Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-600 px-8 py-4 text-lg font-semibold rounded-lg">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AISolutions; 