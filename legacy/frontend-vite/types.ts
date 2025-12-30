import { LucideIcon } from 'lucide-react';

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: 'Personal' | 'Workspace';
  dueDate?: string;
  status: 'todo' | 'ongoing' | 'completed';
  workspace?: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  participants: string[];
  type: 'upcoming' | 'recent' | 'history';
  platform?: string;
}

export interface Notification {
  id: string;
  type: 'meeting' | 'mention' | 'task' | 'system';
  user?: string;
  userInitials?: string;
  message: string;
  time: string;
  read: boolean;
  color?: string; // Tailwind color class for avatar bg
}
