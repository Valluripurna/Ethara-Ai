'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completedTasks: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [projectsRes, tasksRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, config),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, config)
        ]);

        const completedTasks = tasksRes.data.tasks.filter(
          (t: any) => t.status === 'completed'
        ).length;

        setStats({
          projects: projectsRes.data.count || 0,
          tasks: tasksRes.data.count || 0,
          completedTasks
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Get an overview of your projects and tasks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Projects"
          value={stats.projects}
          icon="📁"
          color="from-indigo-500 to-indigo-600"
        />
        <StatCard
          title="Total Tasks"
          value={stats.tasks}
          icon="✅"
          color="from-cyan-500 to-cyan-600"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon="🎉"
          color="from-green-500 to-green-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-soft p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/dashboard/projects"
            className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition text-center"
          >
            <div className="text-3xl mb-2">📁</div>
            <h3 className="font-semibold text-gray-900">Browse Projects</h3>
            <p className="text-sm text-gray-600">View all your projects</p>
          </a>
          <a
            href="/dashboard/tasks"
            className="p-4 border-2 border-cyan-200 rounded-lg hover:border-cyan-600 hover:bg-cyan-50 transition text-center"
          >
            <div className="text-3xl mb-2">✅</div>
            <h3 className="font-semibold text-gray-900">My Tasks</h3>
            <p className="text-sm text-gray-600">View your assigned tasks</p>
          </a>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  color
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-xl p-8 text-white shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-5xl font-bold mt-2">{value}</p>
        </div>
        <div className="text-5xl">{icon}</div>
      </div>
    </div>
  );
}
