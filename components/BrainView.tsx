"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@fidelity-imagina/ui";
import { CATS, ITEMS, STREAMS, cat, fmt, overdue, type Item } from "@/lib/knowledge";
import { ItemDetail } from "@/components/ItemDetail";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

function CountUp({ to }: { to: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const dur = to && !matchMedia("(prefers-reduced-motion: reduce)").matches ? 900 : 0;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = dur ? Math.min((now - t0) / dur, 1) : 1;
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return <>{n}</>;
}

/** Everything AVA can draw on: approved, owned and traced to its source. */
export function BrainView() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [stream, setStream] = useState("All");
  const [open, setOpen] = useState<Set<string>>(new Set(["identity"]));
  const [item, setItem] = useState<Item | null>(null);

  const od = useMemo(() => ITEMS.filter((x) => overdue(x)).length, []);
  const filtering = !!q.trim() || stream !== "All";
  const match = (x: Item) => {
    const s = q.trim().toLowerCase();
    return (stream === "All" || x.stream === stream) && (!s || `${x.title} ${x.summary} ${x.type} ${x.stream} ${cat(x.cat).name}`.toLowerCase().includes(s));
  };
  const cats = CATS.map((c, ci) => ({ c, ci, its: ITEMS.filter((x) => x.cat === c.id && match(x)) })).filter((r) => !filtering || r.its.length);
  const isOpen = (id: string) => filtering || open.has(id);
  const allOpen = cats.length > 0 && cats.every((r) => isOpen(r.c.id));

  const toggle = (id: string) => setOpen((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(CATS.map((c) => c.id)));
  const ask = (text: string) => router.push(`/?ask=${encodeURIComponent(text)}`);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setItem(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="brain enter">
      <main id="main" className="kpage">
        <div className="kin">
          <button className="link rise" style={i(0)} onClick={() => router.push("/")}>&larr; Back to AVA</button>
          <div style={{ marginTop: 32 }}><span className="label rise" style={{ ...i(1), display: "block" }}>AVA&apos;s brain</span></div>
          <h1 className="hero-title rise" style={{ ...i(2), maxWidth: "14ch", marginTop: 16 }}>What I know.</h1>
          <p className="lede rise" style={i(3)}>Everything here is approved, owned and traced to its source. Each category has an owner who teaches me, and I passed a test on it before I used a word of it. Open anything to see more.</p>
          <div className="kstats rise" style={i(4)}>
            <div className="kstat"><b><CountUp to={ITEMS.length} /></b><span>things I know</span></div>
            <div className="kstat"><b><CountUp to={CATS.length} /></b><span>categories</span></div>
            <div className="kstat"><b><CountUp to={STREAMS.length} /></b><span>{STREAMS.length === 1 ? "way in" : "ways in"}</span></div>
            <div className={`kstat${od ? " kstat--flag" : ""}`}><b><CountUp to={od} /></b><span>overdue for review</span></div>
          </div>
          <div className="kbar rise" style={i(5)}>
            <label className="ksearch">
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search my brain" autoComplete="off" aria-label="Search AVA's brain" />
            </label>
            <div className="kbar__row">
              {STREAMS.length > 1 && (
                <>
                  <span className="label">Stream</span>
                  {["All", ...STREAMS].map((s) => (
                    <button key={s} className="chip" aria-pressed={stream === s} onClick={() => setStream(s)}>{s}</button>
                  ))}
                </>
              )}
              <button className="link" onClick={toggleAll}>{allOpen ? "Collapse all" : "Expand all"}</button>
            </div>
          </div>

          <div className="klist">
            {cats.length === 0 && (
              <div className="kempty"><h2>Nothing matches that.</h2><p>If it should be here, ask me. I&apos;ll offer to log the gap for the owners.</p></div>
            )}
            {cats.map(({ c, ci, its }, n) => {
              const total = ITEMS.filter((x) => x.cat === c.id).length;
              const o = isOpen(c.id);
              return (
                <section key={c.id} className={`kcat rise${o ? " open" : ""}`} style={i(6 + n)}>
                  <button className="kcat__head" onClick={() => toggle(c.id)} aria-expanded={o}>
                    <span className="label">0{ci + 1}</span>
                    <span className="kcat__name">{c.name}</span>
                    <span className="kcat__count">{its.length}{filtering && <i>of {total}</i>}</span>
                    <span className="kcat__sign" aria-hidden="true">+</span>
                    <span className="meta kcat__sub">{c.desc} &middot; Teacher: {c.owner}</span>
                  </button>
                  <div className="kcat__body"><div>
                    <div className="xp"><span className="label">Explores</span>{c.explores.map((e) => <span key={e} className="xp__c">{e}</span>)}</div>
                    <div className="krows">
                      {its.map((x, k) => (
                        <button key={x.title} className={`krow${item === x ? " on" : ""}`} style={i(k)} onClick={() => setItem(item === x ? null : x)} tabIndex={o ? 0 : -1}>
                          <span><span className="krow__t">{x.title}</span><span className="krow__s">{x.summary}</span></span>
                          <span className="krow__c">{x.type}</span>
                          <span className="krow__c">{x.stream}</span>
                          <span className={`krow__c${overdue(x) ? " flag" : ""}`}>{fmt(x.review)}{overdue(x) && " · overdue"}</span>
                          <span className="krow__a" aria-hidden="true">&rarr;</span>
                        </button>
                      ))}
                    </div>
                    <div className="ktry">
                      <span className="label">Try asking me</span>
                      {c.ask.map((a) => <button key={a} className="try" onClick={() => ask(a)} tabIndex={o ? 0 : -1}>{a}</button>)}
                    </div>
                  </div></div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <div className={`scrim${item ? " on" : ""}`} onClick={() => setItem(null)} />
      <aside className={`ksheet${item ? " on" : ""}`} aria-label="Item details" aria-hidden={!item} inert={!item}>
        {item && (
          <ItemDetail item={item} label="In AVA's brain" onClose={() => setItem(null)}>
            <div className="actions"><Button variant="primary" onClick={() => ask(`Tell me about ${item.title}`)}>Ask AVA about this</Button></div>
          </ItemDetail>
        )}
      </aside>
    </div>
  );
}
