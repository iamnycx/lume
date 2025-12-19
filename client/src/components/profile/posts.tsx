import type { UserPostsType } from "@/types";
import PostCard from "./post-card";

export default function Posts({ posts }: { posts: UserPostsType | undefined }) {
  return (
    <div className="w-2xl">
      <div className="grid  gap-12 mx-auto w-fit">
        {posts?.map((data) => (
          <PostCard data={data} key={data?.id} />
        ))}
      </div>
    </div>
  );
}
