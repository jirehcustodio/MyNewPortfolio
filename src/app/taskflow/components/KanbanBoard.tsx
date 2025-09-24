"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { 
  MoreVertical, 
  Plus, 
  Calendar, 
  User, 
  AlertCircle,
  Clock,
  MessageSquare,
  Paperclip
} from "lucide-react";
import { useTask } from "../context/TaskContext";
import { Task } from "../types";
import TaskDetailModal from "./TaskDetailModal";
import AddTaskModal from "./AddTaskModal";

interface TaskCardProps {
  task: Task;
  index: number;
}

function TaskCard({ task, index }: TaskCardProps) {
  const [showTaskDetail, setShowTaskDetail] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-neutral-500';
    }
  };

  const getPriorityTextColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-neutral-400';
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 cursor-pointer hover:border-neutral-600 transition-colors group"
      onClick={() => setShowTaskDetail(true)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
          <span className={`text-xs font-medium uppercase tracking-wide ${getPriorityTextColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-neutral-700 rounded transition-all"
        >
          <MoreVertical className="w-3 h-3 text-neutral-400" />
        </motion.button>
      </div>

      {/* Title */}
      <h3 className="text-white font-medium mb-2 line-clamp-2">{task.title}</h3>

      {/* Description */}
      <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{task.description}</p>

      {/* Tags */}
      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {task.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {task.tags.length > 3 && (
            <span className="px-2 py-1 bg-neutral-700 text-neutral-400 text-xs rounded-full">
              +{task.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Assignee */}
          {task.assignee && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3 text-neutral-400" />
              <Image
                src={task.assignee.avatar}
                alt={task.assignee.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
          )}

          {/* Due Date */}
          {task.dueDate && (
            <div className={`flex items-center gap-1 ${isOverdue ? 'text-red-400' : 'text-neutral-400'}`}>
              {isOverdue && <AlertCircle className="w-3 h-3" />}
              <Calendar className="w-3 h-3" />
              <span className="text-xs">
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Comments */}
          {task.comments.length > 0 && (
            <div className="flex items-center gap-1 text-neutral-400">
              <MessageSquare className="w-3 h-3" />
              <span className="text-xs">{task.comments.length}</span>
            </div>
          )}

          {/* Attachments */}
          {task.attachments.length > 0 && (
            <div className="flex items-center gap-1 text-neutral-400">
              <Paperclip className="w-3 h-3" />
              <span className="text-xs">{task.attachments.length}</span>
            </div>
          )}

          {/* Time Tracking */}
          {task.estimatedHours && (
            <div className="flex items-center gap-1 text-neutral-400">
              <Clock className="w-3 h-3" />
              <span className="text-xs">
                {task.actualHours || 0}h/{task.estimatedHours}h
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      <TaskDetailModal
        task={task}
        isOpen={showTaskDetail}
        onClose={() => setShowTaskDetail(false)}
      />
    </motion.div>
  );
}

interface ColumnProps {
  title: string;
  status: string;
  tasks: Task[];
  color: string;
}

function Column({ title, status, tasks, color }: ColumnProps) {
  const { moveTask, projects } = useTask();
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, status, tasks.length);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div 
      className="flex-1 min-w-80"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <span className="px-2 py-1 bg-neutral-700 text-neutral-300 text-xs rounded-full">
            {tasks.length}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAddTaskModal(true)}
          className="p-1 hover:bg-neutral-700 rounded transition-colors"
        >
          <Plus className="w-4 h-4 text-neutral-400" />
        </motion.button>
      </div>

      {/* Tasks */}
      <div className="space-y-3 min-h-96">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData('taskId', task.id);
            }}
          >
            <TaskCard task={task} index={index} />
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        initialStatus={status}
        initialProject={projects[0]}
      />
    </div>
  );
}

export default function KanbanBoard() {
  const { getFilteredTasks } = useTask();
  const tasks = getFilteredTasks();

  const columns = [
    {
      title: 'To Do',
      status: 'todo',
      tasks: tasks.filter(task => task.status === 'todo'),
      color: 'bg-neutral-500'
    },
    {
      title: 'In Progress',
      status: 'in-progress',
      tasks: tasks.filter(task => task.status === 'in-progress'),
      color: 'bg-blue-500'
    },
    {
      title: 'Review',
      status: 'review',
      tasks: tasks.filter(task => task.status === 'review'),
      color: 'bg-yellow-500'
    },
    {
      title: 'Done',
      status: 'done',
      tasks: tasks.filter(task => task.status === 'done'),
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="flex gap-6 overflow-x-auto pb-6">
        {columns.map(column => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={column.tasks}
            color={column.color}
          />
        ))}
      </div>
    </div>
  );
}