import React, { useEffect } from 'react';
import { useSavedPersonasStore } from '../store/savedPersonasStore';
import { usePersonaStore } from '../store/personaStore';
import { useNotificationStore } from '../store/notificationStore';
import { Link } from 'react-router-dom';

const MyPersonasPage: React.FC = () => {
  const { personas, fetchPersonas, isLoading, error, deletePersona } = useSavedPersonasStore();
  const { loadPersona, resetPersona } = usePersonaStore();
  const { addNotification } = useNotificationStore();

  useEffect(() => {
    fetchPersonas();
  }, [fetchPersonas]);

  const handleEditPersona = (personaId: string) => {
    const personaToLoad = personas.find(p => p.id === personaId);
    if (personaToLoad) {
      loadPersona(personaToLoad);
      addNotification(`Loaded persona '${personaToLoad.name}' for editing.`, 'info');
      // Navigate to create page (handled by Link in App.tsx)
    } else {
      addNotification('Persona not found!', 'error');
    }
  };

  const handleDeletePersona = (personaId: string, personaName: string) => {
    if (window.confirm(`Are you sure you want to delete persona '${personaName}'?`)) {
      deletePersona(personaId);
      addNotification(`Persona '${personaName}' deleted.`, 'success');
    }
  };

  if (isLoading) {
    return (
      <div className="p-lg text-center w-full">
        <h2 className="text-2xl font-display font-bold mb-lg">My Personas</h2>
        <p>Loading personas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-lg text-center w-full text-error">
        <h2 className="text-2xl font-display font-bold mb-lg">Error Loading Personas</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-lg flex-1">
      <h2 className="text-2xl font-display font-bold mb-lg">My Personas</h2>
      {personas.length === 0 ? (
        <div className="bg-neutral-100 p-md rounded-md shadow-md text-center">
          <p className="mb-md">You haven't saved any personas yet.</p>
          <Link to="/create" className="text-primary hover:underline" onClick={resetPersona}>
            Create your first persona!
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {personas.map((persona) => (
            <div key={persona.id} className="bg-neutral-100 p-md rounded-md shadow-md flex flex-col">
              <h3 className="text-lg font-display font-bold text-primary mb-sm">{persona.name}</h3>
              <p className="text-sm text-neutral-500 mb-xs line-clamp-2">{persona.description || 'No description.'}</p>
              <p className="text-xs text-neutral-400 mb-md">Last Modified: {new Date(persona.metadata?.lastModified || '').toLocaleDateString()}</p>
              <div className="flex space-x-sm mt-auto">
                <Link
                  to="/create"
                  onClick={() => handleEditPersona(persona.id)}
                  className="flex-1 py-sm px-md rounded-md bg-primary text-white text-center text-sm font-semibold hover:bg-secondary transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeletePersona(persona.id, persona.name)}
                  className="flex-1 py-sm px-md rounded-md bg-error text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPersonasPage;
