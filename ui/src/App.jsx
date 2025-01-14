import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const HomePage = lazy(() => import('./components/Home'));
const AboutPage = lazy(() => import('./components/About'));
const PageNotFound = lazy(() => import('./components/PageNotFound'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/PageNotFound" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
