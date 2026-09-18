import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import GamePage from './pages/GamePage';
import HistoryPage from './pages/HistoryPage';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<GamePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
    </div>
  );
}
