import React from 'react';

const MOODS = [
  { id: 'all',   label: 'All Moods', emoji: '🎵' },
  { id: 'happy', label: 'Happy',     emoji: '😊', color: '#f7c46a', r:247, g:196, b:106 },
  { id: 'sad',   label: 'Sad',       emoji: '💙', color: '#6aaef7', r:106, g:174, b:247 },
  { id: 'party', label: 'Party',     emoji: '🎉', color: '#f76ca0', r:247, g:108, b:160 },
  { id: 'focus', label: 'Focus',     emoji: '🎯', color: '#6af7d4', r:106, g:247, b:212 },
];

const LANGUAGES = [
  { id: 'all',     label: 'All Languages', flag: '🌍' },
  { id: 'english', label: 'English',       flag: '🇬🇧' },
  { id: 'hindi',   label: 'Hindi',         flag: '🇮🇳' },
  { id: 'kannada', label: 'Kannada',       flag: '🌺' },
  { id: 'tamil',   label: 'Tamil',         flag: '🌴' },
  { id: 'telugu',  label: 'Telugu',        flag: '🌟' },
];

export default function Sidebar({ view, setView, mood, setMood, language, setLanguage, favCount, allSongs }) {
  const countFor = (lang) => lang === 'all' ? allSongs.length : allSongs.filter(s => s.language === lang).length;

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🎵</div>
        <h1>MoodTunes</h1>
      </div>

      <div className="sidebar-scroll">
        {/* Navigation */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Navigation</div>
          <button className={`nav-btn ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
            <span className="nav-icon">🏠</span> Discover
          </button>
          <button className={`nav-btn ${view === 'favorites' ? 'active' : ''}`} onClick={() => setView('favorites')}>
            <span className="nav-icon">❤️</span> Favorites
            {favCount > 0 && <span className="badge">{favCount}</span>}
          </button>
        </div>

        <div className="divider" />

        {/* Moods */}
        <div className="sidebar-section" style={{ marginTop: 12 }}>
          <div className="sidebar-section-label">Mood</div>
          <div className="mood-grid">
            {MOODS.map(m => (
              <button
                key={m.id}
                className={`mood-btn ${mood === m.id ? 'active' : ''}`}
                style={m.color ? { '--mood-color': m.color, '--mood-r': m.r, '--mood-g': m.g, '--mood-b': m.b } : {}}
                onClick={() => setMood(m.id)}
              >
                {m.emoji} {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="divider" />

        {/* Languages */}
        <div className="sidebar-section" style={{ marginTop: 12 }}>
          <div className="sidebar-section-label">Language</div>
          <div className="lang-list">
            {LANGUAGES.map(l => (
              <button
                key={l.id}
                className={`lang-btn ${language === l.id ? 'active' : ''}`}
                onClick={() => setLanguage(l.id)}
              >
                <span className="lang-flag">{l.flag}</span>
                {l.label}
                <span className="lang-count">{countFor(l.id)}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
