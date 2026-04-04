import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discovery Room — Sales Autonomy",
  description: "Your private Discovery Room. Explore challenges, review solutions, and see a tailored engagement proposal.",
};

export default function RoomLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Discovery rooms render their own branded header — suppress the global nav
  return <>{children}</>;
}
