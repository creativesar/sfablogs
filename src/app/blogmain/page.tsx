import BlogCard from "@/components/BlogCard";
import { client } from "../../sanity/lib/client";

interface Post {
  summary: string;
  title: string;
  image: string;
  slug: string;
}

export const revalidate = 60; //seconds

export default async function BlogMain() {
  const query = `*[_type=='post'] | order(_createdAt desc){
    summary,title,image,
    "slug":slug.current
  }`;

  const posts: Post[] = await client.fetch(query);

  return (
    <main className="flex min-h-screen flex-col">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-6 py-6">
        {posts.map((post: Post) => (
          <BlogCard post={post} key={post.slug} />
        ))}
      </section>
    </main>
  );
} 