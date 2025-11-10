import React from 'react';
import { Menu, Heart, Sparkles, Crown, BookOpen } from 'lucide-react';

export default function SideMenu({ open, setOpen, setPage, favourites, trending }) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-white/10 text-slate-200 hover:bg-slate-800"
      >
        <Menu size={18} /> Menu
      </button>

      {open && (
        <div className="absolute mt-2 w-64 right-0 z-20 bg-slate-900/95 border border-white/10 rounded-xl shadow-xl p-2 backdrop-blur">
          <div className="text-xs uppercase tracking-wider text-slate-300/70 px-2 py-1">Navigator</div>
          <nav className="flex flex-col">
            <button onClick={() => { setPage('favourites'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
              <Heart size={16} className="text-pink-400" /> Favourites <span className="ml-auto text-xs text-slate-400">{favourites.length}</span>
            </button>
            <button onClick={() => { setPage('trending'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
              <Sparkles size={16} className="text-cyan-400" /> Trending <span className="ml-auto text-xs text-slate-400">{trending.length}</span>
            </button>
            <button onClick={() => { setPage('hall'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
              <Crown size={16} className="text-amber-300" /> Hall of Fame
            </button>
            <button onClick={() => { setPage('guide'); setOpen(false); }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200">
              <BookOpen size={16} className="text-violet-300" /> Excuse-making Guide
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
