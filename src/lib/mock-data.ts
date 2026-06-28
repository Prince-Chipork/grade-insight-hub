import { User, School, Class, ClassArm, Subject, Student, Assignment, GradeRange } from './types';

export const INITIAL_SCHOOL: School = {
  id: 'school-1',
  name: 'Standard International Academy',
  logo: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7d74a2de-5dd4-4755-9533-1f982099a297/school-logo-47e284f1-1782652514065.webp',
  address: '123 Education Way, Lagos, Nigeria',
  phone: '+234 800 123 4567',
  email: 'info@standardacademy.edu',
  motto: 'Excellence in Learning and Character',
  principalName: 'Dr. John Doe',
  signature: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7d74a2de-5dd4-4755-9533-1f982099a297/principal-signature-b9480db8-1782652514558.webp',
  stamp: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7d74a2de-5dd4-4755-9533-1f982099a297/school-stamp-9c51a34e-1782652514236.webp',
  sessions: ['2023/2024', '2024/2025'],
  terms: ['First Term', 'Second Term', 'Third Term'],
  currentSession: '2023/2024',
  currentTerm: 'First Term'
};

export const INITIAL_GRADES: GradeRange[] = [
  { grade: 'A', min: 75, max: 100, remark: 'Excellent' },
  { grade: 'B', min: 65, max: 74, remark: 'Very Good' },
  { grade: 'C', min: 50, max: 64, remark: 'Good' },
  { grade: 'D', min: 45, max: 49, remark: 'Fair' },
  { grade: 'E', min: 40, max: 44, remark: 'Pass' },
  { grade: 'F', min: 0, max: 39, remark: 'Fail' }
];

export const INITIAL_USERS: User[] = [
  { id: 'u1', email: 'admin@school.com', role: 'SUPER_ADMIN', fullName: 'Super Admin', staffId: 'STF/2023/001' },
  { id: 'u2', email: 'principal@school.com', role: 'SCHOOL_ADMIN', fullName: 'School Admin', staffId: 'STF/2023/002' },
  { id: 'u3', email: 'teacher@school.com', role: 'TEACHER', fullName: 'Subject Teacher', staffId: 'STF/2023/003' },
  { id: 'u4', email: 'class.teacher@school.com', role: 'CLASS_TEACHER', fullName: 'Class Teacher', staffId: 'STF/2023/004' },
  { id: 'u5', email: 'student@school.com', role: 'STUDENT', fullName: 'Samuel Student' },
  { id: 'u6', email: 'parent@school.com', role: 'PARENT', fullName: 'Patricia Parent', relatedIds: ['s1'] }
];

export const INITIAL_CLASSES: Class[] = [
  { id: 'c1', name: 'JSS1' },
  { id: 'c2', name: 'JSS2' },
  { id: 'c3', name: 'JSS3' },
  { id: 'c4', name: 'SS1' },
  { id: 'c5', name: 'SS2' },
  { id: 'c6', name: 'SS3' }
];

export const INITIAL_CLASS_ARMS: ClassArm[] = [
  { id: 'ca1', classId: 'c1', name: 'JSS1A', teacherId: 'u4' },
  { id: 'ca2', classId: 'c1', name: 'JSS1B' },
  { id: 'ca3', classId: 'c4', name: 'SS1 Science' },
  { id: 'ca4', classId: 'c4', name: 'SS1 Arts' }
];

export const INITIAL_SUBJECTS: Subject[] = [
  { id: 'sub1', name: 'Mathematics' },
  { id: 'sub2', name: 'English Language' },
  { id: 'sub3', name: 'Physics' },
  { id: 'sub4', name: 'Biology' },
  { id: 'sub5', name: 'Computer Studies' }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  { subjectId: 'sub1', teacherId: 'u3', classArmId: 'ca1' },
  { subjectId: 'sub2', teacherId: 'u3', classArmId: 'ca1' }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's1',
    admissionNumber: 'SCH/2023/001',
    fullName: 'Samuel Student',
    passport: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/7d74a2de-5dd4-4755-9533-1f982099a297/student-passport-1-86f74f15-1782652514426.webp',
    dob: '2010-05-15',
    gender: 'Male',
    state: 'Lagos',
    lga: 'Ikeja',
    nationality: 'Nigerian',
    religion: 'Christian',
    address: '10 Student Lane, Lagos',
    parentName: 'Patricia Parent',
    parentPhone: '+234 900 000 0001',
    parentEmail: 'parent@school.com',
    parentOccupation: 'Engineer',
    bloodGroup: 'O+',
    medicalInfo: 'None',
    classArmId: 'ca1',
    admissionDate: '2023-09-01',
    status: 'ACTIVE'
  }
];
