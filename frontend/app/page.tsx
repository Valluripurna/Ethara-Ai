'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white bg-opacity-95 backdrop-blur-md border-b border-gray-100 z-50 shadow-soft">
        <div className="container-custom flex justify-between items-center h-16">
          <div className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            Ethara
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="button-primary"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    router.push('/');
                  }}
                  className="button-secondary"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="button-secondary">
                  Login
                </Link>
                <Link href="/register" className="button-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container-custom max-w-4xl mx-auto text-center animate-slideInUp">
          <div className="inline-block mb-6 px-4 py-2 bg-indigo-100 rounded-full">
            <span className="text-indigo-700 font-semibold text-sm">
              🚀 Professional Project Management
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
            Manage Projects Like a
            <span className="gradient-primary bg-clip-text text-transparent"> Pro</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Ethara helps teams collaborate on projects effortlessly. Organize tasks, track progress, and achieve goals
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <button
                onClick={() => router.push('/dashboard')}
                className="button-primary text-lg py-3 px-8"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link href="/register" className="button-primary text-lg py-3 px-8">
                  Start Free Trial
                </Link>
                <Link href="/login" className="button-secondary text-lg py-3 px-8">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-slideInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Your Team
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to manage projects efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📋',
                title: 'Project Organization',
                description: 'Create and manage projects with ease. Organize your workflow effortlessly.'
              },
              {
                icon: '✅',
                title: 'Task Management',
                description: 'Break down projects into tasks, assign them, and track progress in real-time.'
              },
              {
                icon: '👥',
                title: 'Team Collaboration',
                description: 'Invite team members and work together seamlessly on shared projects.'
              },
              {
                icon: '📊',
                title: 'Progress Tracking',
                description: 'Get insights into project status with detailed task analytics and reports.'
              },
              {
                icon: '⚡',
                title: 'Lightning Fast',
                description: 'Experience blazing-fast performance with our optimized infrastructure.'
              },
              {
                icon: '🔒',
                title: 'Secure & Reliable',
                description: 'Your data is protected with enterprise-grade security and regular backups.'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 hover:shadow-medium transition-all duration-300 border border-gray-200 hover:border-indigo-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-primary">
        <div className="container-custom max-w-3xl mx-auto text-center text-white animate-slideInUp">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Workflow?</h2>
          <p className="text-lg mb-8 text-indigo-100">
            Join thousands of teams already using Ethara to manage projects effectively.
          </p>
          {!isAuthenticated && (
            <Link href="/register" className="inline-block px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-300">
              Get Started Now
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container-custom text-center">
          <p className="mb-2">© 2026 Ethara. All rights reserved.</p>
          <p className="text-sm">Built with ❤️ for teams that want to get things done.</p>
        </div>
      </footer>
    </div>
  );
}
