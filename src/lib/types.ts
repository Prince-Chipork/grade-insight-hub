export type UserRole = 'SUPER_ADMIN' | 'SCHOOL_ADMIN' | 'TEACHER' | 'CLASS_TEACHER' | 'STUDENT' | 'PARENT';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  staffId?: string;
  avatar?: string;
  schoolId?: string;
  relatedIds?: string[]; // For parents to link to students
}

export interface School {
  id: string;
  name: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  motto: string;
  principalName: string;
  signature: string;
  stamp: string;
  sessions: string[];
  terms: string[];
  currentSession: string;
  currentTerm: string;
}

export interface GradeRange {
  grade: string;
  min: number;
  max: number;
  remark: string;
}

export interface Class {
  id: string;
  name: string; // JSS1, SS2, etc.
}

export interface ClassArm {
  id: string;
  classId: string;
  name: string; // A, B, Science, etc.
  teacherId?: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface Assignment {
  subjectId: string;
  teacherId: string;
  classArmId: string;
}

export interface Student {
  id: string;
  admissionNumber: string;
  fullName: string;
  passport: string;
  email?: string;
  dob: string;
  gender: string;
  state: string;
  lga: string;
  nationality: string;
  religion: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  parentOccupation: string;
  bloodGroup: string;
  medicalInfo: string;
  classArmId: string;
  admissionDate: string;
  status: 'ACTIVE' | 'GRADUATED' | 'WITHDRAWN';
}

export interface Score {
  studentId: string;
  subjectId: string;
  session: string;
  term: string;
  firstTest: number;
  secondTest: number;
  assignment: number;
  project: number;
  practical: number;
  exam: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}

export interface Assessment {
  punctuality: number;
  honesty: number;
  neatness: number;
  leadership: number;
  creativity: number;
  respect: number;
  obedience: number;
  communication: number;
  teamwork: number;
  discipline: number;
  spiritualConduct: number;
  participation: number;
  handwriting: number;
  sports: number;
  practicalSkills: number;
  music: number;
  drawing: number;
  craft: number;
  labSkills: number;
}

export interface ResultMetaData {
  studentId: string;
  session: string;
  term: string;
  attendance: {
    opened: number;
    present: number;
    absent: number;
  };
  assessment: Assessment;
  classTeacherComment: string;
  principalComment: string;
  isPublished: boolean;
}
