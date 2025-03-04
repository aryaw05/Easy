"use client";

import { useState } from "react";

export default function DashboardLayout({
  children,
  profile,
  published_blog,
  draft_blog,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
  published_blog: React.ReactNode;
  draft_blog: React.ReactNode;
}) {
  const [isPublished, setIsPublished] = useState(true);
  return (
    <div className="flex w-full justify-between px-7">
      <button onClick={() => setIsPublished(true)}>Published</button>
      <button onClick={() => setIsPublished(false)}>draft</button>
      {/* {children} */}

      {isPublished ? published_blog : draft_blog}
      {profile}
    </div>
  );
}
