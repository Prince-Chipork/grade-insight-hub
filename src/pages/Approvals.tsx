import React, { useState } from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { 
  CheckCircle2, 
  XCircle, 
  Eye, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { calculateTotal } from '../lib/calculations';

export default function Approvals() {
  const { 
    scores, 
    updateScores, 
    subjects, 
    classArms, 
    users, 
    students,
    school
  } = useAppStore();

  // Group submitted scores by assignment (subject + classArm)
  const pendingSubmissions = React.useMemo(() => {
    const submitted = scores.filter(s => s.status === 'SUBMITTED');
    const groups: Record<string, typeof submitted> = {};
    
    submitted.forEach(s => {
      const student = students.find(st => st.id === s.studentId);
      if (!student) return;
      const key = `${s.subjectId}-${student.classArmId}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(s);
    });
    
    return Object.entries(groups).map(([key, groupScores]) => {
      const [subjectId, classArmId] = key.split('-');
      const subject = subjects.find(s => s.id === subjectId);
      const arm = classArms.find(ca => ca.id === classArmId);
      
      return {
        key,
        subjectId,
        classArmId,
        subjectName: subject?.name,
        armName: arm?.name,
        count: groupScores.length,
        scores: groupScores
      };
    });
  }, [scores, students, subjects, classArms]);

  const handleAction = (group: typeof pendingSubmissions[0], action: 'APPROVED' | 'REJECTED') => {
    const updated = group.scores.map(s => ({
      ...s,
      status: action
    }));
    updateScores(updated);
    toast.success(`Results ${action.toLowerCase()} successfully`);
  };

  if (pendingSubmissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500" />
        <h2 className="text-xl font-bold">All Caught Up!</h2>
        <p className="text-muted-foreground">There are no pending results awaiting approval.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Result Approvals</h1>
        <p className="text-muted-foreground">Review and publish academic scores submitted by teachers.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingSubmissions.map(group => (
          <Card key={group.key}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>{group.subjectName} - {group.armName}</CardTitle>
                <CardDescription>{group.count} students • Academic Term: {school.currentTerm}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Eye className="w-4 h-4" /> View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 text-destructive hover:bg-destructive/10"
                  onClick={() => handleAction(group, 'REJECTED')}
                >
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
                <Button 
                  size="sm" 
                  className="gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => handleAction(group, 'APPROVED')}
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve & Publish
                </Button>
              </div>
            </CardHeader>
            <CardContent className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="text-center">CA Total</TableHead>
                    <TableHead className="text-center">Exam</TableHead>
                    <TableHead className="text-center">Final Score</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.scores.slice(0, 3).map(s => {
                    const student = students.find(st => st.id === s.studentId);
                    const caTotal = (s.firstTest || 0) + (s.secondTest || 0) + (s.assignment || 0) + (s.practical || 0);
                    return (
                      <TableRow key={s.studentId}>
                        <TableCell className="py-2">{student?.fullName}</TableCell>
                        <TableCell className="py-2 text-center">{caTotal}</TableCell>
                        <TableCell className="py-2 text-center">{s.exam}</TableCell>
                        <TableCell className="py-2 text-center font-bold">{calculateTotal(s)}</TableCell>
                      </TableRow>
                    );
                  })}
                  {group.count > 3 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-xs text-muted-foreground italic">
                        ... and {group.count - 3} more students
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
