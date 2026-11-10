import React, { useState } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { Blessing } from '../types/wedding';
import { INITIAL_BLESSINGS } from '../data/weddingData';

interface BlessingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlessingsModal: React.FC<BlessingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [blessings, setBlessings] = useState<Blessing[]>(INITIAL_BLESSINGS);
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const emojis = ['🪔', '🌸', '✨', '🌺', '🕉️', '💍'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const newBlessing: Blessing = {
      id: Date.now().toString(),
      author: author.trim(),
      relation: relation.trim() || 'Well-wisher',
      message: message.trim(),
      timestamp: 'Just now',
      blessingEmoji: randomEmoji,
    };

    setBlessings([newBlessing, ...blessings]);
    setAuthor('');
    setRelation('');
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#faf3e3] rounded-3xl border-2 border-[#d2aa53] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parchment-texture.webp')` }}
        />

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-5 pb-3 border-b border-[#e2cca3] flex items-center justify-between text-center bg-[#fdfaf2]/80">
          <div>
            <p className="font-devanagari text-[#881c22] text-[12px] font-semibold tracking-wider">
              || शुभाशीर्वाद ||
            </p>
            <h2 className="font-display italic text-[#821c21] text-2xl font-bold">
              Blessings &amp; Wishes
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6c4328] hover:text-[#881c22] hover:bg-[#f1e3c8] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-10 px-6 py-5 overflow-y-auto space-y-4">
          {/* Write a Blessing Form */}
          <form onSubmit={handleSubmit} className="p-4 rounded-2xl bg-[#fdfbf6] border border-[#d2aa53] space-y-2.5">
            <h3 className="font-marcellus text-xs uppercase tracking-wider text-[#821c21] font-bold flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#821c21]" />
              <span>Leave Your Sacred Blessing</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#fdfaf2] rounded-xl border border-[#d2aa53] text-[#3c2314] focus:outline-none focus:ring-1 focus:ring-[#821c21]"
              />
              <input
                type="text"
                placeholder="Relation (e.g. Cousin, Elder)"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="px-3 py-1.5 text-xs bg-[#fdfaf2] rounded-xl border border-[#d2aa53] text-[#3c2314] focus:outline-none focus:ring-1 focus:ring-[#821c21]"
              />
            </div>

            <textarea
              required
              rows={2}
              placeholder="Write your auspicious prayers and wishes for Anirudh & Vaidehi..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-1.5 text-xs bg-[#fdfaf2] rounded-xl border border-[#d2aa53] text-[#3c2314] focus:outline-none focus:ring-1 focus:ring-[#821c21]"
            />

            <button
              type="submit"
              className="w-full py-2 bg-[#821c21] hover:bg-[#6c1419] text-[#faf2e3] font-semibold text-xs rounded-full shadow-md transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Blessing</span>
            </button>
          </form>

          {/* List of Blessings */}
          <div className="space-y-2.5">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-[#fdfbf6] border border-[#ecdcb8] space-y-1 relative"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-base">{b.blessingEmoji}</span>
                    <span className="font-marcellus text-[#3c2314] font-bold text-xs">
                      {b.author}
                    </span>
                    <span className="text-[10px] text-[#8c5a35] font-medium bg-[#f5e7cf] px-2 py-0.5 rounded-full">
                      {b.relation}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#a07452]">{b.timestamp}</span>
                </div>
                <p className="font-body text-xs text-[#4b2d1a] leading-relaxed italic pl-6">
                  &ldquo;{b.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
