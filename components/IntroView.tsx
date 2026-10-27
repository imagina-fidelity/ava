"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@fidelity-imagina/ui";
import { AvaMark } from "@/components/AvaMark";
import { CATS, ITEMS } from "@/lib/knowledge";
import { introSeen } from "@/lib/introSeen";

const i = (n: number) => ({ "--i": n }) as React.CSSProperties;

/** First visit, or "Meet AVA" from the profile menu: centred, one idea per screen, flowing down. */
export function IntroView() {
  const router = useRouter();
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    introSeen.set();
    const els = root.current?.querySelectorAll(".reveal");
    if (!els) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
      { root: root.current, threshold: 0.25 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const chat = () => router.push("/");

  return (
    <main id="main" className="intro enter" ref={root} aria-label="Meet AVA">
      <button className="link intro__skip" onClick={chat}>Skip intro</button>
      <section className="isec isec--hero">
        <span className="rise" style={i(0)}><AvaMark large /></span>
        <h1 className="rise" style={i(1)}>Meet AVA.</h1>
        <p className="rise" style={i(2)}>imagina&apos;s AI colleague. She knows how imagina works, and she&apos;ll tell you when she doesn&apos;t.</p>
        <div className="icue rise" style={i(4)}><span className="meta">Keep scrolling</span><i /></div>
      </section>
      <div className="iline reveal" />
      <section className="isec">
        <span className="label reveal">Her brain</span>
        <h2 className="reveal" style={i(1)}>She knows what we know.</h2>
        <p className="reveal" style={i(2)}>Everything in her brain has been approved by the people who own it. Nothing gets in by accident, and nothing stays in without a reason.</p>
        <div className="ifacts reveal" style={i(3)}>
          <div><b>{CATS.length}</b><span>categories</span></div>
          <div><b>{ITEMS.length}</b><span>things she knows</span></div>
          <div><b>1</b><span>way in</span></div>
        </div>
      </section>
      <div className="iline reveal" />
      <section className="isec">
        <span className="label reveal">Her answers</span>
        <h2 className="reveal" style={i(1)}>She shows her working.</h2>
        <p className="reveal" style={i(2)}>Every answer points to where it came from. Open a source and you&apos;ll see who owns it and when it was last reviewed.</p>
        <div className="idemo reveal" style={i(3)} aria-label="Example answer">
          <span className="label">You</span><p>How does a key project begin?</p>
          <span className="label"><AvaMark />AVA</span>
          <p>No Project Plan, no project. The architecture is decided before timelines or tasks. <span className="cite">1</span></p>
          <span className="meta">1 &middot; Project Plan: how every key project begins &middot; Owner Mel Horton</span>
        </div>
      </section>
      <div className="iline reveal" />
      <section className="isec">
        <span className="label reveal">Her honesty</span>
        <h2 className="reveal" style={i(1)}>She says when she doesn&apos;t know.</h2>
        <p className="reveal" style={i(2)}>No guessing, no padding. If it isn&apos;t in her brain, she&apos;ll say so, and you can tell the owners what&apos;s missing so she can learn it.</p>
      </section>
      <div className="iline reveal" />
      <section className="isec">
        <span className="label reveal">Her teachers</span>
        <h2 className="reveal" style={i(1)}>People teach her. Tests keep her honest.</h2>
        <p className="reveal" style={i(2)}>Each category has an owner. They write her brief, she&apos;s tested on sample questions, and a council approves it before she uses any of it. If something&apos;s withdrawn, she stops using it straight away.</p>
      </section>
      <div className="iline reveal" />
      <section className="isec">
        <span className="label reveal">Her limits</span>
        <h2 className="reveal" style={i(1)}>What she never touches.</h2>
        <ul className="ilist reveal" style={i(2)}>
          <li>Personal records</li>
          <li>Client personal or financial information</li>
          <li>Sensitive People &amp; Culture material</li>
        </ul>
      </section>
      <div className="iline reveal" />
      <section className="isec iend">
        <h2 className="reveal">Ask her something.</h2>
        <p className="reveal" style={i(1)}>She&apos;s ready when you are. You can come back to this any time from your profile.</p>
        <Button variant="primary" size="lg" className="reveal" style={i(2)} onClick={chat}><span>Chat with AVA</span><span aria-hidden="true">&rarr;</span></Button>
        <button className="link reveal" style={i(3)} onClick={() => router.push("/brain")}>Look inside her brain first</button>
      </section>
    </main>
  );
}
