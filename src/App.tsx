import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import GardenPage from './pages/GardenPage';
import HabitDetailPage from './pages/HabitDetailPage';
import ArtifactsPage from './pages/ArtifactsPage';
import LunarDashboardPage from './pages/LunarDashboardPage';
import SettingsPage from './pages/SettingsPage';
import OnboardingPage from './pages/OnboardingPage';
import AppShell from './components/layout/AppShell';

const App: React.FC = () => {
  const location = useLocation();


  return (
    <Routes>
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route
        path="/"
        element={
          <AppShell>
            <GardenPage />
          </AppShell>
        }
      />
      <Route
        path="/garden"
        element={
          <AppShell>
            <GardenPage />
          </AppShell>
        }
      />
      <Route
        path="/habit/:id"
        element={
          <AppShell>
            <HabitDetailPage />
          </AppShell>
        }
      />
      <Route
        path="/artifacts"
        element={
          <AppShell>
            <ArtifactsPage />
          </AppShell>
        }
      />
      <Route
        path="/lunar"
        element={
          <AppShell>
            <LunarDashboardPage />
          </AppShell>
        }
      />
      <Route
        path="/settings"
        element={
          <AppShell>
            <SettingsPage />
          </AppShell>
        }
      />
      <Route
        path="*"
        element={<Navigate to={location.pathname === '/' ? '/garden' : '/garden'} replace />}
      />
    </Routes>
  );
};

export default App;
