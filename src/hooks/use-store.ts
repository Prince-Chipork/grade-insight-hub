import { useState, useEffect } from 'react';
import { School, User, Class, ClassArm, Subject, Student, Assignment, Score, ResultMetaData, GradeRange } from '../lib/types';
import { INITIAL_SCHOOL, INITIAL_USERS, INITIAL_CLASSES, INITIAL_CLASS_ARMS, INITIAL_SUBJECTS, INITIAL_STUDENTS, INITIAL_ASSIGNMENTS, INITIAL_GRADES } from '../lib/mock-data';

const STORAGE_KEY = 'school_system_data';

interface AppState {
  school: School;
  users: User[];
  classes: Class[];
  classArms: ClassArm[];
  subjects: Subject[];
  students: Student[];
  assignments: Assignment[];
  scores: Score[];
  resultsMeta: ResultMetaData[];
  grades: GradeRange[];
  currentUser: User | null;
}

export function useStore() {
  const [state, setState] = useState<AppState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          currentUser: parsed.currentUser || null
        };
      } catch (e) {
        console.error('Failed to parse storage', e);
      }
    }
    return {
      school: INITIAL_SCHOOL,
      users: INITIAL_USERS,
      classes: INITIAL_CLASSES,
      classArms: INITIAL_CLASS_ARMS,
      subjects: INITIAL_SUBJECTS,
      students: INITIAL_STUDENTS,
      assignments: INITIAL_ASSIGNMENTS,
      scores: [],
      resultsMeta: [],
      grades: INITIAL_GRADES,
      currentUser: null
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (email: string) => {
    const user = state.users.find(u => u.email === email);
    if (user) {
      setState(prev => ({ ...prev, currentUser: user }));
      return user;
    }
    return null;
  };

  const logout = () => {
    setState(prev => ({ ...prev, currentUser: null }));
  };

  const updateSchool = (school: School) => setState(prev => ({ ...prev, school }));
  
  const addClass = (c: Class) => setState(prev => ({ ...prev, classes: [...prev.classes, c] }));
  const addClassArm = (ca: ClassArm) => setState(prev => ({ ...prev, classArms: [...prev.classArms, ca] }));
  const addSubject = (s: Subject) => setState(prev => ({ ...prev, subjects: [...prev.subjects, s] }));
  
  const generateAdmissionNumber = () => {
    const year = new Date().getFullYear();
    const count = state.students.length + 1;
    return `ADM/${year}/${count.toString().padStart(3, '0')}`;
  };

  const generateStaffId = () => {
    const year = new Date().getFullYear();
    const count = state.users.filter(u => u.role !== 'STUDENT' && u.role !== 'PARENT').length + 1;
    return `STF/${year}/${count.toString().padStart(3, '0')}`;
  };

  const addStudent = (s: Student) => {
    const studentWithId = { ...s };
    if (!studentWithId.admissionNumber) {
      studentWithId.admissionNumber = generateAdmissionNumber();
    }
    setState(prev => ({ ...prev, students: [...prev.students, studentWithId] }));
  };

  const addUser = (u: User) => {
    const userWithId = { ...u };
    if ((u.role === 'TEACHER' || u.role === 'SCHOOL_ADMIN' || u.role === 'CLASS_TEACHER') && !userWithId.staffId) {
      userWithId.staffId = generateStaffId();
    }
    setState(prev => ({ ...prev, users: [...prev.users, userWithId] }));
  };

  const addAssignment = (a: Assignment) => setState(prev => ({ ...prev, assignments: [...prev.assignments, a] }));

  const updateScores = (newScores: Score[]) => {
    setState(prev => {
      const existingScores = [...prev.scores];
      newScores.forEach(ns => {
        const index = existingScores.findIndex(s => 
          s.studentId === ns.studentId && 
          s.subjectId === ns.subjectId && 
          s.session === ns.session && 
          s.term === ns.term
        );
        if (index > -1) {
          existingScores[index] = ns;
        } else {
          existingScores.push(ns);
        }
      });
      return { ...prev, scores: existingScores };
    });
  };

  const updateResultMeta = (meta: ResultMetaData) => {
    setState(prev => {
      const existing = [...prev.resultsMeta];
      const index = existing.findIndex(m => 
        m.studentId === meta.studentId && 
        m.session === meta.session && 
        m.term === meta.term
      );
      if (index > -1) {
        existing[index] = meta;
      } else {
        existing.push(meta);
      }
      return { ...prev, resultsMeta: existing };
    });
  };

  return {
    ...state,
    login,
    logout,
    updateSchool,
    addClass,
    addClassArm,
    addSubject,
    addStudent,
    generateAdmissionNumber,
    addUser,
    generateStaffId,
    addAssignment,
    updateScores,
    updateResultMeta
  };
}
