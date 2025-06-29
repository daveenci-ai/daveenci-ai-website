
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    content: "DaVeenci's AI automation system completely transformed our operations. We went from spending 40 hours a week on manual tasks to having everything run automatically. The ROI was evident within the first month.",
    author: "Sarah Chen",
    role: "CEO",
    company: "TechFlow Solutions",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    content: "The custom software tool they built for us handles complex inventory management that used to take our team days to process. Now it's done in minutes with 99.9% accuracy. Game-changing doesn't begin to describe it.",
    author: "Marcus Rodriguez",
    role: "Operations Director",
    company: "Supply Chain Pro",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  },
  {
    content: "Their AI chatbot handles 80% of our customer inquiries without human intervention, and customers actually prefer it. Response times went from hours to seconds, and satisfaction scores increased by 35%.",
    author: "Emma Thompson",
    role: "Customer Success Manager",
    company: "Growth Dynamics",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Our Clients Say
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Don't just take our word for it—hear from businesses that have transformed their operations with our solutions.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-gray-200">
              <CardContent className="p-8">
                <blockquote className="text-gray-900">
                  <p className="text-base leading-relaxed italic">"{testimonial.content}"</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <img
                    className="h-12 w-12 rounded-full bg-gray-50 object-cover"
                    src={testimonial.image}
                    alt={testimonial.author}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-gray-600">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </figcaption>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
