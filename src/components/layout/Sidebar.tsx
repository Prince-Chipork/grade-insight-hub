import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  School, 
  Users, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Settings, 
  LogOut,
  UserCheck,
  ClipboardList
} from 'lucide-react';
import { useAppStore } from '../../hooks/use-app-store';
import { cn } from '../../lib/utils';

export function Sidebar() {
  const { currentUser, logout } = useAppStore();

  const getLinks = () => {
    const role = currentUser?.role;
    const links = [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard' }
    ];

    if (role === 'SUPER_ADMIN' || role === 'SCHOOL_ADMIN') {
      links.push(
        { to: '/school', icon: School, label: 'School Setup' },
        { to: '/classes', icon: BookOpen, label: 'Classes & Subjects' },
        { to: '/users', icon: Users, label: 'User Management' },
        { to: '/students', icon: GraduationCap, label: 'Students' },
        { to: '/approvals', icon: UserCheck, label: 'Approvals' }
      );
    }

    if (role === 'TEACHER' || role === 'CLASS_TEACHER') {
      links.push(
        { to: '/scores', icon: ClipboardList, label: 'Score Entry' }
      );
    }

    if (role === 'CLASS_TEACHER') {
      links.push(
        { to: '/assessments', icon: FileText, label: 'Assessments' }
      );
    }

    if (role === 'STUDENT' || role === 'PARENT') {
      links.push(
        { to: '/results', icon: FileText, label: 'My Results' }
      );
    }

    return links;
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <School className="w-8 h-8 text-primary" />
        <span className="font-bold text-lg leading-tight">School Result System</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {getLinks().map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              isActive 
                ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <link.icon className="w-5 h-5" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full text-destructive hover:bg-destructive/10 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
