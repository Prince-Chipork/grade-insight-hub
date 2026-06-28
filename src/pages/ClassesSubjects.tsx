import React, { useState } from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Plus, BookOpen, Layers, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ClassesSubjects() {
  const { classes, classArms, subjects, addClass, addClassArm, addSubject } = useAppStore();
  const [newClassName, setNewClassName] = useState('');
  const [newArmName, setNewArmName] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [newSubjectName, setNewSubjectName] = useState('');

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName) return;
    addClass({ id: 'c' + Date.now(), name: newClassName });
    setNewClassName('');
    toast.success('Class added');
  };

  const handleAddArm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArmName || !selectedClassId) return;
    addClassArm({ 
      id: 'ca' + Date.now(), 
      classId: selectedClassId, 
      name: newArmName 
    });
    setNewArmName('');
    toast.success('Class arm added');
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName) return;
    addSubject({ id: 's' + Date.now(), name: newSubjectName });
    setNewSubjectName('');
    toast.success('Subject added');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Academic Structure</h1>
        <p className="text-muted-foreground">Manage levels, sections, and curriculum.</p>
      </div>

      <Tabs defaultValue="classes">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="classes" className="gap-2"><Layers className="w-4 h-4" /> Classes & Arms</TabsTrigger>
          <TabsTrigger value="subjects" className="gap-2"><BookOpen className="w-4 h-4" /> Subjects</TabsTrigger>
        </TabsList>

        <TabsContent value="classes" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add Level</CardTitle>
                <CardDescription>e.g. JSS1, SS2</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddClass} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Class Name</Label>
                    <Input 
                      placeholder="e.g. JSS1" 
                      value={newClassName}
                      onChange={e => setNewClassName(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Plus className="w-4 h-4" /> Add Class
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add Class Arm</CardTitle>
                <CardDescription>e.g. JSS1A, SS2 Science</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddArm} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Level</Label>
                    <select 
                      className="w-full h-10 border rounded-md px-3 bg-background"
                      value={selectedClassId}
                      onChange={e => setSelectedClassId(e.target.value)}
                      required
                    >
                      <option value="">Choose Class...</option>
                      {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Arm Name</Label>
                    <Input 
                      placeholder="e.g. Arm A" 
                      value={newArmName}
                      onChange={e => setNewArmName(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Plus className="w-4 h-4" /> Add Arm
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Current academic structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {classes.map(c => (
                    <div key={c.id} className="space-y-2 border-b pb-4 last:border-0">
                      <h4 className="font-bold flex items-center justify-between text-primary">
                        {c.name}
                        <span className="text-[10px] bg-primary/10 px-2 py-0.5 rounded">Level</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {classArms.filter(ca => ca.classId === c.id).map(ca => (
                          <div key={ca.id} className="text-xs border rounded-md px-2 py-1 bg-muted flex items-center gap-2">
                            {ca.name}
                          </div>
                        ))}
                        {classArms.filter(ca => ca.classId === c.id).length === 0 && (
                          <span className="text-xs text-muted-foreground italic">No arms defined</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Add Subject</CardTitle>
                <CardDescription>Add new course to curriculum</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSubject} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Subject Name</Label>
                    <Input 
                      placeholder="e.g. Mathematics" 
                      value={newSubjectName}
                      onChange={e => setNewSubjectName(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <Plus className="w-4 h-4" /> Add Subject
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Curriculum List</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject Name</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subjects.map(s => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="text-destructive h-8 w-8">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
