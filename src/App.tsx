import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { StoreProvider } from './hooks/use-app-store';
import { Toaster } from 'sonner';
import { DashboardLayout } from './components/layout/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SchoolSetup from './pages/SchoolSetup';
import ClassesSubjects from './pages/ClassesSubjects';
import UserManagement from './pages/UserManagement';
import Students from './pages/Students';
import Approvals from './pages/Approvals';
import ScoreEntry from './pages/ScoreEntry';
import Results from './pages/Results';
import ResultDetail from './pages/ResultDetail';
import Assessments from './pages/Assessments';

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/school" element={<SchoolSetup />} />
            <Route path="/classes" element={<ClassesSubjects />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/students" element={<Students />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/scores" element={<ScoreEntry />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/results" element={<Results />} />
            <Route path="/results/:studentId/:session/:term" element={<ResultDetail />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </StoreProvider>
  );
}

export default App;
