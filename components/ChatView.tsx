"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, useToast } from "@fidelity-imagina/ui";
import { AvaMark } from "@/components/AvaMark";
import { ItemDetail } from "@/components/ItemDetail";
import { ITEMS, cat, find, fmt, overdue, type Item } from "@/lib/knowledge";
import { introSeen } from "@/lib/introSeen";

type Msg = { role: "user"; text: string } | { role: "ai"; hits: string[] };
interface Chat { id: string; title: string; updated: number; messages: Msg[] }

// History stays in the browser; if storage is blocked it lives in memory for the visit.
const KEY = "ava-chats-v2";
const store = {
  get(): Chat[] {
    try { const s = localStorage.getItem(KEY); return s ? (JSON.parse(s) as Chat[]) : []; } catch { return []; }
  },
  set(chats: Chat[]) {
    try { localStorage.setItem(KEY, JSON.stringify(chats)); } catch { /* memory only */ }
  },
};

const when = (ts: number) => {
  const a = new Date(ts), b = new Date();
  if (a.toDateString() === b.toDateString()) return "Today";
  if (new Date(b.getTime() - 86400000).toDateString() === a.toDateString()) return "Yesterday";
  return a.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
};

const byTitle = (titles: string[]) => titles.map((t) => ITEMS.find((x) => x.title === t)).filter((x): x is Item => !!x);

/** How an answer is shown: still checking, words arriving, or already settled (an opened chat). */
type Mode = "thinking" | "streaming" | "static";

