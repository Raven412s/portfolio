"use client";

import EntryScreen from "@/components/entry-screen";

export default function EntryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleEnter = (useMusic: boolean) => {
    sessionStorage.setItem("hasEntered", "true");
    sessionStorage.setItem("musicEnabled", useMusic ? "true" : "false");

    // ❌ reload nahi
    // Providers ko naturally re-render hone do
    window.dispatchEvent(new Event("entry-complete"));
  };

  return (
    <>
      <EntryScreen onEnter={handleEnter} />
      <main className="opacity-0 pointer-events-none">{children}</main>
    </>
  );
}
