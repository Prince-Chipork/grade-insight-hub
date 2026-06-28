import React from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

export default function Dashboard() {
  const { currentUser, students, users, classArms, scores } = useAppStore();

  const stats = [
    { label: 'Total Students', value: students.length, icon: GraduationCap, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Total Teachers', value: users.filter(u => u.role === 'TEACHER').length, icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Total Classes', value: classArms.length, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Pending Approvals', value: scores.filter(s => s.status === 'SUBMITTED').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  const chartData = [
    { name: 'JSS1', students: 120, avg: 72 },
    { name: 'JSS2', students: 115, avg: 68 },
    { name: 'JSS3', students: 110, avg: 75 },
    { name: 'SS1', students: 95, avg: 65 },
    { name: 'SS2', students: 90, avg: 70 },
    { name: 'SS3', students: 85, avg: 82 },
  ];

  const performanceData = [
    { term: 'Term 1', score: 65 },
    { term: 'Term 2', score: 72 },
    { term: 'Term 3', score: 68 },
    { term: 'Term 4', score: 85 },
  ];

  const isAdmin = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'SCHOOL_ADMIN';
  const isStudent = currentUser?.role === 'STUDENT';
  const isTeacher = currentUser?.role === 'TEACHER' || currentUser?.role === 'CLASS_TEACHER';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {currentUser?.fullName}</h1>
          <p className="text-muted-foreground">Here's what's happening in your school today.</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Academic Session: 2023/2024 - First Term
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>School Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="avg" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Results Published', desc: 'SS3 First Term results are now live', time: '2h ago', icon: CheckCircle, color: 'text-green-500' },
                { title: 'New Score Entry', desc: 'Mathematics SS1 scores uploaded', time: '5h ago', icon: AlertCircle, color: 'text-blue-500' },
                { title: 'System Update', desc: 'New result templates added', time: '1d ago', icon: TrendingUp, color: 'text-purple-500' }
              ].map((n, i) => (
                <div key={i} className="flex gap-3 border-b pb-3 last:border-0 last:pb-0">
                  <n.icon className={`w-5 h-5 mt-0.5 ${n.color}`} />
                  <div>
                    <p className="text-sm font-medium">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Alice Johnson', class: 'SS3A', score: '92.4%', rank: 1 },
                { name: 'Bob Smith', class: 'SS3B', score: '88.1%', rank: 2 },
                { name: 'Charlie Brown', class: 'SS2A', score: '87.5%', rank: 3 }
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm">
                      {s.rank}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.class}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{s.score}</p>
                    <Award className="w-4 h-4 text-yellow-500 inline ml-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="term" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
