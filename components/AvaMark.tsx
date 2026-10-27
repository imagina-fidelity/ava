/** AVA's own mark: a round "A", distinct from a person's initials by its filled ground. */
export function AvaMark({ large }: { large?: boolean }) {
  return <span className={large ? "ava ava--lg" : "ava"} aria-hidden="true">A</span>;
}
