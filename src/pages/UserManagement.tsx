import React, { useState } from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Plus, Search, Shield, User } from 'lucide-react';
import { toast } from 'sonner';
import { UserRole } from '../lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export default function UserManagement() {
  const { users, addUser, generateStaffId } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    role: 'TEACHER' as UserRole,
    staffId: ''
  });

  const startAdding = () => {
    setNewUser(prev => ({
      ...prev,
      staffId: generateStaffId()
    }));
    setIsAdding(true);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({
      id: 'u' + Date.now(),
      ...newUser
    });
    setIsAdding(false);
    setNewUser({ fullName: '', email: '', role: 'TEACHER', staffId: '' });
    toast.success('User added successfully');
  };

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage staff and administrative accounts.</p>
        </div>
        <Button onClick={isAdding ? () => setIsAdding(false) : startAdding} className="gap-2">
          {isAdding ? 'View List' : <><Plus className="w-4 h-4" /> Add New User</>}
        </Button>
      </div>

      {isAdding ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Create New Account</CardTitle>
            <CardDescription>Enter staff details to create their portal access.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input 
                  value={newUser.fullName}
                  onChange={e => setNewUser({...newUser, fullName: e.target.value})}
                  placeholder="Full Name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input 
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Staff ID</Label>
                <Input 
                  value={newUser.staffId}
                  readOnly
                  className="bg-muted font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label>System Role</Label>
                <select 
                  className="w-full h-10 border rounded-md px-3 bg-background"
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value as UserRole})}
                >
                  <option value="TEACHER">Subject Teacher</option>
                  <option value="CLASS_TEACHER">Class Teacher</option>
                  <option value="SCHOOL_ADMIN">School Administrator</option>
                  <option value="SUPER_ADMIN">Super Administrator</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <Button type="submit" className="flex-1">Create Account</Button>
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>System Users</CardTitle>
              <CardDescription>Total users with access to this school.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search name or email..." 
                className="pl-9"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Staff ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={u.avatar} />
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{u.fullName}</p>
                          <p className="text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{u.staffId || "-"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium uppercase tracking-wider">{u.role.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800">
                        Active
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
