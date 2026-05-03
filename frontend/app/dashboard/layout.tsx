'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col fixed h-screen left-0 top-0 z-40 shadow-lg`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          {sidebarOpen && <h1 className="text-xl font-bold">Ethara</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded-lg transition"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        <nav className="flex-1 px-3 py-8 space-y-2">
          <NavLink href="/dashboard" icon="📊" label="Dashboard" open={sidebarOpen} />
          <NavLink href="/dashboard/projects" icon="📁" label="Projects" open={sidebarOpen} />
          <NavLink href="/dashboard/tasks" icon="✅" label="Tasks" open={sidebarOpen} />
          <NavLink href="/dashboard/settings" icon="⚙️" label="Settings" open={sidebarOpen} />
        </nav>

        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-soft sticky top-0 z-30">
          <div className="flex justify-between items-center px-8 h-16">
            <div className="text-lg font-semibold text-gray-900">
              Welcome back, <span className="text-indigo-600">{user?.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  label,
  open
}: {
  href: string;
  icon: string;
  label: string;
  open: boolean;
}) {
  return (
    <Link
      href={href}
      className="px-4 py-3 rounded-lg hover:bg-gray-800 transition flex items-center gap-3 text-gray-300 hover:text-white"
    >
      <span className="text-xl">{icon}</span>
      {open && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
}
