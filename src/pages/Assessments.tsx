import React, { useState } from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { ClipboardCheck, Save, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Assessment, ResultMetaData } from '../lib/types';

export default function Assessments() {
  const { students, classArms, currentUser, school, resultsMeta, updateResultMeta } = useAppStore();
  const [selectedArmId, setSelectedArmId] = useState('');

  // Find class arms where this user is the class teacher
  const myArms = classArms.filter(ca => ca.teacherId === currentUser?.id);
  
  const filteredStudents = students.filter(s => s.classArmId === selectedArmId);

  const [localMeta, setLocalMeta] = useState<Record<string, ResultMetaData>>({});

  React.useEffect(() => {
    if (!selectedArmId) return;
    
    const initial: Record<string, ResultMetaData> = {};
    filteredStudents.forEach(student => {
      const existing = resultsMeta.find(m => 
        m.studentId === student.id && 
        m.session === school.currentSession && 
        m.term === school.currentTerm
      );
      
      initial[student.id] = existing || {
        studentId: student.id,
        session: school.currentSession,
        term: school.currentTerm,
        attendance: { opened: 120, present: 110, absent: 10 },
        assessment: {
          punctuality: 5, honesty: 5, neatness: 5, leadership: 5, creativity: 5,
          respect: 5, obedience: 5, communication: 5, teamwork: 5, discipline: 5,
          spiritualConduct: 5, participation: 5, handwriting: 5, sports: 5,
          practicalSkills: 5, music: 5, drawing: 5, craft: 5, labSkills: 5
        },
        classTeacherComment: '',
        principalComment: '',
        isPublished: false
      };
    });
    setLocalMeta(initial);
  }, [selectedArmId, students, resultsMeta, school]);

  const handleUpdate = (studentId: string, updates: Partial<ResultMetaData>) => {
    setLocalMeta(prev => ({
      ...prev,
      [studentId]: { ...prev[studentId], ...updates }
    }));
  };

  const saveAll = () => {
    Object.values(localMeta).forEach(meta => updateResultMeta(meta));
    toast.success('Assessments and comments saved');
  };

  if (myArms.length === 0 && currentUser?.role !== 'SCHOOL_ADMIN') {
    return (
      <div className="p-8 text-center">
        <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-bold">No Class Assigned</h2>
        <p className="text-muted-foreground">You are not currently assigned as a Class Teacher to any arm.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Class Assessments</h1>
          <p className="text-muted-foreground">Manage behaviour ratings and comments for your class.</p>
        </div>
        <Button onClick={saveAll} className="gap-2">
          <Save className="w-4 h-4" /> Save All Changes
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="max-w-xs space-y-2">
            <Label>Select Your Class Arm</Label>
            <select 
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={selectedArmId}
              onChange={e => setSelectedArmId(e.target.value)}
            >
              <option value="">Choose class...</option>
              {(currentUser?.role === 'SCHOOL_ADMIN' ? classArms : myArms).map(ca => (
                <option key={ca.id} value={ca.id}>{ca.name}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {selectedArmId && (
        <div className="space-y-6">
          {filteredStudents.map(student => {
            const meta = localMeta[student.id];
            if (!meta) return null;

            return (
              <Card key={student.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{student.fullName}</CardTitle>
                  <CardDescription>Adm No: {student.admissionNumber}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-bold border-b pb-1 text-sm uppercase tracking-wider">Attendance</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-xs">Days Present</Label>
                          <Input 
                            type="number" 
                            value={meta.attendance.present} 
                            onChange={e => handleUpdate(student.id, { 
                              attendance: { ...meta.attendance, present: parseInt(e.target.value) || 0 } 
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs">Total Days</Label>
                          <Input 
                            type="number" 
                            value={meta.attendance.opened} 
                            onChange={e => handleUpdate(student.id, { 
                              attendance: { ...meta.attendance, opened: parseInt(e.target.value) || 0 } 
                            })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                      <h4 className="font-bold border-b pb-1 text-sm uppercase tracking-wider">Comments</h4>
                      <div className="space-y-2">
                        <Label className="text-xs">Class Teacher's Remark</Label>
                        <Textarea 
                          placeholder="Enter your comment about this student's performance..."
                          value={meta.classTeacherComment}
                          onChange={e => handleUpdate(student.id, { classTeacherComment: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
