"use client";

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { Task, Project, User, Board, Notification, Filter, Analytics } from '../types';
import NotificationService from '../services/notificationService';

interface TaskState {
  tasks: Task[];
  projects: Project[];
  users: User[];
  boards: Board[];
  notifications: Notification[];
  currentUser: User | null;
  selectedProject: Project | null;
  filter: Filter;
  analytics: Analytics | null;
  workspaceMode: 'personal' | 'team';
  personalSettings: {
    columns: { id: string; title: string; color: string }[];
    theme: 'dark' | 'light';
    defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
    studyGoals: { daily: number; weekly: number; monthly: number };
  };
}

type TaskAction =
  | { type: 'SET_TASKS'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'MOVE_TASK'; payload: { taskId: string; newStatus: string; newIndex: number } }
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_BOARDS'; payload: Board[] }
  | { type: 'SET_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'SET_CURRENT_USER'; payload: User }
  | { type: 'SET_SELECTED_PROJECT'; payload: Project | null }
  | { type: 'SET_FILTER'; payload: Filter }
  | { type: 'SET_ANALYTICS'; payload: Analytics }
  | { type: 'SET_WORKSPACE_MODE'; payload: 'personal' | 'team' }
  | { type: 'UPDATE_PERSONAL_SETTINGS'; payload: Partial<TaskState['personalSettings']> };

const initialState: TaskState = {
  tasks: [],
  projects: [],
  users: [],
  boards: [],
  notifications: [],
  currentUser: null,
  selectedProject: null,
  filter: {},
  analytics: null,
  workspaceMode: 'personal',
  personalSettings: {
    columns: [
      { id: 'todo', title: 'To Do', color: 'bg-neutral-500' },
      { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
      { id: 'review', title: 'Review', color: 'bg-yellow-500' },
      { id: 'done', title: 'Done', color: 'bg-green-500' }
    ],
    theme: 'dark',
    defaultPriority: 'medium',
    studyGoals: { daily: 4, weekly: 25, monthly: 100 }
  }
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates, updatedAt: new Date() }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'MOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, status: action.payload.newStatus as Task['status'], updatedAt: new Date() }
            : task
        ),
      };
    case 'SET_PROJECTS':
      return { ...state, projects: action.payload };
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_BOARDS':
      return { ...state, boards: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notif =>
          notif.id === action.payload ? { ...notif, read: true } : notif
        ),
      };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_SELECTED_PROJECT':
      return { ...state, selectedProject: action.payload };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'SET_ANALYTICS':
      return { ...state, analytics: action.payload };
    case 'SET_WORKSPACE_MODE':
      return { ...state, workspaceMode: action.payload };
    case 'UPDATE_PERSONAL_SETTINGS':
      return { 
        ...state, 
        personalSettings: { ...state.personalSettings, ...action.payload } 
      };
    default:
      return state;
  }
}

