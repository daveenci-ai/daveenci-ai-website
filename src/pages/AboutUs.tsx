import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Heart, Target, Zap, Users, Building2 } from 'lucide-react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

const AboutUs = () => {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We focus on delivering measurable outcomes that directly impact your business growth and efficiency."
    },
    {
      icon: Heart,
      title: "Client-Centric",
      description: "Your success is our success. We build long-term partnerships based on trust and exceptional service."
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We stay at the forefront of AI and automation technology to bring you cutting-edge solutions."
    },
    {
      icon: Users,
      title: "Collaborative",
      description: "We work as an extension of your team, ensuring seamless integration and knowledge transfer."
    }
  ];

  const teamMembers = [
    {
      name: "Anton Osipov",
      role: "CTO & AI Engineer",
      quote: "If it repeats — it automates.",
      image: "https://raw.githubusercontent.com/daveenci2025/public-images/refs/heads/main/about_anton.webp",
      description: "Anton builds the invisible hands behind smart business — AI systems that think, learn, and do. With over a decade at the crossroads of data science, marketing, and automation, he brings creative engineering to life in a way that actually works for people. Born in Russia, forged in Silicon Valley, and now building in Austin, Texas, he leads with vision, not jargon — always looking for the edge where efficiency meets elegance.",
      philosophy: "I don't just build systems. I build collaborators."
    },
    {
      name: "Astrid Abrahamyan",
      role: "COO & Relationship Architect",
      quote: "People first. Always.",
      image: "https://raw.githubusercontent.com/daveenci2025/public-images/refs/heads/main/about_astrid.png",
      description: "Astrid is the heartbeat of every operation. With a sharp mind for logistics and a genuine gift for connection, she ensures projects don't just run — they thrive. Her background blends high-level operational expertise with a remarkable ability to understand and connect with diverse personalities. She has an uncanny knack for reading the room and fostering collaboration, whether in a formal boardroom, during an on-site project review, or in a strategic planning session.",
      philosophy: "Business is personal — and that's what makes it powerful."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative pt-32 pb-24" style={{background: 'linear-gradient(to right, #e8d5f0 0%, #ffffff 30%, #ffffff 70%, #d5e8ff 100%)'}}>
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-3xl mx-auto mb-8">
              <Building2 className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-tight mb-8">
              About <span className="text-red-600">DaVeenci</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're a team of AI specialists, automation experts, and business strategists dedicated to helping companies unlock their growth potential through intelligent technology.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  DaVeenci was founded with a clear belief: every business — no matter its size or technical background — deserves access to enterprise-level AI and automation.
                </p>
                <p>
                  Our journey began in Palo Alto, the birthplace of innovation, moved through the calm discipline of San Diego, matured in the hustle of Miami's startup scene, and finally took root in Austin — a city that blends vision and grit like no other.
                </p>
                <p>
                  After working with businesses coast to coast, we saw the same struggles: time lost to manual tasks, disconnected systems draining energy, and founders constantly chasing "the next thing." So we created DaVeenci — not just another software vendor, but a hands-on AI automation team.
                </p>
                <p>
                  Since then, we've helped over 50 businesses save thousands of hours, streamline operations, and unlock millions in revenue by turning complex processes into simple, scalable systems.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/placeholder.svg"
                alt="Team collaboration"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 group-hover:from-red-600 group-hover:to-red-700 rounded-2xl mx-auto mb-6 transition-all duration-300">
                    <Icon className="w-8 h-8 text-red-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The experts behind your success</p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-200">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative mb-6">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-full"></div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-red-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-500 italic text-lg mb-6">"{member.quote}"</p>
                  </div>
                  
                  <div className="space-y-4 text-left">
                    <p className="text-gray-700 leading-relaxed">{member.description}</p>
                    
                    <div className="pt-4 border-t border-gray-200">
                      <blockquote className="text-gray-800 font-medium italic">
                        "{member.philosophy}"
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-gradient-to-br from-gray-100 via-red-100/40 to-orange-100/30 relative">
        <div className="absolute inset-0 bg-grid-subtle"></div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            To democratize AI and automation technology, making it accessible and valuable for businesses of all sizes. We believe that with the right tools and expertise, every company can achieve exponential growth while freeing up their team to focus on what matters most.
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <blockquote className="text-lg text-gray-700 italic">
              "We don't just build systems – we build growth engines that work while you sleep, scale with your ambitions, and evolve with your business."
            </blockquote>
            <p className="text-red-600 font-medium mt-4">- The DaVeenci Team</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's discuss how our team can help transform your business with AI-powered automation.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/25">
            Start the Conversation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs; 