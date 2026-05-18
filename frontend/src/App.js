import React, { useState, useEffect, useCallback, useRef } from 'react';
import ALL_SONGS from './mockData';
import Sidebar from './components/Sidebar';
import SongGrid from './components/SongGrid';
import PlayerBar from './components/PlayerBar';
import YouTubeModal from './components/YouTubeModal';
import FavoritesPage from './components/FavoritesPage';
import Toast from './components/Toast';

function App() {
  const [view, setView]               = useState('home');     // 'home' | 'favorites'
  const [mood, setMood]               = useState('all');
  const [language, setLanguage]       = useState('all');
  const [search, setSearch]           = useState('');
  const [favorites, setFavorites]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('mt_favorites') || '[]'); } catch { return []; }
  });
  const [currentSong, setCurrentSong] = useState(null);
  const [modalSong, setModalSong]     = useState(null);       // song shown in YT modal
  const [toasts, setToasts]           = useState([]);
  const toastId = useRef(0);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem('mt_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filtered list
  const filtered = ALL_SONGS.filter(s => {
    if (mood !== 'all' && s.mood !== mood) return false;
    if (language !== 'all' && s.language !== language) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!s.name.toLowerCase().includes(q) && !s.artist.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const addToast = useCallback((msg, type = 'info') => {
    const id = ++toastId.current;
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2800);
  }, []);

  const playSong = useCallback((song) => {
    setCurrentSong(song);
    setModalSong(song);
  }, []);

  const toggleFav = useCallback((song) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === song.id);
      if (exists) {
        addToast(`Removed from favorites`, 'unfav');
        return prev.filter(f => f.id !== song.id);
      } else {
        addToast(`Added to favorites ♥`, 'fav');
        return [...prev, song];
      }
    });
  }, [addToast]);

  const isFav = useCallback((id) => favorites.some(f => f.id === id), [favorites]);

  // Navigate through songs inside modal
  const modalList = modalSong ? (view === 'favorites' ? favorites : filtered) : [];
  const modalIdx  = modalList.findIndex(s => s.id === modalSong?.id);
  const hasPrev   = modalIdx > 0;
  const hasNext   = modalIdx < modalList.length - 1;

  const goPrev = () => { if (hasPrev) { const s = modalList[modalIdx - 1]; setModalSong(s); setCurrentSong(s); } };
  const goNext = () => { if (hasNext) { const s = modalList[modalIdx + 1]; setModalSong(s); setCurrentSong(s); } };

  return (
    <div className="app-shell">
      <Sidebar
        view={view} setView={setView}
        mood={mood} setMood={setMood}
        language={language} setLanguage={setLanguage}
        favCount={favorites.length}
        allSongs={ALL_SONGS}
      />

      <main className="main-content">
        {view === 'favorites' ? (
          <FavoritesPage
            favorites={favorites}
            currentSong={currentSong}
            isFav={isFav}
            onPlay={playSong}
            onFav={toggleFav}
          />
        ) : (
          <SongGrid
            songs={filtered}
            currentSong={currentSong}
            isFav={isFav}
            onPlay={playSong}
            onFav={toggleFav}
            search={search}
            setSearch={setSearch}
          />
        )}
      </main>

      <PlayerBar
        song={currentSong}
        onOpenModal={() => currentSong && setModalSong(currentSong)}
        isFav={isFav}
        onFav={toggleFav}
      />

      {modalSong && (
        <YouTubeModal
          song={modalSong}
          isFav={isFav}
          onFav={toggleFav}
          onClose={() => setModalSong(null)}
          hasPrev={hasPrev} hasNext={hasNext}
          onPrev={goPrev} onNext={goNext}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}

export default App;