interface TaskContextType extends TaskState {
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: string, newIndex: number) => void;
  setSelectedProject: (project: Project | null) => void;
  setFilter: (filter: Filter) => void;
  getFilteredTasks: () => Task[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  generateAnalytics: () => void;
  setWorkspaceMode: (mode: 'personal' | 'team') => void;
  updatePersonalSettings: (settings: Partial<TaskState['personalSettings']>) => void;
  notificationService: NotificationService;
  scheduleTaskNotifications: (task: Task) => void;
  cancelTaskNotifications: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b64e69b6?w=32&h=32&fit=crop&crop=face',
    role: 'manager'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=face',
    role: 'member'
  }
];

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete redesign of the company website',
    color: '#3B82F6',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
    members: mockUsers,
    owner: mockUsers[0]
  },
  {
    id: '2',
    name: 'Mobile App',
    description: 'Development of the mobile application',
    color: '#10B981',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date(),
    members: [mockUsers[1], mockUsers[2]],
    owner: mockUsers[1]
  }
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create wireframes and high-fidelity mockups for the new homepage',
    status: 'in-progress',
    priority: 'high',
    assignee: mockUsers[1],
    reporter: mockUsers[0],
    project: mockProjects[0],
    tags: ['design', 'frontend'],
    dueDate: new Date('2024-12-30'),
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date(),
    estimatedHours: 16,
    actualHours: 8,
    attachments: [],
    comments: [],
    dependencies: [],
    subtasks: []
  },
  {
    id: '2',
    title: 'Set up Development Environment',
    description: 'Configure development tools and dependencies',
    status: 'done',
    priority: 'medium',
    assignee: mockUsers[2],
    reporter: mockUsers[0],
    project: mockProjects[0],
    tags: ['setup', 'development'],
    dueDate: new Date('2024-12-25'),
    createdAt: new Date('2024-12-18'),
    updatedAt: new Date(),
    estimatedHours: 4,
    actualHours: 3,
    attachments: [],
    comments: [],
    dependencies: [],
    subtasks: []
  },
  {
    id: '3',
    title: 'User Authentication System',
    description: 'Implement secure user login and registration',
    status: 'todo',
    priority: 'urgent',
    assignee: mockUsers[0],
    reporter: mockUsers[1],
    project: mockProjects[1],
    tags: ['backend', 'security'],
    dueDate: new Date('2024-12-28'),
    createdAt: new Date('2024-12-22'),
    updatedAt: new Date(),
    estimatedHours: 24,
    attachments: [],
    comments: [],
    dependencies: ['2'],
    subtasks: []
  },
  {
    id: '4',
    title: 'Code Review',
    description: 'Review pull request for homepage implementation',
    status: 'review',
    priority: 'medium',
    assignee: mockUsers[0],
    reporter: mockUsers[1],
    project: mockProjects[0],
    tags: ['review', 'quality'],
    dueDate: new Date('2024-12-26'),
    createdAt: new Date('2024-12-23'),
    updatedAt: new Date(),
    estimatedHours: 2,
    actualHours: 1,
    attachments: [],
    comments: [],
    dependencies: ['1'],
    subtasks: []
  }
];

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationService] = useState(() => NotificationService.getInstance());

  // Initialize notification service and check for overdue tasks
  useEffect(() => {
    const initializeNotifications = async () => {
      // Check permission status and schedule notifications if granted
      if (notificationService.getPermissionStatus() === 'granted') {
        // Schedule daily reminders for today's tasks
        notificationService.scheduleDailyReminders(state.tasks);
        
        // Check for overdue tasks
        notificationService.checkOverdueTasks(state.tasks);
        
        // Start recurring checks
        notificationService.scheduleRecurringCheck();
      }
    };

    initializeNotifications();
  }, [notificationService, state.tasks]);

  // Clean up notifications when component unmounts
  useEffect(() => {
    return () => {
      notificationService.clearAllReminders();
    };
  }, [notificationService]);

  // Initialize data
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      dispatch({ type: 'SET_USERS', payload: mockUsers });
      dispatch({ type: 'SET_PROJECTS', payload: mockProjects });
      dispatch({ type: 'SET_TASKS', payload: mockTasks });
      dispatch({ type: 'SET_CURRENT_USER', payload: mockUsers[0] });
      dispatch({ type: 'SET_SELECTED_PROJECT', payload: mockProjects[0] });
      setIsLoading(false);
    }, 1000);
  }, []);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
    
    // Schedule notifications for the new task
    scheduleTaskNotifications(newTask);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const moveTask = (taskId: string, newStatus: string, newIndex: number) => {
    dispatch({ type: 'MOVE_TASK', payload: { taskId, newStatus, newIndex } });
  };

  const setSelectedProject = (project: Project | null) => {
    dispatch({ type: 'SET_SELECTED_PROJECT', payload: project });
  };

  const setFilter = (filter: Filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const getFilteredTasks = (): Task[] => {
    let filteredTasks = state.tasks;

    // Filter by selected project
    if (state.selectedProject) {
      filteredTasks = filteredTasks.filter(task => task.project.id === state.selectedProject!.id);
    }

    // Apply filters
    const { assignee, priority, status, tags, searchText, dueDateRange } = state.filter;

    if (assignee && assignee.length > 0) {
      filteredTasks = filteredTasks.filter(task => 
        task.assignee && assignee.includes(task.assignee.id)
      );
    }

    if (priority && priority.length > 0) {
      filteredTasks = filteredTasks.filter(task => priority.includes(task.priority));
    }

    if (status && status.length > 0) {
      filteredTasks = filteredTasks.filter(task => status.includes(task.status));
    }

    if (tags && tags.length > 0) {
      filteredTasks = filteredTasks.filter(task => 
        task.tags.some(tag => tags.includes(tag))
      );
    }

    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower)
      );
    }

    if (dueDateRange) {
      filteredTasks = filteredTasks.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        if (dueDateRange.start && dueDate < dueDateRange.start) return false;
        if (dueDateRange.end && dueDate > dueDateRange.end) return false;
        return true;
      });
    }

    return filteredTasks;
  };

  const addNotification = (notificationData: Omit<Notification, 'id' | 'createdAt'>) => {
    const notification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const markNotificationRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id });
  };

  const generateAnalytics = () => {
    const tasks = getFilteredTasks();
    const completedTasks = tasks.filter(task => task.status === 'done');
    const overdueTasks = tasks.filter(task => 
      task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done'
    );

    const tasksByStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const analytics: Analytics = {
      totalTasks: tasks.length,
      completedTasks: completedTasks.length,
      overdueTasks: overdueTasks.length,
      averageCompletionTime: 0, // Would calculate from actual data
      tasksByStatus,
      tasksByPriority,
      teamProductivity: [],
      projectProgress: []
    };

    dispatch({ type: 'SET_ANALYTICS', payload: analytics });
  };

  const setWorkspaceMode = (mode: 'personal' | 'team') => {
    dispatch({ type: 'SET_WORKSPACE_MODE', payload: mode });
  };

  const updatePersonalSettings = (settings: Partial<TaskState['personalSettings']>) => {
    dispatch({ type: 'UPDATE_PERSONAL_SETTINGS', payload: settings });
  };

  const scheduleTaskNotifications = (task: Task) => {
    if (task.dueDate && notificationService.getPermissionStatus() === 'granted') {
      // Get notification settings from localStorage
      const savedSettings = localStorage.getItem('taskflow-notification-settings');
      const settings = savedSettings ? JSON.parse(savedSettings) : { advanceNotice: 24, dueDateReminders: true };
      
      if (settings.dueDateReminders) {
        // Schedule due date reminder
        const reminderTime = new Date(task.dueDate.getTime() - (settings.advanceNotice * 60 * 60 * 1000));
        
        notificationService.scheduleTaskReminder({
          taskId: task.id,
          taskTitle: task.title,
          dueDate: task.dueDate,
          reminderType: 'due-soon',
          reminderTime: reminderTime
        });
      }
    }
  };

  const cancelTaskNotifications = (taskId: string) => {
    notificationService.cancelTaskReminder(taskId);
  };

  const contextValue: TaskContextType = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    setSelectedProject,
    setFilter,
    getFilteredTasks,
    addNotification,
    markNotificationRead,
    generateAnalytics,
    setWorkspaceMode,
    updatePersonalSettings,
    notificationService,
    scheduleTaskNotifications,
    cancelTaskNotifications,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading TaskFlow Pro...</p>
        </div>
      </div>
    );
  }

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}