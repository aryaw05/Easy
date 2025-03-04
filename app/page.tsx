import BlogDataPage from "@/components/layout/home/page";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/blog_data");
  const posts = await data.json();

  console.log(posts);

  return (
    <>
      <main className="flex flex-1 flex-col gap-6 px-4">
        <BlogDataPage blogs={posts} />
      </main>
    </>
  );
}
