import React, { useMemo, useState } from 'react';
import { Sparkles, Shuffle, Send, Heart, Star } from 'lucide-react';

const quickCategories = ['General', 'Romantic', 'Work', 'Homework', 'Family', 'Lazy'];

function craftPrompt({ input, category, tone, format, agent, profile }) {
  const base = `Create a concise, human-like excuse`;
  const toneLine = `Believability: ${tone}.`;
  const formatLine = `Format: ${format}.`;
  const agentLine = `Style inspiration agent: ${agent}.`;
  const profileLine = profile ? `Recipient profile: ${profile.role} named ${profile.name}. Context: ${profile.context || 'none'}.` : '';
  const categoryLine = category ? `Category: ${category}.` : '';
  const extra = `Make it natural, include subtle details, avoid over-explaining. Provide a single message suitable for the format.`;
  const user = input ? `User specifics: ${input}` : '';
  return [base, toneLine, formatLine, agentLine, categoryLine, profileLine, user, extra].filter(Boolean).join('\n');
}

export default function ExcuseComposer({ mode, tone, format, agent, activeProfile, onGenerate, onSaveFavourite, onRate }) {
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('General');
  const [rating, setRating] = useState(0);

  const prompt = useMemo(() => craftPrompt({ input, category: mode==='quick'?category:null, tone, format, agent, profile: mode==='profile'?activeProfile:null }), [input, category, tone, format, agent, activeProfile, mode]);

  function handleGenerate() {
    const mock = generateLocalExcuse({ prompt, tone, format, category, profile: activeProfile });
    onGenerate(mock);
  }

  function generateLocalExcuse({ prompt: p, tone: t, format: f, category: c, profile }) {
    // Lightweight local generator for demo UX; backend can replace later
    const starters = {
      professional: ['Quick heads-up —', 'Just looping you in —', 'Small snag —'],
      plausible: ['Sooo, funny thing —', 'Real talk —', 'Long story short —'],
      bold: ['Okay, you won’t believe this —', 'Plot twist —', 'Chaos mode:'],
      chaotic: ['Confession time:', 'Absolute mayhem:', 'Please don’t laugh:'],
    };
    const s = starters[t] || starters.plausible;
    const endings = [
      'my internet did a dramatic exit mid-sync. I’m at a cafe rebooting life and Wi‑Fi. Can we push by 45 minutes?',
      'the dog sitter double-booked and my corgi unionized. Handling it now — can we regroup after lunch?',
      'I’m awaiting a verification code that’s playing hide and seek. I’ll send the thing as soon as it lands.',
      'calendar glitched and stacked two calls. I’ll jump in right after this wraps — promise.',
    ];
    const formats = {
      email: (txt) => `Subject: Quick timing issue\n\n${txt}\n\nBest,`,
      sms: (txt) => txt,
      dm: (txt) => txt,
      group: (txt) => txt + ' — thanks all!',
      call: (txt) => txt,
      verbal: (txt) => txt,
      auto: (txt) => txt,
    };
    const body = `${s[Math.floor(Math.random()*s.length)]} ${endings[Math.floor(Math.random()*endings.length)]}`;
    const fmt = formats[f] || formats.auto;
    return fmt(body);
  }

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-200/80">Compose your excuse</div>
        <div className="flex items-center gap-2 text-xs text-slate-300/70">
          <Sparkles size={16} /> Smart Assist
        </div>
      </div>

      {mode === 'quick' && (
        <div className="flex flex-wrap gap-2">
          {quickCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-2 rounded-lg text-sm transition ${category === c ? 'bg-gradient-to-r from-cyan-500/40 to-fuchsia-500/40 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'profile' ? 'Add context or constraints for this recipient...' : 'Describe your situation or tap Shuffle for a quick idea...'}
        className="min-h-[120px] rounded-lg bg-slate-950/70 border border-white/10 p-3 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      />

      <div className="flex flex-wrap items-center gap-2">
        <button onClick={handleGenerate} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition text-white">
          <Send size={16} /> Generate
        </button>
        <button onClick={() => setInput('')} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-slate-200">
          <Shuffle size={16} /> Shuffle idea
        </button>
        <div className="ml-auto flex items-center gap-1">
          {[1,2,3,4,5].map((i) => (
            <button
              key={i}
              onClick={() => { setRating(i); onRate?.(i); }}
              className={`p-1 ${i <= rating ? 'text-yellow-400' : 'text-slate-500 hover:text-slate-300'}`}
              aria-label={`Rate ${i}`}
            >
              <Star size={18} fill={i <= rating ? 'currentColor' : 'none'} />
            </button>
          ))}
          <button onClick={onSaveFavourite} className="ml-2 inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-pink-600/80 hover:bg-pink-500 text-white">
            <Heart size={16} /> Favourite
          </button>
        </div>
      </div>

      <details className="bg-slate-950/40 rounded-lg p-3 border border-white/5">
        <summary className="text-xs text-slate-400 cursor-pointer">Prompt preview</summary>
        <pre className="mt-2 text-[11px] text-slate-300/80 whitespace-pre-wrap">{prompt}</pre>
      </details>
    </div>
  );
}
