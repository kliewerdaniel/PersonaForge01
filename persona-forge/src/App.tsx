import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { usePersonaStore } from './store/personaStore';
import CreatePersonaPage from './pages/CreatePersonaPage';
import MyPersonasPage from './pages/MyPersonasPage';
import NotificationContainer from './components/NotificationToast';

function App() {
  const { resetPersona } = usePersonaStore();

  return (
    <div className="flex min-h-screen bg-neutral-200 font-sans text-neutral-500">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-neutral-100 p-md shadow-md flex flex-col">
        <h1 className="text-xl font-display font-bold text-primary mb-lg">PersonaForge</h1>
        <nav className="flex flex-col space-y-sm">
          <Link
            to="/create"
            onClick={resetPersona}
            className="p-sm rounded-md hover:bg-neutral-300 transition-colors text-left"
          >
            Create New Persona
          </Link>
          <Link to="/my-personas" className="p-sm rounded-md hover:bg-neutral-300 transition-colors">
            My Personas
          </Link>
          <Link to="/settings" className="p-sm rounded-md hover:bg-neutral-300 transition-colors">
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex">
        <Routes>
          <Route path="/" element={<CreatePersonaPage />} />
          <Route path="/create" element={<CreatePersonaPage />} />
          <Route path="/my-personas" element={<MyPersonasPage />} />
          {/* Future routes for Settings, etc. */}
          <Route path="*" element={
            <div className="p-lg text-center w-full">
              <h2 className="text-2xl font-display font-bold mb-lg">Page Not Found</h2>
              <p>The page you are looking for does not exist.</p>
              <Link to="/create" className="text-primary hover:underline mt-md block">Go to Create Persona</Link>
            </div>
          } />
        </Routes>
      </main>
      <NotificationContainer />
    </div>
  );
}

export default App;
