import React from 'react';
import SongCard from './SongCard';

export default function SongGrid({ songs, currentSong, isFav, onPlay, onFav, search, setSearch }) {
  const moodLabel = (m) => ({ all: 'All Songs', happy: '😊 Happy', sad: '💙 Sad', party: '🎉 Party', focus: '🎯 Focus' }[m] || m);

  return (
    <>
      <div className="topbar">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search songs or artists…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {search && (
          <button className="icon-btn" onClick={() => setSearch('')} title="Clear search">✕</button>
        )}
      </div>

      <div className="section-header">
        <h2 className="section-title">
          {search ? `Results for "${search}"` : 'Discover Music'}
        </h2>
        <span className="section-count">{songs.length} songs</span>
      </div>

      <div className="songs-area">
        {songs.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎵</div>
            <h3>No songs found</h3>
            <p>Try a different mood, language, or search term</p>
          </div>
        ) : (
          <div className="songs-grid">
            {songs.map(song => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={currentSong?.id === song.id}
                isFav={isFav(song.id)}
                onPlay={() => onPlay(song)}
                onFav={() => onFav(song)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
