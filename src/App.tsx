import React from 'react';
import Films from './components/Films.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white text-center py-4">
        <h1 className="text-3xl font-bold">Studio Ghibli Codex</h1>
      </header>
      <main className="p-4">
        <Films />
      </main>
    </div>
  );
}

export default App;
