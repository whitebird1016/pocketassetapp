import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Error from '../components/pages/Error';

export const GlobalRoutes = () => (
  <Routes>
    <Route path="page-not-found" element={<Error statusCode={404} />} />
    <Route path="server-error" element={<Error statusCode={500} />} />
  </Routes>
);