import React, { useState } from 'react';
import { useAppStore } from '../hooks/use-app-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import { Save, Building2, Phone, Mail, MapPin, Quote, User, PenTool, Image as ImageIcon } from 'lucide-react';

export default function SchoolSetup() {
  const { school, updateSchool } = useAppStore();
  const [formData, setFormData] = useState(school);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchool(formData);
    toast.success('School settings updated successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">School Configuration</h1>
        <p className="text-muted-foreground">Manage your school branding and academic settings.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              General Information
            </CardTitle>
            <CardDescription>Basic details about your institution.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>School Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Motto</Label>
              <div className="relative">
                <Quote className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  className="pl-10"
                  value={formData.motto} 
                  onChange={e => setFormData({...formData, motto: e.target.value})} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Textarea 
                  className="pl-10 min-h-[80px]"
                  value={formData.address} 
                  onChange={e => setFormData({...formData, address: e.target.value})} 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    className="pl-10"
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    className="pl-10"
                    type="email"
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-primary" />
              Branding & Leadership
            </CardTitle>
            <CardDescription>Logo, signatures and authority details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>School Logo URL</Label>
                <div className="flex flex-col gap-2">
                  <div className="w-20 h-20 border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {formData.logo ? (
                      <img src={formData.logo} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <Input 
                    value={formData.logo} 
                    onChange={e => setFormData({...formData, logo: e.target.value})} 
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Principal Signature URL</Label>
                <div className="flex flex-col gap-2">
                  <div className="w-20 h-20 border rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                    {formData.signature ? (
                      <img src={formData.signature} alt="Signature" className="w-full h-full object-contain" />
                    ) : (
                      <PenTool className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <Input 
                    value={formData.signature} 
                    onChange={e => setFormData({...formData, signature: e.target.value})} 
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Principal Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input 
                  className="pl-10"
                  value={formData.principalName} 
                  onChange={e => setFormData({...formData, principalName: e.target.value})} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>School Official Stamp URL</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 border rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  <img src={formData.stamp} alt="Stamp" className="w-full h-full object-contain" />
                </div>
                <Input 
                  value={formData.stamp} 
                  onChange={e => setFormData({...formData, stamp: e.target.value})} 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Academic Sessions & Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Current Academic Session</Label>
                <select 
                  className="w-full h-10 border rounded-md px-3 bg-background"
                  value={formData.currentSession}
                  onChange={e => setFormData({...formData, currentSession: e.target.value})}
                >
                  {formData.sessions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Current Term</Label>
                <select 
                  className="w-full h-10 border rounded-md px-3 bg-background"
                  value={formData.currentTerm}
                  onChange={e => setFormData({...formData, currentTerm: e.target.value})}
                >
                  {formData.terms.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
