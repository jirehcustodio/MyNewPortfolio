"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import {
  X,
  Calendar,
  User,
  Clock,
  Paperclip,
  MessageSquare,
  Plus,
  Save,
  Trash2,
  Edit3,
  Tag,
  AlertCircle,
  Download
} from "lucide-react";
import { useTask } from "../context/TaskContext";
import { Task, Comment, Attachment } from "../types";

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TaskDetailModal({ task, isOpen, onClose }: TaskDetailModalProps) {
  const { updateTask, users, deleteTask } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);
  const [showAttachments, setShowAttachments] = useState(true);

  if (!task) return null;

  const handleSave = () => {
    if (Object.keys(editedTask).length > 0) {
      updateTask(task.id, editedTask);
    }
    setIsEditing(false);
    setEditedTask({});
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        content: newComment,
        author: users[0], // Current user
        createdAt: new Date(),
        updatedAt: new Date(),
        taskId: task.id
      };
      
      const updatedComments = [...task.comments, comment];
      updateTask(task.id, { comments: updatedComments });
      setNewComment('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map(file => ({
        id: Date.now().toString() + Math.random(),
        name: file.name,
        url: URL.createObjectURL(file),
        size: file.size,
        type: file.type,
        uploadedBy: users[0], // Current user
        uploadedAt: new Date()
      }));
      
      const updatedAttachments = [...task.attachments, ...newAttachments];
      updateTask(task.id, { attachments: updatedAttachments });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-neutral-400 bg-neutral-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'text-neutral-400 bg-neutral-500/20';
      case 'in-progress': return 'text-blue-400 bg-blue-500/20';
      case 'review': return 'text-yellow-400 bg-yellow-500/20';
      case 'done': return 'text-green-400 bg-green-500/20';
      default: return 'text-neutral-400 bg-neutral-500/20';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

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
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-neutral-900 border border-neutral-700 rounded-xl z-50 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-700">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {isOverdue && <AlertCircle className="w-5 h-5 text-red-400" />}
                  <h1 className="text-2xl font-bold text-white">Task Details</h1>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(task.status)}`}>
                  {task.status.replace('-', ' ')}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Edit3 className="w-5 h-5 text-neutral-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (confirm('Are you sure you want to delete this task?')) {
                      deleteTask(task.id);
                      onClose();
                    }
                  }}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </motion.button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex">
              {/* Main Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Title</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedTask.title ?? task.title}
                        onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <h2 className="text-xl font-semibold text-white">{task.title}</h2>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Description</label>
                    {isEditing ? (
                      <textarea
                        value={editedTask.description ?? task.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        rows={4}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-neutral-300">{task.description}</p>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map(tag => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                      {isEditing && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-1 px-3 py-1 border border-neutral-600 text-neutral-400 rounded-full text-sm hover:bg-neutral-800"
                        >
                          <Plus className="w-3 h-3" />
                          Add Tag
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Project and Reporter Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Project</label>
                      <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: task.project.color }} />
                        <span className="text-white font-medium">{task.project.name}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Reporter</label>
                      <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg">
                        <Image
                          src={task.reporter.avatar}
                          alt={task.reporter.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-white">{task.reporter.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Time Tracking */}
                  {(task.estimatedHours || task.actualHours) && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Time Tracking</label>
                      <div className="flex items-center gap-4 p-3 bg-neutral-800/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-neutral-400" />
                          <span className="text-sm text-neutral-300">
                            Estimated: {task.estimatedHours || 0}h
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-white">
                            Actual: {task.actualHours || 0}h
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dependencies */}
                  {task.dependencies.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">Dependencies</label>
                      <div className="flex flex-wrap gap-2">
                        {task.dependencies.map(depId => (
                          <span
                            key={depId}
                            className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm"
                          >
                            Task #{depId}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Attachments */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setShowAttachments(!showAttachments)}
                        className="flex items-center gap-2 text-lg font-semibold text-white hover:text-blue-400 transition-colors"
                      >
                        <Paperclip className="w-5 h-5" />
                        Attachments ({task.attachments.length})
                      </button>
                      <div className="flex gap-2">
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <motion.label
                          htmlFor="file-upload"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-4 h-4" />
                          Add Files
                        </motion.label>
                      </div>
                    </div>

                    {showAttachments && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-2"
                      >
                        {task.attachments.map(attachment => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between p-3 bg-neutral-800/50 border border-neutral-700 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Paperclip className="w-4 h-4 text-neutral-400" />
                              <div>
                                <p className="text-white font-medium">{attachment.name}</p>
                                <p className="text-sm text-neutral-400">
                                  {formatFileSize(attachment.size)} • Uploaded by {attachment.uploadedBy.name}
                                </p>
                              </div>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 hover:bg-neutral-700 rounded-lg transition-colors"
                            >
                              <Download className="w-4 h-4 text-neutral-400" />
                            </motion.button>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>

                  {/* Comments */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center gap-2 text-lg font-semibold text-white hover:text-blue-400 transition-colors"
                      >
                        <MessageSquare className="w-5 h-5" />
                        Comments ({task.comments.length})
                      </button>
                    </div>

                    {showComments && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-4"
                      >
                        {/* Add Comment */}
                        <div className="flex gap-3">
                          <Image
                            src={users[0]?.avatar || '/default-avatar.png'}
                            alt={users[0]?.name || 'User'}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Add a comment..."
                              rows={3}
                              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex justify-end mt-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Add Comment
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Comments List */}
                        {task.comments.map(comment => (
                          <div key={comment.id} className="flex gap-3">
                            <Image
                              src={comment.author.avatar}
                              alt={comment.author.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div className="flex-1 bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-white">{comment.author.name}</span>
                                <span className="text-sm text-neutral-400">
                                  {comment.createdAt.toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-neutral-300">{comment.content}</p>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-80 border-l border-neutral-700 p-6 bg-neutral-800/30">
                <div className="space-y-6">
                  {/* Assignee */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Assignee</label>
                    {isEditing ? (
                      <select
                        value={editedTask.assignee?.id ?? task.assignee?.id ?? ''}
                        onChange={(e) => {
                          const assignee = users.find(u => u.id === e.target.value);
                          setEditedTask({ ...editedTask, assignee });
                        }}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Unassigned</option>
                        {users.map(user => (
                          <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg">
                        {task.assignee ? (
                          <>
                            <Image
                              src={task.assignee.avatar}
                              alt={task.assignee.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <p className="text-white font-medium">{task.assignee.name}</p>
                              <p className="text-sm text-neutral-400">{task.assignee.email}</p>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-neutral-400">
                            <User className="w-5 h-5" />
                            <span>Unassigned</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Due Date</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value ? new Date(e.target.value) : undefined })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <div className={`flex items-center gap-3 p-3 bg-neutral-800/50 rounded-lg ${isOverdue ? 'border border-red-500/30' : ''}`}>
                        <Calendar className={`w-5 h-5 ${isOverdue ? 'text-red-400' : 'text-neutral-400'}`} />
                        {task.dueDate ? (
                          <div>
                            <p className={`font-medium ${isOverdue ? 'text-red-400' : 'text-white'}`}>
                              {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                            {isOverdue && (
                              <p className="text-sm text-red-400">Overdue</p>
                            )}
                          </div>
                        ) : (
                          <span className="text-neutral-400">No due date</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Priority</label>
                    {isEditing ? (
                      <select
                        value={editedTask.priority ?? task.priority}
                        onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as Task['priority'] })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    ) : (
                      <div className={`px-4 py-2 rounded-lg ${getPriorityColor(task.priority)}`}>
                        <span className="font-medium capitalize">{task.priority}</span>
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">Status</label>
                    {isEditing ? (
                      <select
                        value={editedTask.status ?? task.status}
                        onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as Task['status'] })}
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                      </select>
                    ) : (
                      <div className={`px-4 py-2 rounded-lg ${getStatusColor(task.status)}`}>
                        <span className="font-medium capitalize">{task.status.replace('-', ' ')}</span>
                      </div>
                    )}
                  </div>

                  {/* Save/Cancel Buttons */}
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2 pt-4 border-t border-neutral-700"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsEditing(false);
                          setEditedTask({});
                        }}
                        className="flex-1 py-3 border border-neutral-600 text-neutral-300 rounded-lg hover:bg-neutral-800 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}