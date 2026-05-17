'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  members: string[];
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        config
      );
      setProjects(response.data.projects || []);
    } catch (error: any) {
      setError('Failed to fetch projects');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/projects`,
        newProject,
        config
      );
      setProjects([...projects, response.data.project]);
      setNewProject({ name: '', description: '' });
      setShowCreateForm(false);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to create project');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your projects efficiently</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="button-primary w-full sm:w-auto text-center"
        >
          + New Project
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-soft p-8 mb-8 border border-gray-200 animate-slideInDown">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h2>
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Name
              </label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) =>
                  setNewProject({ ...newProject, name: e.target.value })
                }
                placeholder="Enter project name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                placeholder="Enter project description"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <button type="submit" className="button-primary">
                Create Project
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="button-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-soft border border-gray-200">
          <div className="text-5xl mb-4">📁</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Projects Yet</h2>
          <p className="text-gray-600 mb-6">Create your first project to get started</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="button-primary"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="bg-white rounded-xl shadow-soft hover:shadow-medium p-6 border border-gray-200 transition-all hover:border-indigo-300 cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">📁</div>
                <div className="text-3xl group-hover:scale-110 transition">→</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition">
                {project.name}
              </h3>
              {project.description && (
                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                  {project.description}
                </p>
              )}
              <div className="text-xs text-gray-500">
                {project.members.length} members
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
