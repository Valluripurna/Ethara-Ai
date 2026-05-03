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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            Ethara
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="button-primary px-4 py-2 text-sm sm:text-base"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsAuthenticated(false);
                    router.push('/');
                  }}
                  className="button-secondary px-4 py-2 text-sm sm:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="button-secondary px-4 py-2 text-sm sm:text-base">
                  Login
                </Link>
                <Link href="/register" className="button-primary px-4 py-2 text-sm sm:text-base">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pb-14 pt-28 sm:pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-100/70 to-transparent" />
        <div className="relative mx-auto max-w-5xl text-center animate-slideInUp">
          <div className="mb-6 inline-flex items-center rounded-full border border-indigo-200 bg-white px-4 py-2 shadow-sm">
            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700 sm:text-sm">
              🚀 Professional Project Management
            </span>
          </div>

          <h1 className="mx-auto mb-5 max-w-4xl text-4xl font-bold leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Manage Projects Like a
            <span className="gradient-primary bg-clip-text text-transparent"> Pro</span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-base text-slate-600 sm:text-lg md:text-xl">
            Ethara helps teams collaborate on projects effortlessly. Organize tasks, track progress, and achieve goals
            together.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {isAuthenticated ? (
              <button
                onClick={() => router.push('/dashboard')}
                className="button-primary w-full px-7 py-3 text-base sm:w-auto sm:text-lg"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <Link href="/register" className="button-primary w-full px-7 py-3 text-base sm:w-auto sm:text-lg">
                  Start Free Trial
                </Link>
                <Link href="/login" className="button-secondary w-full px-7 py-3 text-base sm:w-auto sm:text-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-slideInUp">
            <h2 className="mb-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Powerful Features for Your Team
            </h2>
            <p className="mx-auto max-w-2xl text-base text-slate-600 sm:text-lg">
              Everything you need to manage projects efficiently
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-medium"
              >
                <div className="mb-3 text-3xl">{feature.icon}</div>
                <h3 className="mb-2 text-2xl font-semibold text-slate-900 sm:text-xl">
                  {feature.title}
                </h3>
                <p className="text-base leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-primary px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center text-white animate-slideInUp">
          <h2 className="mb-3 text-3xl font-bold sm:text-5xl">Ready to Transform Your Workflow?</h2>
          <p className="mb-7 text-base text-indigo-100 sm:text-xl">
            Join thousands of teams already using Ethara to manage projects effectively.
          </p>
          {!isAuthenticated && (
            <Link href="/register" className="inline-block rounded-lg bg-white px-8 py-3 font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-50">
              Get Started Now
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-4 py-10 text-slate-300">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-2">© 2026 Ethara. All rights reserved.</p>
          <p className="text-sm text-slate-400">Built with ❤️ for teams that want to get things done.</p>
        </div>
      </footer>
    </div>
  );
}
