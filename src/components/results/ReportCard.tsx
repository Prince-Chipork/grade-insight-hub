import React from 'react';
import { Student, School, Score, GradeRange, ResultMetaData } from '../../lib/types';
import { calculateTotal, getGrade } from '../../lib/calculations';
import { QRCodeSVG } from 'qrcode.react';

interface ReportCardProps {
  student: Student;
  school: School;
  scores: Score[];
  grades: GradeRange[];
  meta?: ResultMetaData;
  className?: string;
}

export function ReportCard({ student, school, scores, grades, meta, className }: ReportCardProps) {
  const totalScore = scores.reduce((acc, s) => acc + calculateTotal(s), 0);
  const average = scores.length > 0 ? (totalScore / scores.length).toFixed(2) : '0.00';
  
  return (
    <div id="report-card" className={`bg-white text-black p-8 shadow-lg max-w-[800px] mx-auto border-8 border-double border-primary/20 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-primary pb-4 mb-6">
        <img src={school.logo} alt="Logo" className="w-24 h-24 object-contain" />
        <div className="text-center flex-1 px-4">
          <h1 className="text-2xl font-bold uppercase text-primary">{school.name}</h1>
          <p className="text-xs italic font-medium">"{school.motto}"</p>
          <p className="text-sm mt-1">{school.address}</p>
          <p className="text-sm font-semibold mt-1">TERM REPORT SHEET</p>
        </div>
        <div className="w-24 h-24 border rounded overflow-hidden">
          <img src={student.passport} alt="Student" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Student Details */}
      <div className="grid grid-cols-2 gap-y-2 text-sm mb-6 bg-muted/30 p-4 rounded border">
        <div className="flex gap-2">
          <span className="font-bold w-32">Name:</span>
          <span className="uppercase">{student.fullName}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-32">Adm. No:</span>
          <span>{student.admissionNumber}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-32">Session:</span>
          <span>{school.currentSession}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-32">Term:</span>
          <span>{school.currentTerm}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-32">Gender:</span>
          <span>{student.gender}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold w-32">Attendance:</span>
          <span>{meta?.attendance.present || 0} / {meta?.attendance.opened || 0} Days</span>
        </div>
      </div>

      {/* Academic Table */}
      <table className="w-full border-collapse border border-black text-xs mb-6">
        <thead>
          <tr className="bg-primary/10">
            <th className="border border-black p-1 text-left">SUBJECT</th>
            <th className="border border-black p-1">1ST(10)</th>
            <th className="border border-black p-1">2ND(10)</th>
            <th className="border border-black p-1">ASS(10)</th>
            <th className="border border-black p-1">PRAC(10)</th>
            <th className="border border-black p-1">EXAM(60)</th>
            <th className="border border-black p-1 font-bold">TOTAL</th>
            <th className="border border-black p-1 font-bold">GRADE</th>
            <th className="border border-black p-1">REMARK</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s, i) => {
            const total = calculateTotal(s);
            const gradeInfo = getGrade(total, grades);
            return (
              <tr key={i}>
                <td className="border border-black p-1 font-medium">Subject {i + 1}</td>
                <td className="border border-black p-1 text-center">{s.firstTest}</td>
                <td className="border border-black p-1 text-center">{s.secondTest}</td>
                <td className="border border-black p-1 text-center">{s.assignment}</td>
                <td className="border border-black p-1 text-center">{s.practical}</td>
                <td className="border border-black p-1 text-center">{s.exam}</td>
                <td className="border border-black p-1 text-center font-bold">{total}</td>
                <td className="border border-black p-1 text-center font-bold">{gradeInfo.grade}</td>
                <td className="border border-black p-1 text-center">{gradeInfo.remark}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-black p-2 text-center">
          <p className="text-[10px] font-bold uppercase">Total Score</p>
          <p className="text-xl font-bold">{totalScore}</p>
        </div>
        <div className="border border-black p-2 text-center">
          <p className="text-[10px] font-bold uppercase">Average</p>
          <p className="text-xl font-bold">{average}%</p>
        </div>
        <div className="border border-black p-2 text-center">
          <p className="text-[10px] font-bold uppercase">Final Grade</p>
          <p className="text-xl font-bold">{getGrade(parseFloat(average), grades).grade}</p>
        </div>
      </div>

      {/* Assessments */}
      <div className="grid grid-cols-2 gap-6 text-[10px] mb-8">
        <div className="space-y-1">
          <h4 className="font-bold border-b border-black mb-1">BEHAVIOUR ASSESSMENT</h4>
          <div className="flex justify-between"><span>Punctuality:</span> <span>{meta?.assessment.punctuality || 5}/5</span></div>
          <div className="flex justify-between"><span>Honesty:</span> <span>{meta?.assessment.honesty || 5}/5</span></div>
          <div className="flex justify-between"><span>Neatness:</span> <span>{meta?.assessment.neatness || 5}/5</span></div>
          <div className="flex justify-between"><span>Leadership:</span> <span>{meta?.assessment.leadership || 5}/5</span></div>
        </div>
        <div className="space-y-1">
          <h4 className="font-bold border-b border-black mb-1">PSYCHOMOTOR SKILLS</h4>
          <div className="flex justify-between"><span>Handwriting:</span> <span>{meta?.assessment.handwriting || 5}/5</span></div>
          <div className="flex justify-between"><span>Sports:</span> <span>{meta?.assessment.sports || 5}/5</span></div>
          <div className="flex justify-between"><span>Practical Skills:</span> <span>{meta?.assessment.practicalSkills || 5}/5</span></div>
          <div className="flex justify-between"><span>Music/Arts:</span> <span>{meta?.assessment.music || 5}/5</span></div>
        </div>
      </div>

      {/* Comments & Signatures */}
      <div className="space-y-4 text-xs">
        <div className="flex gap-2">
          <span className="font-bold whitespace-nowrap">Class Teacher's Comment:</span>
          <span className="border-b border-dotted border-black flex-1 italic">{meta?.classTeacherComment || 'Impressive performance, keep it up.'}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold whitespace-nowrap">Principal's Comment:</span>
          <span className="border-b border-dotted border-black flex-1 italic">{meta?.principalComment || 'Promoted to the next class.'}</span>
        </div>
      </div>

      <div className="mt-12 flex items-end justify-between">
        <div className="text-center">
          <img src={school.signature} alt="Signature" className="w-24 h-12 object-contain mx-auto" />
          <div className="w-32 border-t border-black pt-1">
            <p className="text-[10px] font-bold uppercase">{school.principalName}</p>
            <p className="text-[8px] uppercase">Principal</p>
          </div>
        </div>

        <div className="relative">
          <img src={school.stamp} alt="Stamp" className="w-24 h-24 object-contain opacity-60 absolute -top-12 -left-12 rotate-[-15deg]" />
          <div className="w-32 border-t border-black pt-1 text-center relative z-10">
            <p className="text-[8px] uppercase">School Stamp</p>
          </div>
        </div>

        <div className="text-right">
          <QRCodeSVG value={`https://school.edu/verify/${student.admissionNumber}/${school.currentSession}`} size={60} />
          <p className="text-[8px] mt-1 text-muted-foreground">Scan to verify result</p>
        </div>
      </div>
    </div>
  );
}
