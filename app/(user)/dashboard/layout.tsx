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
    <div className="flex w-full flex-col justify-between px-7">
      <h1 className="mb-2 max-w-2xl break-words text-4xl font-extrabold leading-tight tracking-tight">
        Dashboard
      </h1>
      <div className="flex gap-5">
        <button onClick={() => setIsPublished(true)}>Published</button>
        <button onClick={() => setIsPublished(false)}>draft</button>
      </div>

      {isPublished ? published_blog : draft_blog}
      {profile}
    </div>
  );
}
