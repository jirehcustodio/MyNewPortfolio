// Database service for TaskFlow Pro
// Handles user accounts, authentication, and data persistence

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  avatar: string;
  password?: string; // Will be hashed
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    theme: 'dark' | 'light';
    defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
    language: string;
    timezone: string;
    notificationSettings: {
      dueDateReminders: boolean;
      overdueAlerts: boolean;
      dailyReminders: boolean;
      taskAssignments: boolean;
      reminderTime: string;
      advanceNotice: number;
    };
  };
  subscription: {
    plan: 'free' | 'pro' | 'team';
    status: 'active' | 'inactive' | 'trial';
    expiresAt?: Date;
  };
}

export interface UserSession {
  userId: string;
  sessionId: string;
  createdAt: Date;
  expiresAt: Date;
  device: string;
  ipAddress: string;
}

export interface UserTask {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  category: string;
  estimatedHours?: number;
  actualHours?: number;
  attachments: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
}

export interface ExportData {
  user: UserAccount | null;
  tasks: UserTask[];
  projects: UserProject[];
  exportedAt: string;
  version: string;
}

export interface UserAnalytics {
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number;
  tasksByStatus: Record<string, number>;
  tasksByPriority: Record<string, number>;
  lastUpdated: Date;
}

export interface UserProject {
  id: string;
  userId: string;
  name: string;
  description: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
}

class DatabaseService {
  private static instance: DatabaseService;
  private isInitialized = false;

  private constructor() {
    this.initialize();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private async initialize() {
    if (this.isInitialized) return;

    // Initialize IndexedDB for local storage
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      await this.initializeIndexedDB();
    }

    this.isInitialized = true;
  }

  private async initializeIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('TaskFlowProDB', 1);

      request.onerror = () => {
        console.error('Failed to open IndexedDB');
        reject(request.error);
      };

