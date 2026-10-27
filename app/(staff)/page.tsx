import { ChatView } from "@/components/ChatView";
import { getViewer } from "@/lib/viewer";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: Promise<{ ask?: string }> }) {
  const [viewer, { ask }] = await Promise.all([getViewer(), searchParams]);
  return <ChatView firstName={viewer?.firstName ?? "there"} initialQuestion={ask?.slice(0, 500)} />;
}
