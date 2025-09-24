// Notification Service for TaskFlow Pro
// Handles browser notifications, permission management, and reminder scheduling

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
  actions?: NotificationAction[];
  data?: Record<string, unknown>;
}

export interface TaskReminder {
  taskId: string;
  taskTitle: string;
  dueDate: Date;
  reminderType: 'due-soon' | 'overdue' | 'daily-reminder' | 'task-assigned';
  reminderTime?: Date;
}

class NotificationService {
  private static instance: NotificationService;
  private permission: NotificationPermission = 'default';
  private activeReminders: Map<string, number> = new Map();
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;

  private constructor() {
    this.initializeService();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async initializeService() {
    // Check if running in browser environment
    if (typeof window === 'undefined') {
      console.warn('NotificationService: Not running in browser environment');
      return;
    }

    // Check if notifications are supported
    if (!('Notification' in window)) {
      console.warn('This browser does not support desktop notifications');
      return;
    }

    this.permission = Notification.permission;

    // Register service worker for background notifications
    if ('serviceWorker' in navigator) {
      try {
        this.serviceWorkerRegistration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered for notifications');
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    }
  }

  public async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('Notifications not supported in this browser');
    }

    if (this.permission === 'granted') {
      return this.permission;
    }

    if (this.permission === 'denied') {
      throw new Error('Notification permission denied. Please enable in browser settings.');
    }

    this.permission = await Notification.requestPermission();
    return this.permission;
  }

  public getPermissionStatus(): NotificationPermission {
    return this.permission;
  }

  public isNotificationSupported(): boolean {
    return 'Notification' in window;
  }

  public async showNotification(options: NotificationOptions): Promise<void> {
    if (this.permission !== 'granted') {
      console.warn('Cannot show notification: permission not granted');
      return;
    }

    const defaultOptions = {
      icon: '/taskflow-icon.png',
      badge: '/taskflow-badge.png',
      requireInteraction: false,
      ...options
    };

    if (this.serviceWorkerRegistration) {
      // Use service worker for better background support
      await this.serviceWorkerRegistration.showNotification(options.title, defaultOptions);
    } else {
      // Fallback to basic notifications
      new Notification(options.title, defaultOptions);
    }
  }

  public scheduleTaskReminder(reminder: TaskReminder): void {
    const now = new Date();
    const reminderTime = reminder.reminderTime || new Date(reminder.dueDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours before due date

    if (reminderTime <= now) {
      // If reminder time has passed, show immediately
      this.showTaskNotification(reminder);
      return;
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();
    
    // Schedule the reminder
    const timeoutId = window.setTimeout(() => {
      this.showTaskNotification(reminder);
      this.activeReminders.delete(reminder.taskId);
    }, timeUntilReminder);

    // Store the timeout ID to allow cancellation
    this.activeReminders.set(reminder.taskId, timeoutId);
  }

  public cancelTaskReminder(taskId: string): void {
    const timeoutId = this.activeReminders.get(taskId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.activeReminders.delete(taskId);
    }
  }

  private async showTaskNotification(reminder: TaskReminder): Promise<void> {
    let title: string;
    let body: string;
    let requireInteraction = false;

    switch (reminder.reminderType) {
      case 'due-soon':
        title = '⏰ Task Due Soon';
        body = `"${reminder.taskTitle}" is due in 24 hours`;
        break;
      case 'overdue':
        title = '🚨 Task Overdue';
        body = `"${reminder.taskTitle}" is now overdue`;
        requireInteraction = true;
        break;
      case 'daily-reminder':
        title = '📋 Daily Task Reminder';
        body = `Don't forget: "${reminder.taskTitle}"`;
        break;
      case 'task-assigned':
        title = '📨 New Task Assigned';
        body = `You've been assigned: "${reminder.taskTitle}"`;
        requireInteraction = true;
        break;
      default:
        title = '📝 TaskFlow Reminder';
        body = `Reminder for: "${reminder.taskTitle}"`;
    }

    await this.showNotification({
      title,
      body,
      tag: `task-${reminder.taskId}`,
      requireInteraction,
      data: {
        taskId: reminder.taskId,
        reminderType: reminder.reminderType,
        url: `/taskflow?task=${reminder.taskId}`
      },
      actions: [
        {
          action: 'view',
          title: 'View Task',
          icon: '/icons/view.png'
        },
        {
          action: 'snooze',
          title: 'Snooze 1h',
          icon: '/icons/snooze.png'
        }
      ]
    });
  }

  public scheduleDailyReminders(tasks: Array<{ id: string; title: string; dueDate?: Date }>): void {
    tasks.forEach(task => {
      if (task.dueDate) {
        // Schedule reminder for tasks due today
        const today = new Date();
        const dueDate = new Date(task.dueDate);
        
        if (
          dueDate.getDate() === today.getDate() &&
          dueDate.getMonth() === today.getMonth() &&
          dueDate.getFullYear() === today.getFullYear()
        ) {
          const reminderTime = new Date();
          reminderTime.setHours(9, 0, 0, 0); // 9 AM reminder
          
          if (reminderTime > today) {
            this.scheduleTaskReminder({
              taskId: task.id,
              taskTitle: task.title,
              dueDate: dueDate,
              reminderType: 'daily-reminder',
              reminderTime: reminderTime
            });
          }
        }
      }
    });
  }

  public checkOverdueTasks(tasks: Array<{ id: string; title: string; dueDate?: Date; status: string }>): void {
    const now = new Date();
    
    tasks.forEach(task => {
      if (task.dueDate && task.status !== 'done' && new Date(task.dueDate) < now) {
        this.showTaskNotification({
          taskId: task.id,
          taskTitle: task.title,
          dueDate: new Date(task.dueDate),
          reminderType: 'overdue'
        });
      }
    });
  }

  public scheduleRecurringCheck(): void {
    // Check for overdue tasks every hour
    setInterval(() => {
      // This would be connected to the task context to get current tasks
      console.log('Checking for overdue tasks...');
    }, 60 * 60 * 1000); // 1 hour
  }

  public async testNotification(): Promise<void> {
    await this.showNotification({
      title: '🎉 TaskFlow Pro Notifications Enabled!',
      body: 'You will now receive reminders for your tasks and due dates.',
      requireInteraction: true
    });
  }

  public clearAllReminders(): void {
    this.activeReminders.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.activeReminders.clear();
  }
}

export default NotificationService;