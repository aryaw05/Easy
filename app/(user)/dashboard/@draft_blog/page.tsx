import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardPageView from "@/components/layout/dashboard/page";

export default async function DraftBlogPage() {
  const session = await getServerSession(authOptions);

  const userBlogData = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/show-user-blog?userID=${session?.user?.id}`,
  ).then((res) => res.json());
  return (
    <div>
      {userBlogData?.data?.map((e: any, index: number) => {
        const dataHeader = {
          text: e.content?.blocks[0]?.data?.text,
        };
        if (!e.is_published) {
          return (
            <DashboardPageView
              title={e.title}
              dataHeader={dataHeader}
              id={e.id}
              key={index}
            />
          );
        } else {
          <DashboardPageView
            title={e.title}
            dataHeader={dataHeader}
            id={e.id}
            key={index}
          />;
        }
      })}
    </div>
  );
}
