import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CreateInterview from './pages/CreateInterview';
import EditInterview from './pages/EditInterview';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateInterview />} />
          <Route path="edit/:id" element={<EditInterview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;