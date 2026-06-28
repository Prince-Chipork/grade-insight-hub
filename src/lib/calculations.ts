import { Score, GradeRange } from './types';

export function calculateTotal(score: Score): number {
  return (
    (score.firstTest || 0) +
    (score.secondTest || 0) +
    (score.assignment || 0) +
    (score.project || 0) +
    (score.practical || 0) +
    (score.exam || 0)
  );
}

export function getGrade(total: number, grades: GradeRange[]) {
  const grade = grades.find(g => total >= g.min && total <= g.max);
  return grade || { grade: 'F', remark: 'Fail' };
}
