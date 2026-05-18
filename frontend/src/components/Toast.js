import React from 'react';

const icons = { fav: '❤️', unfav: '🤍', play: '▶️', info: 'ℹ️' };

export default function Toast({ toasts }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span>{icons[t.type] || '🎵'}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