export function ChatView({ firstName, initialQuestion }: { firstName: string; initialQuestion?: string }) {
  const router = useRouter();
  const toast = useToast();
  const [chats, setChats] = useState<Chat[]>([]);
  const [curId, setCurId] = useState<string | null>(null);
  const [live, setLive] = useState<{ idx: number; mode: "thinking" | "streaming" } | null>(null);
  const [panel, setPanel] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [ready, setReady] = useState(false);
  const thread = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const asked = useRef(false);

  const cur = chats.find((c) => c.id === curId) ?? null;
  const busy = live !== null;

  const scrollDown = useCallback(() => {
    const t = thread.current;
    if (t) t.scrollTop = t.scrollHeight;
  }, []);

  /* Sources are numbered across the whole chat, so a citation in a later answer never reuses a number. */
  const { sources, bases } = useMemo(() => {
    const sources: Item[] = [];
    const bases: Record<number, number> = {};
    cur?.messages.forEach((m, i) => {
      if (m.role !== "ai") return;
      bases[i] = sources.length;
      sources.push(...byTitle(m.hits));
    });
    return { sources, bases };
  }, [cur]);

  const save = useCallback((next: Chat[]) => { setChats(next); store.set(next); }, []);

  const ask = useCallback((raw: string) => {
    const q = raw.trim();
    if (!q || busy) return;
    const hits = find(q).map((h) => h.title);
    const messages: Msg[] = [...(cur?.messages ?? []), { role: "user", text: q }, { role: "ai", hits }];
    const chat: Chat = cur
      ? { ...cur, messages, updated: Date.now() }
      : { id: "c" + Date.now(), title: q.length > 52 ? q.slice(0, 50) + "…" : q, updated: Date.now(), messages };
    save([chat, ...chats.filter((c) => c.id !== chat.id)]);
    setCurId(chat.id);
    setPanel(null);
    setText("");
    setLive({ idx: messages.length - 1, mode: "thinking" });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => setLive((l) => (l ? { ...l, mode: "streaming" } : l)), reduce ? 0 : 900);
  }, [busy, chats, cur, save]);

  /* First load: history from the browser, the first-visit introduction, and a question handed over from the brain page. */
  useEffect(() => {
    if (!initialQuestion && !introSeen.get()) { router.replace("/intro"); return; }
    let stale = false;
    queueMicrotask(() => { if (stale) return; setChats(store.get()); setReady(true); });
    return () => { stale = true; };
    // Once, on arrival: clearing ?ask= after the question is asked must not re-run the first-visit check.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready || !initialQuestion || asked.current) return;
    asked.current = true;
    ask(initialQuestion);
    router.replace("/");
  }, [ready, initialQuestion, ask, router]);

  useEffect(() => { scrollDown(); }, [cur?.messages.length, live?.mode, scrollDown]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPanel(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => {
    const el = field.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 132) + "px";
  }, [text]);

  const start = () => { if (busy) return; setCurId(null); setPanel(null); };
  const open = (id: string) => { if (busy) return; setCurId(id); setPanel(null); if (thread.current) thread.current.scrollTop = 0; };
  const remove = (id: string) => {
    if (busy) return;
    save(chats.filter((c) => c.id !== id));
    if (curId === id) setCurId(null);
    toast({ kind: "info", label: "Deleted", message: "That chat is gone." });
  };

  if (!ready) return null;

  return (
    <div className="chat-app">
      <aside className="rail" aria-label="Your chats">
        <Button variant="ghost" className="rail__new" onClick={start}><span>New chat</span><span aria-hidden="true">+</span></Button>
        <div>
          <span className="label">Your chats</span>
          <div className="hist">
            {chats.length === 0 && <p className="meta hist__empty">Your chats will show up here.</p>}
            {chats.map((c) => {
              const n = c.messages.filter((m) => m.role === "user").length;
              const on = c.id === curId;
              return (
                <div key={c.id} className={`chat-row${on ? " on" : ""}`}>
                  <button className="chat-row__btn" onClick={() => open(c.id)} aria-current={on ? "true" : undefined}>
                    <span className="chat-row__t">{c.title}</span>
                    <span className="meta">{when(c.updated)} &middot; {n} {n === 1 ? "question" : "questions"}</span>
                  </button>
                  <button className="chat-row__x" onClick={() => remove(c.id)} aria-label={`Delete chat: ${c.title}`}>&times;</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rail__foot">
          <span className="meta">Sample knowledge for now &middot; not real answers yet</span>
        </div>
      </aside>

      <section id="main" className="chat">
        <div className="thread" ref={thread}>
          <div className="col">
            {!cur && (
              <>
                <div className="rise" style={{ "--i": 0 } as React.CSSProperties}><AvaMark large /></div>
                <h1 className="hero-title rise" style={{ "--i": 1, maxWidth: "none" } as React.CSSProperties}>Hi, {firstName}.</h1>
                <p className="lede rise" style={{ "--i": 2 } as React.CSSProperties}>What would you like to know? Ask me anything about how imagina thinks, works and builds.</p>
                <div className="notes rise" style={{ "--i": 3, marginTop: 24 } as React.CSSProperties}>
                  <button className="link" onClick={() => router.push("/brain")}>See what&apos;s in my brain</button>
                </div>
              </>
            )}
            {cur?.messages.map((m, i) => {
              if (m.role === "user") {
                return (
                  <div key={i} className={`msg msg--user${live && i === live.idx - 1 ? " rise" : ""}`}>
                    <span className="label">You</span>
                    <div className="body">{m.text}</div>
                  </div>
                );
              }
              const mode: Mode = live?.idx === i ? live.mode : "static";
              return (
                <AiMessage
                  key={i}
                  hits={byTitle(m.hits)}
                  base={bases[i] ?? 0}
                  mode={mode}
                  activeSource={panel}
                  onCite={(n) => setPanel((p) => (p === n ? null : n))}
                  onTick={scrollDown}
                  onDone={() => setLive(null)}
                />
              );
            })}
          </div>
        </div>

        <form className="composer" onSubmit={(e) => { e.preventDefault(); ask(text); }}>
          <div className="box">
            <textarea
              ref={field}
              rows={1}
              value={text}
              placeholder="Ask AVA anything"
              aria-label="Ask AVA a question"
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(text); } }}
            />
            <Button variant="primary" type="submit" disabled={busy || !text.trim()}>Ask</Button>
          </div>
          <p className="meta">AVA shows her sources. If she doesn&apos;t know, she&apos;ll say so.</p>
        </form>

        <aside className={`src-panel${panel !== null ? " on" : ""}`} aria-label="Source details" aria-hidden={panel === null} inert={panel === null}>
          {panel !== null && sources[panel] && <ItemDetail item={sources[panel]} label={`Source ${panel + 1}`} onClose={() => setPanel(null)} />}
        </aside>
      </section>
    </div>
  );
}

