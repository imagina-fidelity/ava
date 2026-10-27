export const dynamic = "force-dynamic";

// Placeholder home: the chat itself is built from the approved mockup (ava-mockup/index.html).
export default function Home() {
  return (
    <main id="main" className="page page--narrow">
      <div className="page-head">
        <div>
          <h1 className="page-title">Meet AVA.</h1>
          <p className="page-lede">
            imagina&apos;s AI colleague. She knows how imagina works, and she&apos;ll tell you when she doesn&apos;t.
          </p>
        </div>
      </div>
      <div className="panel panel--empty">She&apos;s still being set up. Check back soon.</div>
    </main>
  );
}
