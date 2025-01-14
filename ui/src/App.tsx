import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Lazy loading the components
const HomePage = lazy(() => import('./components/Home'));
const AboutPage = lazy(() => import('./components/About'));
const PageNotFound = lazy(() => import('./components/PageNotFound')); // Ensure correct casing in file names

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<PageNotFound />} />{' '}
          {/* Wildcard route for 404 */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