function AiMessage({ hits, base, mode, activeSource, onCite, onTick, onDone }: {
  hits: Item[];
  base: number;
  mode: Mode;
  activeSource: number | null;
  onCite: (n: number) => void;
  onTick: () => void;
  onDone: () => void;
}) {
  const toast = useToast();
  const [logged, setLogged] = useState(false);
  const parts = useMemo(() => {
    const out: ({ t: string } | { c: number })[] = [];
    hits.forEach((h, k) => { h.summary.split(" ").forEach((t) => out.push({ t })); out.push({ c: base + k }); });
    return out;
  }, [hits, base]);

  const animated = mode !== "static";
  const [shown, setShown] = useState(animated ? 0 : parts.length);
  const [landed, setLanded] = useState(!animated);
  const after = landed || (mode === "streaming" && !hits.length);

  /* Words arrive one by one while "streaming"; the sources and notes settle in once the last one lands. */
  useEffect(() => {
    if (mode !== "streaming") return;
    if (!hits.length) { onDone(); return; }
    let i = 0;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setInterval(() => {
      i = reduce ? parts.length : i + 1;
      setShown(i);
      onTick();
      if (i >= parts.length) { clearInterval(timer); requestAnimationFrame(() => { setLanded(true); onDone(); }); }
    }, 28);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const owners = [...new Set(hits.map((h) => cat(h.cat).owner))].join(" and ");
  const sam = hits.some((h) => h.sam);

  return (
    <div className={`msg msg--ai${animated ? " rise" : ""}`}>
      <span className="label"><AvaMark />AVA</span>
      <div className="body">
        {mode === "thinking" && <div className="checking"><span className="meta thinking">Checking what I know</span></div>}
        {mode !== "thinking" && !hits.length && <p>I don&apos;t know that yet, and I won&apos;t guess.</p>}
        {mode !== "thinking" && hits.length > 0 && (
          <p>
            {parts.slice(0, shown).map((p, i) =>
              "c" in p ? (
                <button key={i} className={`cite${animated ? " w" : ""}${activeSource === p.c ? " on" : ""}`} onClick={() => onCite(p.c)} aria-label={`Source ${p.c + 1}`}>{p.c + 1}</button>
              ) : (
                <span key={i} className={animated ? "w" : undefined}>{p.t} </span>
              ),
            )}
          </p>
        )}
      </div>
      {mode !== "thinking" && (
        <div className={`after${after ? " on" : ""}`}>
          {!hits.length ? (
            <div className="notes">
              <button
                className="link"
                disabled={logged}
                onClick={() => { setLogged(true); toast({ kind: "success", label: "Gap logged", message: "The owners can see what I was missing.", meta: "It joins their review queue." }); }}
              >
                {logged ? "Logged" : "Log this as a gap"}
              </button>
              <span className="meta">My owners will see it.</span>
            </div>
          ) : (
            <>
              <div className="sources">
                <span className="label">Sources</span>
                {hits.map((h, k) => (
                  <button key={h.title} className={`src${activeSource === base + k ? " on" : ""}`} onClick={() => onCite(base + k)}>
                    <span className="src__n">{base + k + 1}</span>
                    <span>
                      <span className="src__t">{h.title}</span>
                      <span className="meta src__m">
                        {cat(h.cat).name} &middot; Owner {cat(h.cat).owner} &middot; Review by {fmt(h.review)}
                        {overdue(h) && <> <span className="flag">(overdue)</span></>}
                      </span>
                    </span>
                    <span className="src__arrow" aria-hidden="true">&rarr;</span>
                  </button>
                ))}
              </div>
              <div className="notes">
                <button className="link" onClick={() => toast({ kind: "success", label: "Flagged", message: `Sent to ${owners}.`, meta: "It's in their queue." })}>Flag a gap or inaccuracy</button>
                {sam && <span className="meta">Draws on Sam&apos;s thinking. Voice or attribution use needs his approval.</span>}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
