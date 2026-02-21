import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface GuestbookPost {
  name: string;
  message: string;
}

function App() {
  const [posts, setPosts] = useState<GuestbookPost[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('DATA'); 
  
  // PLACE IT HERE (Line 15)
  // This uses your Vercel setting first, then falls back to your working Codespace link.
  const API_URL = ((import.meta as any).env.VITE_API_URL as string) || "https://verbose-tribble-77rgq99qq9v3g5v-3000.app.github.dev/guestbook";

  const MAX_LENGTH = 200;
  const BANNED_WORDS = ['badword1', 'spam', 'junk']; 

  const clickSound = new Audio('https://www.soundjay.com/buttons/button-16.mp3'); 
  const humSound = useRef(new Audio('https://www.soundjay.com/free-music/iron-man-humming-loop.mp3'));

  const fetchPosts = async () => {
    if (!API_URL) return;
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) { 
      console.error("Fetch Error:", err); 
    }
  };

  useEffect(() => {
    fetchPosts();
    humSound.current.loop = true;
    humSound.current.volume = 0.05;
  }, []);

  const playClick = () => {
    clickSound.currentTime = 0;
    clickSound.volume = 0.2;
    clickSound.play().catch(() => {}); 
  };

  const startHum = () => {
    humSound.current.play().catch(() => {});
  };

  const isInvalid = () => {
    const hasBanned = BANNED_WORDS.some(word => message.toLowerCase().includes(word));
    return (
      name.trim().length === 0 || 
      message.trim().length === 0 || 
      message.length > MAX_LENGTH || 
      hasBanned
    );
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isInvalid() || !API_URL) return;
    playClick();
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      setName('');
      setMessage('');
      fetchPosts();
    } catch (err) { console.error("Upload Error:", err); }
  };

  return (
    <div className="container" onClick={startHum}>
      <div className="scanline"></div>
      
      <header>
        <h1>ROBCO INDUSTRIES</h1>
        <p className="subtitle">UNIFIED OPERATING SYSTEM // GUEST_LOG_v4.0.2</p>
      </header>

      <nav className="pipboy-nav">
        <button 
          className={activeTab === 'STAT' ? 'active' : ''} 
          onClick={() => { setActiveTab('STAT'); playClick(); }}
        > STAT </button>
        <button 
          className={activeTab === 'DATA' ? 'active' : ''} 
          onClick={() => { setActiveTab('DATA'); playClick(); }}
        > DATA </button>
        <button 
          className={activeTab === 'MAP' ? 'active' : ''} 
          onClick={() => { setActiveTab('MAP'); playClick(); }}
        > MAP </button>
      </nav>

      <div className="screen-content">
        {activeTab === 'STAT' && (
          <div className="stat-screen animate-fade">
            <div className="vault-boy-container">
              <img 
                src="/vaultboy_animated.gif" 
                alt="Vault Boy Status" 
                className="vault-boy-img"
              />
              <div className="stats-overlay">
                <p className="typing-text">&gt; USER: ALEKSEJ HAMER</p>
                <p>&gt; LVL 24 [WEBPROG]</p>
                <p>&gt; CND [ EXCELLENT ]</p>
              </div>
            </div>
            
            <div className="special-list">
              <p>&gt; S.P.E.C.I.A.L.</p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <li>S:5</li><li>P:7</li><li>E:6</li><li>C:8</li><li>I:9</li><li>A:5</li><li>L:7</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'DATA' && (
          <div className="animate-fade">
            <div className="form-card">
              <form onSubmit={handleUpload}>
                <input 
                  placeholder="[ ENTER USERNAME ]" 
                  value={name} 
                  onChange={(e) => { setName(e.target.value); playClick(); }} 
                  required 
                />
                <div style={{ position: 'relative' }}>
                  <textarea 
                    placeholder="[ ENTER MESSAGE DATA ]" 
                    value={message} 
                    onChange={(e) => { setMessage(e.target.value); playClick(); }} 
                    required 
                    rows={3}
                  />
                  <span className="char-count" style={{ color: message.length > MAX_LENGTH ? '#ff0000' : 'inherit' }}>
                    {message.length}/{MAX_LENGTH}
                  </span>
                </div>
                <button 
                  type="submit" 
                  disabled={isInvalid()}
                  onMouseEnter={() => !isInvalid() && playClick()}
                >
                  {isInvalid() ? "_ACCESS_DENIED_" : "_UPLOAD_DATA_"}
                </button>
              </form>
            </div>

            <div className="posts-list">
              <p style={{ borderBottom: '1px solid #26ff26' }} className="typing-text">
                &gt; RETRIEVING ARCHIVED_LOGS...
              </p>
              {[...posts].reverse().map((post, index) => (
                <div key={index} className="post-card" onMouseEnter={playClick}>
                  <div className="user-name">&gt; USER: {post.name.toUpperCase()}</div>
                  <p className="post-text">{post.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'MAP' && (
          <div className="map-screen animate-fade">
            <p className="typing-text">&gt; LOCAL MAP: PASAY_CITY_WASTELAND</p>
            <div className="map-placeholder">
              <p>[ NO SIGNAL ]</p>
              <p>RECONNECTING TO VAULT-TEC SATELLITE...</p>
            </div>
            <p>&gt; OBJECTIVE: SUBMIT FINAL WEBPROG PROJECT</p>
          </div>
        )}
      </div>
      <footer className="vault-footer">
        <p>© 2026 VAULT-TEC INDUSTRIES // PROPERTY OF HAMER & OCHOA</p>
      </footer>
    </div>
  );
}

export default App;