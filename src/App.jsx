import { Navigate, Route, Routes } from 'react-router-dom';
import CalendarPage from './pages/CalendarPage';
import SettingsPage from './pages/SettingsPage';
import StatisticsPage from './pages/StatisticsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import ProtectedLayout from './components/layouts/ProtectedLayout';
import AuthLayout from './components/layouts/AuthLayout';
import './styles/App.scss';
import './styles/Auth.scss';

function App() {
  return (
    <div className="app__container">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedLayout />}>
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="*" element={<Navigate to="/statistics" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
