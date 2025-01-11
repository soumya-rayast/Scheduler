import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';

// react lazy components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CreateInterview = lazy(() => import('./pages/CreateInterview'));
const EditInterview = lazy(() => import('./pages/EditInterview'));

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Suspense fallback={<div className='flex items-center justify-center mt-20'>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="create" element={<CreateInterview />} />
            <Route path="edit/:id" element={<EditInterview />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