      request.onsuccess = () => {
        console.log('IndexedDB initialized successfully');
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create stores
        if (!db.objectStoreNames.contains('users')) {
          const userStore = db.createObjectStore('users', { keyPath: 'id' });
          userStore.createIndex('email', 'email', { unique: true });
        }

        if (!db.objectStoreNames.contains('tasks')) {
          const taskStore = db.createObjectStore('tasks', { keyPath: 'id' });
          taskStore.createIndex('userId', 'userId', { unique: false });
          taskStore.createIndex('status', 'status', { unique: false });
          taskStore.createIndex('dueDate', 'dueDate', { unique: false });
        }

        if (!db.objectStoreNames.contains('projects')) {
          const projectStore = db.createObjectStore('projects', { keyPath: 'id' });
          projectStore.createIndex('userId', 'userId', { unique: false });
        }

        if (!db.objectStoreNames.contains('sessions')) {
          const sessionStore = db.createObjectStore('sessions', { keyPath: 'sessionId' });
          sessionStore.createIndex('userId', 'userId', { unique: false });
        }
      };
    });
  }

  private async getDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('TaskFlowProDB', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // User Management
  async createUser(userData: Omit<UserAccount, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserAccount> {
    const user: UserAccount = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await this.getDB();
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');

    return new Promise((resolve, reject) => {
      const request = store.add(user);
      request.onsuccess = () => resolve(user);
      request.onerror = () => reject(request.error);
    });
  }

  async getUserByEmail(email: string): Promise<UserAccount | null> {
    const db = await this.getDB();
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const index = store.index('email');

    return new Promise((resolve, reject) => {
      const request = index.get(email);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async getUserById(userId: string): Promise<UserAccount | null> {
    const db = await this.getDB();
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');

    return new Promise((resolve, reject) => {
      const request = store.get(userId);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  }

  async updateUser(userId: string, updates: Partial<UserAccount>): Promise<UserAccount> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };

    const db = await this.getDB();
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');

    return new Promise((resolve, reject) => {
      const request = store.put(updatedUser);
      request.onsuccess = () => resolve(updatedUser);
      request.onerror = () => reject(request.error);
    });
  }

  // Task Management
  async createTask(taskData: Omit<UserTask, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserTask> {
    const task: UserTask = {
      ...taskData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await this.getDB();
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');

    return new Promise((resolve, reject) => {
      const request = store.add(task);
      request.onsuccess = () => resolve(task);
      request.onerror = () => reject(request.error);
    });
  }

  async getUserTasks(userId: string): Promise<UserTask[]> {
    const db = await this.getDB();
    const transaction = db.transaction(['tasks'], 'readonly');
    const store = transaction.objectStore('tasks');
    const index = store.index('userId');

    return new Promise((resolve, reject) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async updateTask(taskId: string, updates: Partial<UserTask>): Promise<UserTask> {
    const db = await this.getDB();
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');

    // Get existing task first
    const getRequest = store.get(taskId);
    
    return new Promise((resolve, reject) => {
      getRequest.onsuccess = () => {
        const existingTask = getRequest.result;
        if (!existingTask) {
          reject(new Error('Task not found'));
          return;
        }

        const updatedTask = {
          ...existingTask,
          ...updates,
          updatedAt: new Date(),
        };

        const putRequest = store.put(updatedTask);
        putRequest.onsuccess = () => resolve(updatedTask);
        putRequest.onerror = () => reject(putRequest.error);
      };
      getRequest.onerror = () => reject(getRequest.error);
    });
  }

  async deleteTask(taskId: string): Promise<void> {
    const db = await this.getDB();
    const transaction = db.transaction(['tasks'], 'readwrite');
    const store = transaction.objectStore('tasks');

    return new Promise((resolve, reject) => {
      const request = store.delete(taskId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Project Management
  async createProject(projectData: Omit<UserProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserProject> {
    const project: UserProject = {
      ...projectData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await this.getDB();
    const transaction = db.transaction(['projects'], 'readwrite');
    const store = transaction.objectStore('projects');

    return new Promise((resolve, reject) => {
      const request = store.add(project);
      request.onsuccess = () => resolve(project);
      request.onerror = () => reject(request.error);
    });
  }

  async getUserProjects(userId: string): Promise<UserProject[]> {
    const db = await this.getDB();
    const transaction = db.transaction(['projects'], 'readonly');
    const store = transaction.objectStore('projects');
    const index = store.index('userId');

    return new Promise((resolve, reject) => {
      const request = index.getAll(userId);
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  // Session Management
  async createSession(sessionData: Omit<UserSession, 'sessionId' | 'createdAt'>): Promise<UserSession> {
    const session: UserSession = {
      ...sessionData,
      sessionId: this.generateId(),
      createdAt: new Date(),
    };

    const db = await this.getDB();
    const transaction = db.transaction(['sessions'], 'readwrite');
    const store = transaction.objectStore('sessions');

    return new Promise((resolve, reject) => {
      const request = store.add(session);
      request.onsuccess = () => resolve(session);
      request.onerror = () => reject(request.error);
    });
  }

  async getValidSession(sessionId: string): Promise<UserSession | null> {
    const db = await this.getDB();
    const transaction = db.transaction(['sessions'], 'readonly');
    const store = transaction.objectStore('sessions');

    return new Promise((resolve, reject) => {
      const request = store.get(sessionId);
      request.onsuccess = () => {
        const session = request.result;
        if (session && session.expiresAt > new Date()) {
          resolve(session);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteSession(sessionId: string): Promise<void> {
    const db = await this.getDB();
    const transaction = db.transaction(['sessions'], 'readwrite');
    const store = transaction.objectStore('sessions');

    return new Promise((resolve, reject) => {
      const request = store.delete(sessionId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // Utility Methods
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Data Export/Import
  async exportUserData(userId: string): Promise<ExportData> {
    const user = await this.getUserById(userId);
    const tasks = await this.getUserTasks(userId);
    const projects = await this.getUserProjects(userId);

    return {
      user,
      tasks,
      projects,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
  }

  async importUserData(userId: string, data: ExportData): Promise<void> {
    // This would handle importing previously exported data
    // Implementation would validate and merge the data
    console.log('Importing data for user:', userId, data);
  }

  // Analytics
  async getUserAnalytics(userId: string): Promise<UserAnalytics> {
    const tasks = await this.getUserTasks(userId);
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const overdueTasks = tasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
    ).length;

    const tasksByStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalTasks,
      completedTasks,
      overdueTasks,
      completionRate: totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0,
      tasksByStatus,
      tasksByPriority,
      lastUpdated: new Date()
    };
  }
}

export default DatabaseService;