import React, { useState } from 'react';

function getVideoId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get('v') || u.pathname.split('/').pop();
  } catch { return ''; }
}

export default function PlayerBar({ song, onOpenModal, isFav, onFav }) {
  const [volume, setVolume] = useState(80);

  return (
    <div className="player-bar">
      {/* Left: song info */}
      <div className="player-song-info">
        {song ? (
          <>
            <img
              className="player-thumb"
              src={song.thumbnail}
              alt={song.name}
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="player-text">
              <div className="player-title">{song.name}</div>
              <div className="player-artist">{song.artist}</div>
            </div>
            {song && (
              <button
                style={{ background:'none', border:'none', fontSize:'1rem', cursor:'pointer', color: isFav(song.id) ? '#f76ca0' : '#5a5a7a', marginLeft: 8 }}
                onClick={() => onFav(song)}
                title={isFav(song.id) ? 'Remove from favorites' : 'Add to favorites'}
              >
                {isFav(song.id) ? '❤️' : '🤍'}
              </button>
            )}
          </>
        ) : (
          <>
            <div className="player-thumb-placeholder">🎵</div>
            <div className="player-text">
              <div className="player-title" style={{ color: 'var(--text-muted)' }}>Nothing playing</div>
              <div className="player-artist">Pick a song to play</div>
            </div>
          </>
        )}
      </div>

      {/* Center: controls */}
      <div className="player-controls">
        <button className="ctrl-btn play-main" onClick={onOpenModal} title="Open player">
          {song ? '▶' : '♫'}
        </button>
      </div>

      {/* Right: volume + YT link */}
      <div className="player-right">
        {song && (
          <a
            href={song.youtubeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="yt-link-btn"
          >
            ▶ Open on YouTube
          </a>
        )}
        <div className="volume-wrap">
          <span className="volume-icon">🔊</span>
          <input
            type="range" min="0" max="100"
            value={volume}
            onChange={e => setVolume(e.target.value)}
            className="volume-slider"
            title={`Volume: ${volume}%`}
            style={{
              background: `linear-gradient(to right, var(--accent) ${volume}%, var(--border) ${volume}%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
