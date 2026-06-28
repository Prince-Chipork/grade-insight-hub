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
import { Plus, Search, GraduationCap, Filter, Download, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

export default function Students() {
  const { students, classArms, addStudent, generateAdmissionNumber } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    admissionNumber: '',
    classArmId: '',
    gender: 'Male',
    parentName: '',
    parentEmail: '',
    dob: ''
  });

  const startAdding = () => {
    setNewStudent(prev => ({
      ...prev,
      admissionNumber: generateAdmissionNumber()
    }));
    setIsAdding(true);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      id: 's' + Date.now(),
      passport: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7d74a2de-5dd4-4755-9533-1f982099a297/student-passport-1-86f74f15-1782652514426.webp',
      state: 'Lagos',
      lga: 'Ikeja',
      nationality: 'Nigerian',
      religion: 'Christian',
      address: '',
      parentPhone: '',
      parentOccupation: '',
      bloodGroup: 'O+',
      medicalInfo: 'None',
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      ...newStudent
    });
    setIsAdding(false);
    toast.success('Student registered successfully');
  };

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student enrollment and records.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button onClick={startAdding} className="gap-2">
            <Plus className="w-4 h-4" /> Register Student
          </Button>
        </div>
      </div>

      {isAdding ? (
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Register New Student</CardTitle>
            <CardDescription>Enter primary student and parent information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddStudent} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Student Details</h3>
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      value={newStudent.fullName}
                      onChange={e => setNewStudent({...newStudent, fullName: e.target.value})}
                      placeholder="Enter student's full name"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Admission No.</Label>
                      <Input 
                        value={newStudent.admissionNumber}
                        onChange={e => setNewStudent({...newStudent, admissionNumber: e.target.value})}
                        placeholder="SCH/..."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <select 
                        className="w-full h-10 border rounded-md px-3 bg-background"
                        value={newStudent.gender}
                        onChange={e => setNewStudent({...newStudent, gender: e.target.value})}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Class & Arm</Label>
                      <select 
                        className="w-full h-10 border rounded-md px-3 bg-background"
                        value={newStudent.classArmId}
                        onChange={e => setNewStudent({...newStudent, classArmId: e.target.value})}
                        required
                      >
                        <option value="">Select...</option>
                        {classArms.map(ca => <option key={ca.id} value={ca.id}>{ca.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input 
                        type="date"
                        value={newStudent.dob}
                        onChange={e => setNewStudent({...newStudent, dob: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">Parent/Guardian</h3>
                  <div className="space-y-2">
                    <Label>Parent Full Name</Label>
                    <Input 
                      value={newStudent.parentName}
                      onChange={e => setNewStudent({...newStudent, parentName: e.target.value})}
                      placeholder="Parent's name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Parent Email</Label>
                    <Input 
                      type="email"
                      value={newStudent.parentEmail}
                      onChange={e => setNewStudent({...newStudent, parentEmail: e.target.value})}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit">Complete Registration</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex gap-4 items-center bg-card p-4 rounded-lg border">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name or admission number..." 
                className="pl-9"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" /> Filter
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Adm. Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Parent Info</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={s.passport} />
                            <AvatarFallback><GraduationCap className="h-5 w-5" /></AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{s.fullName}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">{s.gender}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{s.admissionNumber}</TableCell>
                      <TableCell>
                        <span className="text-sm">{classArms.find(ca => ca.id === s.classArmId)?.name}</span>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs">
                          <p className="font-medium">{s.parentName}</p>
                          <p className="text-muted-foreground">{s.parentEmail}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">
                          {s.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
