
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const successStories = [
  {
    title: "E-commerce Automation Revolution",
    company: "TechRetail Co.",
    industry: "E-commerce",
    challenge: "Manual order processing and customer service consuming 60+ hours weekly",
    solution: "Custom AI chatbot + automated order processing system",
    results: ["85% reduction in manual tasks", "24/7 customer support", "$50K annual savings"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Lead Generation on Autopilot",
    company: "GrowthStart Agency",
    industry: "Marketing",
    challenge: "Inconsistent lead quality and time-intensive qualification process",
    solution: "AI-powered lead scoring + automated nurture sequences",
    results: ["300% increase in qualified leads", "50% faster sales cycle", "ROI of 450%"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Operations Intelligence System",
    company: "ManufacturePro Inc.",
    industry: "Manufacturing",
    challenge: "No visibility into production bottlenecks and inefficiencies",
    solution: "Custom dashboard with predictive analytics and real-time monitoring",
    results: ["40% improvement in efficiency", "Predictive maintenance", "15% cost reduction"],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const SuccessStories = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-red-600">Success Stories</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Real Results, Real Impact
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            See how our AI-powered solutions have transformed businesses across industries.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {successStories.map((story, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {story.industry}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">{story.title}</CardTitle>
                <CardDescription className="text-gray-600 font-medium">
                  {story.company}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                  <p className="text-sm text-gray-600">{story.challenge}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                  <p className="text-sm text-gray-600">{story.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Results:</h4>
                  <ul className="space-y-1">
                    {story.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
