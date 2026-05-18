import React from 'react';
import SongCard from './SongCard';

export default function FavoritesPage({ favorites, currentSong, isFav, onPlay, onFav }) {
  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h2>❤️ Your Favorites</h2>
        <p>{favorites.length} saved song{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💔</div>
          <h3>No favorites yet</h3>
          <p>Tap the heart on any song to save it here</p>
        </div>
      ) : (
        <div className="songs-grid">
          {favorites.map(song => (
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
  );
}
