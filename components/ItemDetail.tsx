import { Button } from "@fidelity-imagina/ui";
import { cat, fmt, overdue, type Item } from "@/lib/knowledge";

/** One approved item in full: used by the chat's source panel and the brain page's sheet. */
export function ItemDetail({ item, label, onClose, children }: { item: Item; label: string; onClose: () => void; children?: React.ReactNode }) {
  const c = cat(item.cat);
  const late = overdue(item);
  return (
    <>
      <div className="detail__top">
        <span className="label">{label}</span>
        <Button size="sm" variant="ghost" onClick={onClose} data-close>Close</Button>
      </div>
      <h2>{item.title}</h2>
      <p>{item.summary}</p>
      {item.points.length > 0 && (
        <div className="pts">
          <span className="label">Key points</span>
          <ul>{item.points.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      )}
      <dl>
        <div><dt>Status</dt><dd><span className="ok"><span className="mk" />Approved</span></dd></div>
        <div><dt>Category</dt><dd>{c.name}</dd></div>
        <div><dt>Type</dt><dd>{item.type}</dd></div>
        <div><dt>Capture stream</dt><dd>{item.stream}</dd></div>
        <div><dt>Source</dt><dd>{item.doc}</dd></div>
        <div><dt>Owner</dt><dd>{c.owner}</dd></div>
        <div><dt>Approved for</dt><dd>All imagina staff, for reference and learning.</dd></div>
        <div><dt>Review by</dt><dd className={late ? "flag" : undefined}>{fmt(item.review)}{late ? " (overdue)" : ""}</dd></div>
      </dl>
      {children}
      {item.sam && <p className="samnote meta">Draws on Sam&apos;s thinking. Voice or attribution use needs his approval.</p>}
    </>
  );
}
