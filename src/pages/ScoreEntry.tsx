import React, { useState, useMemo } from 'react';
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
import { 
  ClipboardList, 
  Save, 
  Send, 
  Download, 
  Upload,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { calculateTotal, getGrade } from '../lib/calculations';
import { Score } from '../lib/types';

export default function ScoreEntry() {
  const { 
    currentUser, 
    assignments, 
    classArms, 
    subjects, 
    students, 
    school, 
    scores, 
    updateScores,
    grades
  } = useAppStore();

  const [selectedAssignment, setSelectedAssignment] = useState<string>('');

  // Find assignments for current teacher
  const myAssignments = assignments.filter(a => a.teacherId === currentUser?.id);
  
  const currentAssignment = myAssignments.find(a => 
    `${a.classArmId}-${a.subjectId}` === selectedAssignment
  );

  const filteredStudents = useMemo(() => {
    if (!currentAssignment) return [];
    return students.filter(s => s.classArmId === currentAssignment.classArmId);
  }, [currentAssignment, students]);

  const [localScores, setLocalScores] = useState<Record<string, Score>>({});

  // Initialize local scores when assignment changes
  React.useEffect(() => {
    if (!currentAssignment) return;
    
    const initialLocal: Record<string, Score> = {};
    filteredStudents.forEach(student => {
      const existing = scores.find(s => 
        s.studentId === student.id && 
        s.subjectId === currentAssignment.subjectId &&
        s.session === school.currentSession &&
        s.term === school.currentTerm
      );
      
      initialLocal[student.id] = existing || {
        studentId: student.id,
        subjectId: currentAssignment.subjectId,
        session: school.currentSession,
        term: school.currentTerm,
        firstTest: 0,
        secondTest: 0,
        assignment: 0,
        project: 0,
        practical: 0,
        exam: 0,
        status: 'DRAFT'
      };
    });
    setLocalScores(initialLocal);
  }, [selectedAssignment, filteredStudents, scores, currentAssignment, school]);

  const handleScoreChange = (studentId: string, field: keyof Score, value: string) => {
    const numValue = Math.min(100, Math.max(0, parseInt(value) || 0));
    setLocalScores(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: numValue
      }
    }));
  };

  const handleSave = (status: 'DRAFT' | 'SUBMITTED') => {
    const scoresToUpdate = Object.values(localScores).map(s => ({
      ...s,
      status
    }));
    updateScores(scoresToUpdate);
    toast.success(status === 'SUBMITTED' ? 'Scores submitted for approval' : 'Draft saved successfully');
  };

  if (myAssignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-muted-foreground" />
        <h2 className="text-xl font-bold">No Assignments Found</h2>
        <p className="text-muted-foreground max-w-md">You haven't been assigned any subjects or classes yet. Please contact the administrator.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Score Recording</h1>
          <p className="text-muted-foreground">Academic Year {school.currentSession} - {school.currentTerm}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Template
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" /> Bulk Upload
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="max-w-md space-y-2">
            <Label>Select Subject & Class</Label>
            <select 
              className="w-full h-10 border rounded-md px-3 bg-background"
              value={selectedAssignment}
              onChange={e => setSelectedAssignment(e.target.value)}
            >
              <option value="">Choose assignment...</option>
              {myAssignments.map(a => {
                const subject = subjects.find(s => s.id === a.subjectId);
                const arm = classArms.find(ca => ca.id === a.classArmId);
                return (
                  <option key={`${a.classArmId}-${a.subjectId}`} value={`${a.classArmId}-${a.subjectId}`}>
                    {subject?.name} - {arm?.name}
                  </option>
                );
              })}
            </select>
          </div>
        </CardContent>
      </Card>

      {currentAssignment && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Student List - {classArms.find(ca => ca.id === currentAssignment.classArmId)?.name}</CardTitle>
              <CardDescription>Enter scores for {subjects.find(s => s.id === currentAssignment.subjectId)?.name}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleSave('DRAFT')} className="gap-2">
                <Save className="w-4 h-4" /> Save Draft
              </Button>
              <Button onClick={() => handleSave('SUBMITTED')} className="gap-2">
                <Send className="w-4 h-4" /> Submit for Approval
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Student Name</TableHead>
                  <TableHead className="text-center">1st Test (10)</TableHead>
                  <TableHead className="text-center">2nd Test (10)</TableHead>
                  <TableHead className="text-center">Assig. (10)</TableHead>
                  <TableHead className="text-center">Proj/Prac (10)</TableHead>
                  <TableHead className="text-center">Exam (60)</TableHead>
                  <TableHead className="text-center">Total (100)</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map(student => {
                  const s = localScores[student.id];
                  if (!s) return null;
                  const total = calculateTotal(s);
                  const gradeInfo = getGrade(total, grades);
                  const isLocked = s.status === 'SUBMITTED' || s.status === 'APPROVED';

                  return (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.fullName}</TableCell>
                      <TableCell className="p-2">
                        <Input 
                          type="number" 
                          className="w-16 mx-auto text-center" 
                          value={s.firstTest} 
                          onChange={e => handleScoreChange(student.id, 'firstTest', e.target.value)}
                          disabled={isLocked}
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input 
                          type="number" 
                          className="w-16 mx-auto text-center" 
                          value={s.secondTest} 
                          onChange={e => handleScoreChange(student.id, 'secondTest', e.target.value)}
                          disabled={isLocked}
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input 
                          type="number" 
                          className="w-16 mx-auto text-center" 
                          value={s.assignment} 
                          onChange={e => handleScoreChange(student.id, 'assignment', e.target.value)}
                          disabled={isLocked}
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input 
                          type="number" 
                          className="w-16 mx-auto text-center" 
                          value={s.practical} 
                          onChange={e => handleScoreChange(student.id, 'practical', e.target.value)}
                          disabled={isLocked}
                        />
                      </TableCell>
                      <TableCell className="p-2">
                        <Input 
                          type="number" 
                          className="w-16 mx-auto text-center" 
                          value={s.exam} 
                          onChange={e => handleScoreChange(student.id, 'exam', e.target.value)}
                          disabled={isLocked}
                        />
                      </TableCell>
                      <TableCell className="text-center font-bold">{total}</TableCell>
                      <TableCell className="text-center">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold">
                          {gradeInfo.grade}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {s.status === 'SUBMITTED' ? (
                          <div className="flex items-center gap-1 text-orange-600 text-[10px] font-bold uppercase">
                            <Clock className="w-3 h-3" /> Pending
                          </div>
                        ) : s.status === 'APPROVED' ? (
                          <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase">
                            <CheckCircle2 className="w-3 h-3" /> Approved
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-[10px] font-bold uppercase">Draft</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
