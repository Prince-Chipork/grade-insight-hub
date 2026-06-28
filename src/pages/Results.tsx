import React from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FileText, Download, Eye, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Results() {
  const { currentUser, students, school } = useAppStore();

  const getMyStudents = () => {
    if (currentUser?.role === 'STUDENT') {
      return students.filter(s => s.id === currentUser.id || s.fullName === currentUser.fullName);
    }
    if (currentUser?.role === 'PARENT') {
      return students.filter(s => currentUser.relatedIds?.includes(s.id));
    }
    return [];
  };

  const myStudents = getMyStudents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Academic Results</h1>
        <p className="text-muted-foreground">View and download termly report cards.</p>
      </div>

      {myStudents.length === 0 ? (
        <Card className="p-12 text-center flex flex-col items-center">
          <FileText className="w-16 h-16 text-muted-foreground mb-4" />
          <h2 className="text-xl font-bold">No Records Found</h2>
          <p className="text-muted-foreground">We couldn't find any student records linked to your account.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myStudents.map(student => (
            <Card key={student.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
                    <img src={student.passport} alt="Student" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{student.fullName}</CardTitle>
                    <CardDescription>{student.admissionNumber}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="text-muted-foreground">Current Session</span>
                  <span className="font-medium">{school.currentSession}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="text-muted-foreground">Current Term</span>
                  <span className="font-medium">{school.currentTerm}</span>
                </div>
                
                <div className="pt-2 flex flex-col gap-2">
                  <Link to={`/results/${student.id}/${school.currentSession}/${school.currentTerm}`}>
                    <Button className="w-full gap-2">
                      <Eye className="w-4 h-4" /> View Current Result
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" /> Previous Records
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
