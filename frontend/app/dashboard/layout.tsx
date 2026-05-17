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
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-gray-900 text-white transition-transform duration-300 flex flex-col fixed h-screen left-0 top-0 z-40 shadow-lg w-64 lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
          <h1 className="text-xl font-bold">Ethara</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 hover:bg-gray-800 rounded-lg transition lg:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 px-3 py-8 space-y-2">
          <NavLink href="/dashboard" icon="📊" label="Dashboard" open={true} />
          <NavLink href="/dashboard/projects" icon="📁" label="Projects" open={true} />
          <NavLink href="/dashboard/tasks" icon="✅" label="Tasks" open={true} />
          <NavLink href="/dashboard/settings" icon="⚙️" label="Settings" open={true} />
        </nav>

        <div className="px-3 py-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2"
          >
            <span>🚪</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 shadow-soft sticky top-0 z-20">
          <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition lg:hidden"
              >
                ☰
              </button>
              <div className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                Welcome back, <span className="text-indigo-600">{user?.name}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
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
