import React from 'react';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { useAppStore } from '../../hooks/use-app-store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Navbar() {
  const { currentUser, school } = useAppStore();

  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-foreground">{school.name}</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
          />
        </div>

        <button className="p-2 hover:bg-muted rounded-full relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">{currentUser?.fullName}</p>
            <p className="text-xs text-muted-foreground">{currentUser?.role.replace('_', ' ')}</p>
          </div>
          <Avatar>
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback><UserIcon className="w-5 h-5" /></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
