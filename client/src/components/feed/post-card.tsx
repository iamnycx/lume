import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import type { PostDataType } from "@/types";
import Card from "../card";
import Axios from "@/lib/axios";

export default function PostCard({ data }: { data: PostDataType }) {
  const date = new Date(data.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const handleReaction = async (value: "LIKE" | "DISLIKE") => {
    const res = await Axios.get(`/api/posts/${data.id}`);

    if (value == "LIKE") {
      await Axios.patch(`/api/posts/${data.id}/`, {
        likes: res.data.likes + 1,
      });
    }
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <div className="flex items-baseline gap-2">
            <img
              src={data.author.avatar}
              alt={data.author.name.charAt(0)}
              className="bg-muted h-8 w-8 flex justify-center items-center rounded-full"
            />
            <h1>{data.author.name}</h1>
          </div>
          <span className="text-xs">Posted on: {date}</span>
        </div>

        <div className="w-full h-0.5 rounded-full bg-muted" />

        <p className="text-sm text-pretty tracking-tight">
          {data.caption.slice(0, 380)}
        </p>

        <div>{data.image && <img src={data.image} />}</div>

        <div className="grid grid-cols-2 w-full gap-2 pt-4">
          <Button
            variant="outline"
            className="hover:text-green-400 transition-colors duration-300 ease-in-out"
          >
            <ThumbsUpIcon />
            <span>Like - {data.likes.toString()}</span>
          </Button>
          <Button
            variant="outline"
            className="hover:text-red-400 transition-colors duration-300 ease-in-out"
          >
            <ThumbsDownIcon />
            <span>Dislike - {data.dislikes.toString()}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
