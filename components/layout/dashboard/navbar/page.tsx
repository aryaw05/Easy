"use client";

import { useState } from "react";

export default function DashboardNavbar() {
  const [isPublished, setIsPublished] = useState(false);

  return (
    <div>
      <button>Published</button>
      <button>Draft</button>
    </div>
  );
}
