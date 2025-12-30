import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Users, FileText, Languages } from 'lucide-react';
// Ensure you have added the declarations.d.ts file as shown above to fix these red lines
import synthiaLogo from '../assets/synthia-logo.png';
import stockVideo from '../assets/stock-video.mp4';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  const features = [
    {
      icon: Languages,
      title: 'Taglish Support',
      description: 'Recognizes and transcribes mixed Filipino-English (Taglish) conversations.'
    },
    {
      icon: Users,
      title: 'All-in-One Meeting Toolkit',
      description: 'Provides structured tools and guidance for all stages of a meeting: preparation, execution, and follow-up activities.'
    },
    {
      icon: FileText,
      title: 'Formal Reports Generator',
      description: 'Produces professional reports following the organization’s formatting and content standards.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Video */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          // Fixed: Replaced inline style with Tailwind utility class 'blur-[2px]'
          className="absolute inset-0 w-full h-full object-cover blur-[2px]"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'%3E%3Crect fill='%23f3f4f6' width='1200' height='800'/%3E%3C/svg%3E"
        >
          <source src={stockVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

        {/* Hero Content - Overlay */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <img
              src={synthiaLogo}
              alt="Synthia Logo"
              className="h-32 md:h-48 mx-auto"
            />
            <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-white drop-shadow-lg">
              SYNTHIA
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow">
              Experience the future of intelligent design. Where innovation meets elegance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-violet-600 text-white rounded-lg font-semibold hover:bg-violet-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const featuresSection = document.getElementById('features-section');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Main Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover what makes Synthia the ultimate platform for intelligent collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveFeature(index)}
                  onMouseLeave={() => setActiveFeature(null)}
                  className={`p-8 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeFeature === index
                      ? 'bg-violet-600 text-white shadow-xl scale-105'
                      : 'bg-gray-50 text-gray-900 hover:shadow-lg'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    activeFeature === index
                      ? 'bg-white/20'
                      : 'bg-violet-100'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      activeFeature === index
                        ? 'text-white'
                        : 'text-violet-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className={`text-sm leading-relaxed ${
                    activeFeature === index
                      ? 'text-white/90'
                      : 'text-gray-600'
                  }`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

        <section id="pricing-section" className="py-16 md:py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Pricing
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;