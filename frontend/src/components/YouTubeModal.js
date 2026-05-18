import React, { useEffect, useCallback } from 'react';

function getVideoId(url) {
  try {
    const u = new URL(url);
    return u.searchParams.get('v') || u.pathname.split('/').pop();
  } catch { return ''; }
}

export default function YouTubeModal({ song, isFav, onFav, onClose, hasPrev, hasNext, onPrev, onNext }) {
  const videoId = getVideoId(song.youtubeLink);

  // Close on Escape key
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft' && hasPrev) onPrev();
    if (e.key === 'ArrowRight' && hasNext) onNext();
  }, [onClose, hasPrev, hasNext, onPrev, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const moodEmoji = { happy: '😊', sad: '💙', party: '🎉', focus: '🎯' };

  return (
    <div className="yt-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="yt-modal">
        {/* Header */}
        <div className="yt-modal-header">
          <span className={`mood-badge ${song.mood} modal-mood`}>
            {moodEmoji[song.mood]} {song.mood}
          </span>
          <div className="song-meta">
            <div className="modal-title">{song.name}</div>
            <div className="modal-artist">{song.artist}</div>
          </div>
          <button className="close-modal-btn" onClick={onClose} title="Close (Esc)">✕</button>
        </div>

        {/* YouTube Embed */}
        <div className="yt-embed-wrap">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={song.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'#000', color:'#fff', fontSize:'0.9rem' }}>
              Could not load video. <a href={song.youtubeLink} target="_blank" rel="noopener noreferrer" style={{ color:'#ff4444', marginLeft:8 }}>Open on YouTube ↗</a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="yt-modal-footer">
          <div className="yt-nav-btns">
            <button className="yt-nav-btn" disabled={!hasPrev} onClick={onPrev} title="Previous song (←)">
              ← Prev
            </button>
            <button className="yt-nav-btn" disabled={!hasNext} onClick={onNext} title="Next song (→)">
              Next →
            </button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className={`fav-modal-btn ${isFav(song.id) ? 'active' : ''}`}
              onClick={() => onFav(song)}
            >
              {isFav(song.id) ? '❤️ Saved' : '🤍 Save'}
            </button>
            <a
              href={song.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-link-btn"
            >
              ▶ YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
