
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Events from './screens/Events';
import EventDetail from './screens/EventDetail';
import Itinerary from './screens/Itinerary';
import Emergency from './screens/Emergency';
import About from './screens/About';
import MapView from './screens/MapView';
import Wellness from './screens/Hydration'; // Importamos Hydration como Wellness por consistencia

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="max-w-md mx-auto min-h-screen relative shadow-2xl overflow-x-hidden bg-background-dark">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/about" element={<About />} />
          <Route path="/hydration" element={<Wellness />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
