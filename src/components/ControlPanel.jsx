import React from 'react';
import { Sparkles, Star, Flame, Mail, Phone, MessageSquare, Mic, Users } from 'lucide-react';

const agentOptions = [
  { key: 'auto', label: 'Auto', icon: Sparkles },
  { key: 'chatgpt', label: 'ChatGPT', icon: Star },
  { key: 'gemini', label: 'Gemini', icon: Flame },
  { key: 'claude', label: 'Claude Haiku', icon: Sparkles },
];

const toneOptions = [
  { key: 'professional', label: 'Professional' },
  { key: 'plausible', label: 'Plausible' },
  { key: 'bold', label: 'Bold' },
  { key: 'chaotic', label: 'Chaotic Comedy' },
];

const formatOptions = [
  { key: 'auto', label: 'Auto Detect', icon: Sparkles },
  { key: 'verbal', label: 'Verbal', icon: Mic },
  { key: 'dm', label: 'Personal Chat', icon: MessageSquare },
  { key: 'group', label: 'Group Chat', icon: Users },
  { key: 'call', label: 'Call', icon: Phone },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'sms', label: 'SMS', icon: MessageSquare },
];

export default function ControlPanel({ mode, setMode, agent, setAgent, tone, setTone, format, setFormat }) {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
        <div className="text-xs uppercase tracking-wider text-slate-300/70 mb-2">Mode</div>
        <div className="flex gap-2">
          {['Quick', 'Profile'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m.toLowerCase())}
              className={`px-3 py-2 rounded-lg text-sm transition ${mode === m.toLowerCase() ? 'bg-slate-800 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
        <div className="text-xs uppercase tracking-wider text-slate-300/70 mb-2">Believability</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {toneOptions.map((t) => (
            <button
              key={t.key}
              onClick={() => setTone(t.key)}
              className={`px-3 py-2 rounded-lg text-sm transition ${tone === t.key ? 'bg-gradient-to-r from-cyan-500/40 to-fuchsia-500/40 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
        <div className="text-xs uppercase tracking-wider text-slate-300/70 mb-2">Agent & Format</div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-wrap gap-2">
            {agentOptions.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setAgent(key)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition ${agent === key ? 'bg-slate-800 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {formatOptions.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setFormat(key)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition ${format === key ? 'bg-slate-800 text-white' : 'bg-slate-800/40 text-slate-300 hover:bg-slate-800/60'}`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
