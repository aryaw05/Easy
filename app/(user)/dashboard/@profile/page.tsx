import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-1/2">
      <h1>Profile</h1>
      <h2>{session?.user?.name}</h2>
      <h2>{session?.user?.email}</h2>
    </div>
  );
}
