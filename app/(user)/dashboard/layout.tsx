"use client";

import { useState } from "react";

export default function DashboardLayout({
  profile,
  published_blog,
  draft_blog,
}: {
  profile: React.ReactNode;
  published_blog: React.ReactNode;
  draft_blog: React.ReactNode;
}) {
  const [isPublished, setIsPublished] = useState(true);
  return (
    <div className="flex w-full justify-between px-7">
      <button onClick={() => setIsPublished(true)}>Published</button>
      <button onClick={() => setIsPublished(false)}>draft</button>

      {isPublished ? published_blog : draft_blog}
      {profile}
    </div>
  );
}
