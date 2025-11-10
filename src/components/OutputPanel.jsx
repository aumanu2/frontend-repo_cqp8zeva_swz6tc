import React from 'react';
import { Copy, Flame, TrendingUp, Bookmark } from 'lucide-react';

export default function OutputPanel({ output, onCopy, favourites, onNavigate }) {
  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-200/80 flex items-center gap-2">
          <Flame size={18} className="text-cyan-400" /> Your best excuse
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button onClick={onCopy} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">
            <Copy size={14} /> Copy
          </button>
          <button onClick={() => onNavigate('trending')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">
            <TrendingUp size={14} /> Trending
          </button>
          <button onClick={() => onNavigate('favourites')} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700">
            <Bookmark size={14} /> Favourites ({favourites.length})
          </button>
        </div>
      </div>

      <div className="min-h-[120px] rounded-lg bg-slate-950/70 border border-white/10 p-4 text-slate-100 whitespace-pre-wrap">
        {output || 'Your generated excuse will appear here...'}
      </div>
    </div>
  );
}
