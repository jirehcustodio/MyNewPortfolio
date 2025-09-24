"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  Clock,
  Tag,
  Plus,
  Save,
  AlertTriangle
} from "lucide-react";
import { useTask } from "../context/TaskContext";
import { Task, Project } from "../types";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStatus?: string;
  initialProject?: Project;
}

export default function AddTaskModal({ isOpen, onClose, initialStatus = 'todo', initialProject }: AddTaskModalProps) {
  const { addTask, users, projects, currentUser, workspaceMode, personalSettings } = useTask();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: personalSettings.defaultPriority,
    status: initialStatus,
    assigneeId: '',
    projectId: initialProject?.id || (workspaceMode === 'personal' ? 'personal' : ''),
    dueDate: '',
    estimatedHours: '',
    tags: [] as string[],
    category: workspaceMode === 'personal' ? 'personal' : 'work'
  });

  const [newTag, setNewTag] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const personalCategories = [
    { id: 'study', label: 'Study', color: 'bg-blue-500' },
    { id: 'homework', label: 'Homework', color: 'bg-orange-500' },
    { id: 'personal', label: 'Personal', color: 'bg-green-500' },
    { id: 'health', label: 'Health & Fitness', color: 'bg-red-500' },
    { id: 'learning', label: 'Learning', color: 'bg-purple-500' },
    { id: 'hobby', label: 'Hobby', color: 'bg-pink-500' }
  ];

  const teamCategories = [
    { id: 'work', label: 'Work', color: 'bg-blue-500' },
    { id: 'meeting', label: 'Meeting', color: 'bg-yellow-500' },
    { id: 'development', label: 'Development', color: 'bg-green-500' },
    { id: 'design', label: 'Design', color: 'bg-purple-500' },
    { id: 'testing', label: 'Testing', color: 'bg-red-500' },
    { id: 'documentation', label: 'Documentation', color: 'bg-gray-500' }
  ];

  const categories = workspaceMode === 'personal' ? personalCategories : teamCategories;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (workspaceMode === 'team' && !formData.projectId) {
      newErrors.projectId = 'Project is required for team tasks';
    }

    if (formData.estimatedHours && (isNaN(Number(formData.estimatedHours)) || Number(formData.estimatedHours) <= 0)) {
      newErrors.estimatedHours = 'Estimated hours must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const assignee = formData.assigneeId ? users.find(u => u.id === formData.assigneeId) : undefined;
    const project = formData.projectId ? projects.find(p => p.id === formData.projectId) : projects[0];

    if (!project || !currentUser) return;

    const newTask: Omit<Task, 'id' | 'createdAt' | 'updatedAt'> = {
      title: formData.title,
      description: formData.description,
      status: formData.status as Task['status'],
      priority: formData.priority as Task['priority'],
      assignee: assignee || (workspaceMode === 'personal' ? currentUser : undefined),
      reporter: currentUser,
      project: project,
      tags: [...formData.tags, formData.category],
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      estimatedHours: formData.estimatedHours ? Number(formData.estimatedHours) : undefined,
      actualHours: 0,
      attachments: [],
      comments: [],
      dependencies: [],
      subtasks: []
    };

    addTask(newTask);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: personalSettings.defaultPriority,
      status: initialStatus,
      assigneeId: '',
      projectId: initialProject?.id || (workspaceMode === 'personal' ? 'personal' : ''),
      dueDate: '',
      estimatedHours: '',
      tags: [],
      category: workspaceMode === 'personal' ? 'personal' : 'work'
    });
    setErrors({});
    setNewTag('');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-20 bg-neutral-900 border border-neutral-700 rounded-xl z-50 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white">
                  Create New {workspaceMode === 'personal' ? 'Task' : 'Team Task'}
                </h1>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Task Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={workspaceMode === 'personal' ? 'e.g., Complete math homework' : 'e.g., Implement user authentication'}
                      className={`w-full bg-neutral-800 border rounded-lg px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        errors.title ? 'border-red-500' : 'border-neutral-700'
                      }`}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Category
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {categories.map(category => (
                        <motion.button
                          key={category.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData(prev => ({ ...prev, category: category.id }))}
                          className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                            formData.category === category.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-neutral-700 hover:border-neutral-600 bg-neutral-800/50'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded-full ${category.color}`} />
                          <span className="text-sm text-white">{category.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        priority: e.target.value as Task['priority']
                      }))}
                      className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🟠 High</option>
                      <option value="urgent">🔴 Urgent</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder={workspaceMode === 'personal' 
                      ? 'Describe what you need to accomplish...' 
                      : 'Provide detailed requirements and acceptance criteria...'
                    }
                    rows={4}
                    className={`w-full bg-neutral-800 border rounded-lg px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.description ? 'border-red-500' : 'border-neutral-700'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Assignment and Project */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Assignee */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      {workspaceMode === 'personal' ? 'Assigned to Me' : 'Assignee'}
                    </label>
                    {workspaceMode === 'personal' ? (
                      <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg">
                        <Image
                          src={currentUser?.avatar || '/default-avatar.png'}
                          alt={currentUser?.name || 'User'}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-white font-medium">{currentUser?.name}</p>
                          <p className="text-sm text-neutral-400">Personal Task</p>
                        </div>
                      </div>
                    ) : (
                      <select
                        value={formData.assigneeId}
                        onChange={(e) => setFormData(prev => ({ ...prev, assigneeId: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Unassigned</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    )}
                  </div>

                  {/* Project */}
                  {workspaceMode === 'team' && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Project *
                      </label>
                      <select
                        value={formData.projectId}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectId: e.target.value }))}
                        className={`w-full bg-neutral-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.projectId ? 'border-red-500' : 'border-neutral-700'
                        }`}
                      >
                        <option value="">Select a project</option>
                        {projects.map(project => (
                          <option key={project.id} value={project.id}>{project.name}</option>
                        ))}
                      </select>
                      {errors.projectId && (
                        <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {errors.projectId}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Dates and Time */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Due Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Estimated Hours */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Estimated Hours
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="number"
                        value={formData.estimatedHours}
                        onChange={(e) => setFormData(prev => ({ ...prev, estimatedHours: e.target.value }))}
                        placeholder="e.g., 4"
                        min="0"
                        step="0.5"
                        className={`w-full bg-neutral-800 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.estimatedHours ? 'border-red-500' : 'border-neutral-700'
                        }`}
                      />
                    </div>
                    {errors.estimatedHours && (
                      <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        {errors.estimatedHours}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Tags
                  </label>
                  <div className="space-y-3">
                    {/* Add Tag Input */}
                    <div className="flex gap-2">
                      <div className="flex-1 relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddTag}
                        disabled={!newTag.trim()}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Add
                      </motion.button>
                    </div>

                    {/* Tags Display */}
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map(tag => (
                          <motion.span
                            key={tag}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                            <motion.button
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.8 }}
                              onClick={() => handleRemoveTag(tag)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <X className="w-3 h-3" />
                            </motion.button>
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Initial Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="todo">📋 To Do</option>
                    <option value="in-progress">🔄 In Progress</option>
                    <option value="review">👀 Review</option>
                    <option value="done">✅ Done</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-neutral-700 bg-neutral-800/30">
              <p className="text-sm text-neutral-400">
                Fields marked with * are required
              </p>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="px-6 py-3 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Create Task
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}