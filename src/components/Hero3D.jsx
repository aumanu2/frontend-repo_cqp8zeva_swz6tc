import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero3D() {
  return (
    <div className="relative w-full h-[48vh] md:h-[56vh] lg:h-[64vh] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-black">
      <Spline
        scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
      {/* Iridescent glow overlays */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-fuchsia-500/30"
          animate={{
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl bg-cyan-500/30"
          animate={{
            x: [0, -10, 15, 0],
            y: [0, 12, -8, 0],
            scale: [1, 1.08, 1, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <motion.h1
          className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 drop-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ExcuseAI
        </motion.h1>
        <motion.p
          className="mt-3 max-w-2xl text-sm md:text-base text-slate-200/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Your holographic wingman for believable, bold, and brilliantly funny alibis.
        </motion.p>
      </div>
    </div>
  );
}
