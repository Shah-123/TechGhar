import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Globe, Server, Rocket, BookOpen, Users, Trophy, CheckCircle } from 'lucide-react';
import TestimonialCard from '../components/TestimonialCard';

const Home = () => {
  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '10K+', label: 'Active Students' },
    { icon: <BookOpen className="h-6 w-6" />, value: '100+', label: 'Expert Courses' },
    { icon: <Trophy className="h-6 w-6" />, value: '95%', label: 'Success Rate' },
    { icon: <Rocket className="h-6 w-6" />, value: '24/7', label: 'Support' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Full Stack Developer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150',
      content: 'TechGhar transformed my career. The practical projects and expert guidance helped me land my dream job.',
    },
    {
      name: 'Michael Chen',
      role: 'Data Scientist',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150',
      content: 'The data science course was comprehensive and up-to-date. The hands-on exercises were invaluable.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Mobile Developer',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150',
      content: 'Learning mobile development here was a game-changer. The community support is amazing.',
    },
  ];

  const features = [
    {
      icon: <Globe className="h-12 w-12 text-indigo-600" />,
      title: "Learn Anywhere",
      description: "Access our courses from anywhere in the world, at any time that suits you.",
      benefits: ["24/7 course access", "Mobile-friendly platform", "Offline downloads"]
    },
    {
      icon: <Code className="h-12 w-12 text-indigo-600" />,
      title: "Practical Projects",
      description: "Build real-world projects that you can add to your portfolio.",
      benefits: ["Industry-relevant projects", "Code reviews", "Portfolio building"]
    },
    {
      icon: <Server className="h-12 w-12 text-indigo-600" />,
      title: "Expert Support",
      description: "Get help from our community of experts and fellow learners.",
      benefits: ["1-on-1 mentoring", "Community forums", "Live Q&A sessions"]
    }
  ];

  return (
    <div className="space-y-24 mb-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Master the Future of Tech
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto font-light">
              Join thousands of learners mastering cutting-edge technologies through hands-on projects and expert mentorship.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="inline-flex items-center px-8 py-3 rounded-full text-base font-medium bg-white text-indigo-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 rounded-full text-base font-medium bg-indigo-700 text-white hover:bg-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-4 text-indigo-600 dark:text-indigo-400">{stat.icon}</div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Why Choose TechGhar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="group p-8 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-indigo-50 dark:bg-gray-700 rounded-lg group-hover:bg-indigo-100 dark:group-hover:bg-gray-600 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-gray-600 dark:text-gray-300">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">What Our Students Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;