"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Brain,
  Heart,
  Sparkles,
  Stars,
} from "lucide-react";

const starters = [
  "What emotional pattern defines me most?",
  "Why do I overthink relationships?",
  "What career path suits my energy?",
  "What future phase am I entering?",
];

const aiResponses: Record<string, string> = {
  "What emotional pattern defines me most?": "Your palm patterns suggest emotional intensity beneath a calm surface. You appear selective with vulnerability and emotionally observant before committing trust.",
  "Why do I overthink relationships?": "Your reading indicates a strong need for emotional certainty before attachment. This often creates cycles of reflection and hesitation in relationships.",
  "What career path suits my energy?": "Independent and creative environments appear strongest for your energy signature. You perform best where intuition and ownership combine.",
  "What future phase am I entering?": "Your palm indicates transition energy — a period where identity, ambition, and emotional priorities are restructuring together.",
};

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "I’ve analyzed your palm patterns. Ask anything about your personality, emotional energy, relationships, or future direction.",
    },
  ]);

  const [input, setInput] = useState("");

  const suggestions = useMemo(() => starters.slice(0, 4), []);

  const handleSend = (message: string) => {
    if (!message.trim()) return;

    const response =
      aiResponses[message] ||
      "Your palm suggests strong intuition mixed with emotional depth. Current patterns point toward internal growth, emotional clarity, and self-driven ambition.";

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: message,
      },
      {
        role: "assistant",
        content: response,
      },
    ]);

    setInput("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(197,164,107,0.14),transparent_28rem)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-primary">
              AI Palm Companion
            </p>

            <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">
              Continue the reading
            </h1>
          </div>

          <div className="hidden md:grid size-14 place-items-center rounded-3xl bg-primary/10 text-primary md:grid">
            <Stars className="size-6" />
          </div>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-3">
          {suggestions.map((item, index) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => handleSend(item)}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm transition hover:border-primary/25 hover:bg-primary/10"
            >
              {item}
            </motion.button>
          ))}
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto pb-40">
          {messages.map((message, index) => {
            const isAssistant = message.role === "assistant";

            return (
              <motion.div
                key={`${message.role}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className={`flex ${
                  isAssistant ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-[2rem] border p-5 backdrop-blur-xl md:max-w-[70%] ${
                    isAssistant
                      ? "border-white/[0.08] bg-white/[0.04]"
                      : "border-primary/20 bg-primary/10"
                  }`}
                >
                  {isAssistant && (
                    <div className="mb-4 flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Sparkles className="size-4" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-primary">
                          Palm AI
                        </p>

                        <p className="text-xs text-muted-foreground">
                          Personality interpretation engine
                        </p>
                      </div>
                    </div>
                  )}

                  {!isAssistant && (
                    <div className="mb-4 flex items-center gap-3">
                      <div className="grid size-10 place-items-center rounded-2xl bg-white/10 text-white">
                        <Brain className="size-4" />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-white/90">
                          You
                        </p>
                      </div>
                    </div>
                  )}

                  <p className="text-sm leading-8 text-foreground/90 md:text-base">
                    {message.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-white/[0.08] bg-background/85 p-4 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-5xl items-end gap-3 rounded-[2rem] border border-white/[0.08] bg-white/[0.04] p-3">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Heart className="size-5" />
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your palm anything..."
              className="max-h-40 min-h-[56px] flex-1 resize-none bg-transparent px-2 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />

            <button
              onClick={() => handleSend(input)}
              className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary text-black transition hover:scale-[1.03]"
            >
              <ArrowUp className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
