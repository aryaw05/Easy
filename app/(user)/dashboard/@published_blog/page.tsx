import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardPageView from "@/components/layout/dashboard/page";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const userBlogData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/show-user-blog?userID=${session?.user?.id}`,
  ).then((res) => res.json());

  return (
    <div>
      {userBlogData?.data?.map((e: any, index: number) => {
        if (e.is_published) {
          return (
            <DashboardPageView
              title={e.title}
              dataHeader={e.slug ?? ""}
              id={e.id}
              create_at={e.create_at}
            />
          );
        } else {
          <DashboardPageView
            title={e.title}
            dataHeader={e.slug ?? ""}
            id={e.id}
            create_at={e.create_at}
          />;
        }
      })}
    </div>
  );
}
