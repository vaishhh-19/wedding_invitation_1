import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { MapPin, Phone, Volume2, VolumeX, Sparkles, Heart, ChevronDown } from 'lucide-react';
import './styles.css';

const ASSET = '/assets/';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.14 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function Petals() {
  const petals = useMemo(() => Array.from({ length: 18 }, (_, i) => i), []);
  return <div className="petals" aria-hidden="true">
    {petals.map(i => <img key={i} src={ASSET + 'petal.svg'} style={{
      left: `${(i * 17) % 100}%`,
      animationDelay: `${(i * 1.7) % 8}s`,
      animationDuration: `${8 + (i % 5)}s`
    }} />)}
  </div>;
}

function Nav() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return <header className="nav">
    <button className="nav-link active" onClick={() => go('home')}>Home</button>
    <button className="nav-link" onClick={() => go('story')}>Story</button>
    <button className="nav-link" onClick={() => go('gallery')}>Gallery</button>
  </header>;
}

function Countdown() {
  const target = new Date('2026-11-26T18:00:00+05:30').getTime();
  const [time, setTime] = useState({days:59,hours:23,minutes:58,seconds:51});
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor(diff / 3600000) % 24,
        minutes: Math.floor(diff / 60000) % 60,
        seconds: Math.floor(diff / 1000) % 60
      });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <div className="countdown">
    {Object.entries(time).map(([key,val],i) => <React.Fragment key={key}>
      {i > 0 && <span className="divider">|</span>}
      <div><strong>{String(val).padStart(2,'0')}</strong><small>{key}</small></div>
    </React.Fragment>)}
  </div>;
}

function Hero() {
  return <section id="home" className="hero section">
    <div className="hero-flowers"></div>
    <div className="hero-lamps"></div>
    <div className="hero-inner reveal">
      <div className="ganesh">ॐ</div>
      <div className="eyebrow">Save the Date</div>
      <div className="ornament">⌁ ❧ ⌁</div>
      <h1>Aryan kapoor<br/><span>&</span><br/>Aarna Nair</h1>
      <div className="date-row"><span>NOV</span><b>26 & 27</b><span>2026</span></div>
      <p className="venue">Fiestaca Resort</p>
      <button className="pill-btn" onClick={() => window.open('https://maps.google.com/?q=Fiestaca+Resort','_blank')}>
        <MapPin size={24}/> Open in Maps
      </button>
      <img className="cartoon-couple hero-couple" src={ASSET + 'cartoon-couple.jpg'} />
    </div>
    <div className="lotus left"><img src={ASSET + 'lotus.jpg'} /></div>
    <div className="lotus right"><img src={ASSET + 'lotus-right.jpg'} /></div>
    <div className="hero-caption">Officially Husband and Wife in</div>
    <Countdown/>
  </section>;
}

function PersonCard({name, parents, text, image, reverse=false}) {
  return <section className={`person section ${reverse ? 'reverse' : ''}`}>
    <div className="person-card reveal">
      <div className="person-visual">
        <img src={ASSET + image} />
      </div>
      <div className="person-copy">
        <h2>{name}</h2>
        <h3>{parents}</h3>
        <p>{text}</p>
        <button className="outline-pill" onClick={() => document.getElementById('story').scrollIntoView({behavior:'smooth'})}>
          More About The Couple
        </button>
      </div>
    </div>
  </section>;
}

function Wishes() {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [sent, setSent] = useState(false);
  const submit = e => {
    e.preventDefault();
    if (!name || !wish) return;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setName(''); setWish('');
  };
  return <section className="wishes section">
    <div className="wish-shell reveal">
      <h2>Send your wishes</h2>
      <form onSubmit={submit}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your Name" />
        <div className="wish-area">
          <textarea value={wish} onChange={e=>setWish(e.target.value)} placeholder="Your Wishes" />
          <button type="button" className="sparkle" title="Add sparkle" onClick={() => setWish(v => v + (v ? ' ✨' : '✨'))}><Sparkles size={19}/></button>
        </div>
        <button className="pill-btn submit" type="submit">Submit</button>
      </form>
      {sent && <div className="toast"><Heart size={18} fill="currentColor"/> Wish sent with love!</div>}
    </div>
  </section>;
}

function Story() {
  return <section id="story" className="story section">
    <div className="story-heading reveal">
      <span>Our</span><h2>Beautiful Story</h2><span>begins here</span>
    </div>
    <div className="story-grid">
      <div className="story-photo reveal"><img src={ASSET+'groom.jpg'}/></div>
      <div className="story-text reveal">
        <span className="mini">Two hearts, one journey</span>
        <h2>From a moment to forever.</h2>
        <p>Some stories are written in books. Ours is written in little moments, quiet smiles, and a promise to choose each other every day.</p>
        <div className="heart-line">♡ ───────── ♡</div>
      </div>
      <div className="story-photo second reveal"><img src={ASSET+'bride.jpg'}/></div>
    </div>
  </section>;
}

function Gallery() {
  return <section id="gallery" className="gallery section">
    <div className="gallery-head reveal">
      <span>Memories</span><h2>Our Gallery</h2>
      <p>A few frames from the story we are creating together.</p>
    </div>
    <div className="gallery-grid">
      {['groom.jpg','bride.jpg','cartoon-couple.jpg'].map((x,i)=>
        <div className={`gallery-item reveal g${i}`} key={x}><img src={ASSET+x}/><span>{['Aryan','Aarna','Together'][i]}</span></div>
      )}
    </div>
  </section>;
}

function WishesDisplay() {
  return <section className="display-wishes section">
    <div className="maroon reveal">
      <h2>Wishes for the<br/>couple</h2>
      <div className="message-card">
        <h3>Priya</h3>
        <div className="ornament">⌁ ❧ ⌁</div>
        <p>Forever! May your marriage be filled with love that grows stronger each day, laughter that never fades, dreams that come true, and memories you will cherish forever.</p>
      </div>
    </div>
  </section>;
}

function FloatingControls({muted,setMuted}) {
  return <div className="floating">
    <button aria-label="Call"><Phone size={23} fill="white"/></button>
    <button aria-label="Toggle sound" onClick={()=>setMuted(!muted)}>{muted ? <VolumeX size={23}/> : <Volume2 size={23}/>}</button>
  </div>;
}

function App() {
  useReveal();
  const [muted,setMuted] = useState(true);
  return <div className="app">
    <Petals/>
    <Nav/>
    <main>
      <Hero/>
      <PersonCard name="Aryan kapoor" parents="S/o Mr. Rajesh Kapoor & Mrs. Meena Kapoor"
        text="A gentle soul with a poet's heart and an architect's mind — Aryan finds beauty in the details, whether in the curve of a building or the warmth of a quiet afternoon."
        image="groom.jpg"/>
      <PersonCard reverse name="Aarna Nair" parents="D/o Mr. Suresh Nair & Mrs. Lakshmi Nair"
        text="A free spirit wrapped in grace — Aarna moves through life with quiet confidence, an infectious laugh, and a kindness that makes everyone around her feel at home."
        image="bride.jpg"/>
      <Story/>
      <WishesDisplay/>
      <Wishes/>
      <Gallery/>
    </main>
    <footer><Heart size={17} fill="currentColor"/> Made with love for Aryan & Aarna <Heart size={17} fill="currentColor"/></footer>
    <FloatingControls muted={muted} setMuted={setMuted}/>
  </div>
}

createRoot(document.getElementById('root')).render(<App />);
