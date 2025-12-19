import React from "react";
import Posts from "./posts";
import Axios from "@/lib/axios";
import type { UserDetailType } from "@/types";
import Details from "./details";

export default function Profile() {
  const [data, setData] = React.useState<UserDetailType>();

  React.useEffect(() => {
    Axios.get("auth/users/me").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <h1 className="text-2xl fixed top-10 left-32">Profile</h1>
      <Details data={data} />
      <div className="flex justify-end my-32">
        <Posts posts={data?.posts} />
      </div>
    </>
  );
}
