import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';

const DashboardPage = lazy(() => import('./pages/Dashboard'));
const SocietiesPage = lazy(() => import('./pages/Societies'));
const EventsPage = lazy(() => import('./pages/Events'));
const AiPage = lazy(() => import('./pages/Ai'));

function App() {
  const location = useLocation();

  return (
    <Layout>
      <Suspense fallback={<div className="p-8 text-sm text-slate-500">Loading...</div>}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/societies" element={<SocietiesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/ai" element={<AiPage />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </Layout>
  );
}

export default App;

