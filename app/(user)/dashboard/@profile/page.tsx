"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  // const session = await getServerSession(authOptions);
  const { status, data } = useSession();
  console.log(data);

  return (
    <div className="w-1/2">
      <h1>Profile</h1>
      {status === "authenticated" ? (
        <div>
          <h2>{data?.user?.name}</h2>
          <h2>{data?.user?.email}</h2>
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
