export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'member';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  members: User[];
  owner: User;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  reporter: User;
  project: Project;
  tags: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  estimatedHours?: number;
  actualHours?: number;
  attachments: Attachment[];
  comments: Comment[];
  dependencies: string[]; // Task IDs
  subtasks: Task[];
  parentTask?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  taskId: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedBy: User;
  uploadedAt: Date;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
  limit?: number;
  color: string;
}

export interface Board {
  id: string;
  name: string;
  description: string;
  columns: Column[];
  project: Project;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: Date;
  userId: string;
  relatedTask?: string;
  relatedProject?: string;
}

export interface WorkflowRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    event: 'task_created' | 'task_updated' | 'task_completed' | 'due_date_approaching';
    conditions: Record<string, unknown>[];
  };
  actions: {
    type: 'assign_user' | 'change_status' | 'send_notification' | 'create_task';
    parameters: Record<string, unknown>;
  }[];
  active: boolean;
  projectId: string;
}

export interface Filter {
  assignee?: string[];
  priority?: string[];
  status?: string[];
  tags?: string[];
  project?: string[];
  dueDateRange?: {
    start?: Date;
    end?: Date;
  };
  searchText?: string;
}

export interface Analytics {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  averageCompletionTime: number;
  tasksByStatus: Record<string, number>;
  tasksByPriority: Record<string, number>;
  teamProductivity: {
    userId: string;
    completedTasks: number;
    averageTime: number;
  }[];
  projectProgress: {
    projectId: string;
    completion: number;
    onTime: boolean;
  }[];
}