import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppStore } from '../hooks/use-app-store';
import { ReportCard } from '../components/results/ReportCard';
import { Button } from '../components/ui/button';
import { Download, ChevronLeft, Printer, Share2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from 'sonner';

export default function ResultDetail() {
  const { studentId, session, term } = useParams();
  const { students, school, scores, grades, resultsMeta } = useAppStore();
  const navigate = useNavigate();
  const reportRef = useRef<HTMLDivElement>(null);

  const student = students.find(s => s.id === studentId);
  const studentScores = scores.filter(s => 
    s.studentId === studentId && 
    s.session === session && 
    s.term === term &&
    s.status === 'APPROVED'
  );
  const meta = resultsMeta.find(m => 
    m.studentId === studentId && 
    m.session === session && 
    m.term === term
  );

  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    toast.loading('Generating PDF...', { id: 'pdf' });
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Result_${student?.admissionNumber}_${session}_${term}.pdf`);
      
      toast.success('PDF downloaded successfully', { id: 'pdf' });
    } catch (error) {
      console.error('PDF Error:', error);
      toast.error('Failed to generate PDF', { id: 'pdf' });
    }
  };

  if (!student) {
    return <div className="p-8 text-center">Student not found</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Button variant="ghost" className="gap-2 w-fit" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-4 h-4" /> Back to List
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => window.print()}>
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" /> Share
          </Button>
          <Button className="gap-2" onClick={downloadPDF}>
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="bg-muted p-4 sm:p-8 rounded-xl flex justify-center overflow-x-auto">
        <div ref={reportRef}>
          <ReportCard 
            student={student} 
            school={school} 
            scores={studentScores} 
            grades={grades} 
            meta={meta} 
          />
        </div>
      </div>
    </div>
  );
}
