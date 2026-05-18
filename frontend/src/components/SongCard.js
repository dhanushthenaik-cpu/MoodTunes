import React, { useState } from 'react';

export default function SongCard({ song, isPlaying, isFav, onPlay, onFav }) {
  const [imgErr, setImgErr] = useState(false);
  const fallback = `https://img.youtube.com/vi/${getVideoId(song.youtubeLink)}/mqdefault.jpg`;

  function getVideoId(url) {
    try {
      const u = new URL(url);
      return u.searchParams.get('v') || u.pathname.split('/').pop();
    } catch { return ''; }
  }

  return (
    <div className={`song-card ${isPlaying ? 'playing' : ''}`} onClick={onPlay}>
      <div className="card-thumb">
        <img
          src={imgErr ? fallback : song.thumbnail}
          alt={song.name}
          onError={() => setImgErr(true)}
          loading="lazy"
        />
        <div className="card-overlay">
          <div className="play-btn-overlay">
            {isPlaying ? '⏸' : '▶'}
          </div>
        </div>
        <span className={`mood-badge ${song.mood}`}>{song.mood}</span>
        <button
          className={`fav-btn-card ${isFav ? 'active' : ''}`}
          onClick={e => { e.stopPropagation(); onFav(); }}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="card-info">
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <p className="card-title" style={{ flex: 1 }}>{song.name}</p>
          {isPlaying && (
            <div className="playing-bars">
              <span /><span /><span />
            </div>
          )}
        </div>
        <p className="card-artist">{song.artist}</p>
      </div>
    </div>
  );
}
