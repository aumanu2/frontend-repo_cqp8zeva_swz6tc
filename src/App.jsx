import React, { useMemo, useState } from 'react';
import Hero3D from './components/Hero3D.jsx';
import ControlPanel from './components/ControlPanel.jsx';
import ExcuseComposer from './components/ExcuseComposer.jsx';
import OutputPanel from './components/OutputPanel.jsx';
import SideMenu from './components/SideMenu.jsx';

function App() {
  // Core UI state
  const [mode, setMode] = useState('quick'); // 'quick' | 'profile'
  const [tone, setTone] = useState('plausible');
  const [agent, setAgent] = useState('auto');
  const [format, setFormat] = useState('auto');

  // Data state
  const [output, setOutput] = useState('');
  const [rating, setRating] = useState(0);
  const [favourites, setFavourites] = useState([]);
  const [trending, setTrending] = useState([
    'Running five mins behind — elevator decided to cosplay as a sloth. Be right there!',
    'Laptop ran an update without consent. Rebooting and joining in 3.',
    'Dog staged a pillow coup. Resolving the fluff uprising ASAP.',
  ]);
  const [hallOfFame] = useState([
    'Meteor shower of calendar invites — I’ll jump in as soon as the sky clears.',
    'The Wi‑Fi forgot the secret handshake. Negotiating terms with the router.',
  ]);

  // Profiles (for profile mode)
  const [profiles] = useState([
    { id: '1', name: 'Avery', role: 'Manager', context: 'Weekly sync about Q4 roadmap' },
    { id: '2', name: 'Sam', role: 'Partner', context: 'Dinner plans running late' },
  ]);
  const activeProfile = useMemo(() => (mode === 'profile' ? profiles[0] : null), [mode, profiles]);

  // Navigation & menu
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState('home'); // 'home' | 'favourites' | 'trending' | 'hall' | 'guide'

  // Handlers
  const handleGenerate = (text) => {
    setOutput(text);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output || '');
    } catch (e) {
      console.error('Copy failed:', e);
    }
  };

  const handleSaveFavourite = () => {
    if (!output) return;
    setFavourites((prev) => (prev.includes(output) ? prev : [output, ...prev]));
  };

  const handleRate = (value) => {
    setRating(value);
  };

  // Page sections
  const Home = () => (
    <div className="space-y-6">
      <Hero3D />

      <div className="flex items-center justify-between">
        <div className="text-slate-200/80 text-sm">Craft better alibis with style controls</div>
        <SideMenu open={menuOpen} setOpen={setMenuOpen} setPage={setPage} favourites={favourites} trending={trending} />
      </div>

      <ControlPanel
        mode={mode}
        setMode={setMode}
        agent={agent}
        setAgent={setAgent}
        tone={tone}
        setTone={setTone}
        format={format}
        setFormat={setFormat}
      />

      {mode === 'profile' && activeProfile && (
        <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 text-sm text-slate-200/80">
          <div className="font-semibold text-slate-100">Active profile</div>
          <div className="mt-1">{activeProfile.role}: {activeProfile.name}</div>
          <div className="text-slate-300/80">Context: {activeProfile.context}</div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ExcuseComposer
          mode={mode}
          tone={tone}
          format={format}
          agent={agent}
          activeProfile={activeProfile}
          onGenerate={handleGenerate}
          onSaveFavourite={handleSaveFavourite}
          onRate={handleRate}
        />
        <OutputPanel
          output={output}
          onCopy={handleCopy}
          favourites={favourites}
          onNavigate={(p) => setPage(p)}
        />
      </div>
    </div>
  );

  const FavouritesPage = () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold text-slate-100">Favourites</div>
      {favourites.length === 0 ? (
        <div className="text-slate-400">No favourites yet — generate and save your best lines.</div>
      ) : (
        <ul className="space-y-3">
          {favourites.map((f, i) => (
            <li key={i} className="bg-slate-900/60 border border-white/10 rounded-xl p-3 text-slate-200">{f}</li>
          ))}
        </ul>
      )}
    </div>
  );

  const TrendingPage = () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold text-slate-100">Trending</div>
      <ul className="space-y-3">
        {trending.map((t, i) => (
          <li key={i} className="bg-slate-900/60 border border-white/10 rounded-xl p-3 text-slate-200">{t}</li>
        ))}
      </ul>
    </div>
  );

  const HallPage = () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold text-slate-100">Hall of Fame</div>
      <ul className="space-y-3">
        {hallOfFame.map((t, i) => (
          <li key={i} className="bg-slate-900/60 border border-white/10 rounded-xl p-3 text-slate-200">{t}</li>
        ))}
      </ul>
    </div>
  );

  const GuidePage = () => (
    <div className="space-y-4">
      <div className="text-xl font-semibold text-slate-100">Excuse-making Guide</div>
      <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 text-slate-200/90">
        - Keep it short and human.
        <br />- Add a tiny, plausible detail.
        <br />- Match tone to audience.
        <br />- Don’t over-explain — confidence sells.
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-6">
        <header className="flex items-center justify-between">
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300">
            ExcuseAI
          </div>
          <nav className="flex items-center gap-2">
            <button onClick={() => setPage('home')} className={`px-3 py-2 rounded-lg text-sm ${page==='home'?'bg-slate-800 text-white':'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}>Home</button>
            <button onClick={() => setPage('favourites')} className={`px-3 py-2 rounded-lg text-sm ${page==='favourites'?'bg-slate-800 text-white':'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}>Favourites</button>
            <button onClick={() => setPage('trending')} className={`px-3 py-2 rounded-lg text-sm ${page==='trending'?'bg-slate-800 text-white':'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}>Trending</button>
            <button onClick={() => setPage('hall')} className={`px-3 py-2 rounded-lg text-sm ${page==='hall'?'bg-slate-800 text-white':'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}>Hall</button>
            <button onClick={() => setPage('guide')} className={`px-3 py-2 rounded-lg text-sm ${page==='guide'?'bg-slate-800 text-white':'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}>Guide</button>
          </nav>
        </header>

        {page === 'home' && <Home />}
        {page === 'favourites' && <FavouritesPage />}
        {page === 'trending' && <TrendingPage />}
        {page === 'hall' && <HallPage />}
        {page === 'guide' && <GuidePage />}

        <footer className="pt-8 text-center text-xs text-slate-400">
          Built with vibes. Dark mode by default.
        </footer>
      </div>
    </div>
  );
}

export default App;
