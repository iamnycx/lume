import Card from "../card";
import { Button } from "../ui/button";
import Confirmation from "./confirmation";
import { handleLogout } from "@/lib/auth";
import { Input } from "../ui/input";
import React from "react";
import type { UserDetailType } from "@/types";
import { Divide, PencilLineIcon } from "lucide-react";
import Axios from "@/lib/axios";
import { toast } from "sonner";

export default function Details({
  data,
}: {
  data: UserDetailType | undefined;
}) {
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [nameEditMode, setNameEditMode] = React.useState(false);
  const [birthEditMode, setBirthEditMode] = React.useState(false);
  const [name, setName] = React.useState<string>();
  const [birthDate, setBirthDate] = React.useState<string>();
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    setName(data?.name);
    setBirthDate(data?.birth_date);
  }, [data]);

  const handleUpdate = async () => {
    try {
      await Axios.patch("/auth/users/me/", {
        name,
        birth_date: birthDate,
      });
      setEditMode
      toast.error("Details updated successfully.");
    } catch (err) {
      toast.error("Can not update the details");
    }
  };

  return (
    <>
      <Card className="flex flex-col h-fit gap-2 fixed top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center gap-2">
          <div className="relative h-fit w-fit">
            <img
              src={data?.avatar}
              alt={data?.name.charAt(0)}
              className="bg-muted h-16 w-16 flex justify-center items-center rounded-full"
            />{" "}
            <Button
              variant={"link"}
              className="absolute scale-75 -right-6 text-primary/50 -top-2 hover:text-primary cursor-pointer"
            >
              <PencilLineIcon />
            </Button>
          </div>
          <p>{data?.email}</p>
        </div>

        <div className="space-y-2 flex flex-col items-center my-4">
          {nameEditMode ? (
            <div className="flex items-center relative">
              <Input
                autoFocus
                className="text-center font-bold text-2xl h-auto w-fit dark:bg-transparent border-none p-0 m-0 focus-visible:ring-0"
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
              />
            </div>
          ) : (
            <div className="flex items-center relative">
              <h1 className="text-center">{name}</h1>
              <Button
                variant={"link"}
                className="absolute -right-8 text-primary/50 hover:text-primary cursor-pointer"
                onClick={() => {
                  setNameEditMode(true);
                  setEditMode(true);
                }}
              >
                <PencilLineIcon />
              </Button>
            </div>
          )}

          {birthEditMode ? (
            <div className="flex items-center relative">
              <Input
                autoFocus
                type="date"
                className="text-center font-bold text-2xl h-auto w-fit dark:bg-transparent border-none p-0 m-0 focus-visible:ring-0"
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate || ""}
              />
            </div>
          ) : (
            <div className="flex items-center relative">
              <h1 className="text-center">{data?.birth_date}</h1>
              <Button
                variant={"link"}
                className="absolute -right-8 text-primary/50 hover:text-primary cursor-pointer"
                onClick={() => {
                  setBirthEditMode(true);
                  setEditMode(true);
                }}
              >
                <PencilLineIcon />
              </Button>
            </div>
          )}
        </div>

        <Button
          onClick={handleUpdate}
          disabled={!editMode}
          variant="outline"
          className="mt-4"
        >
          Save Changes
        </Button>

        <div className="grid gap-4 mt-8">
          <Button onClick={handleLogout} variant="secondary">
            Logout
          </Button>
          <Button
            variant="destructive"
            onClick={() => setConfirmationOpen(true)}
          >
            Delete Account
          </Button>
        </div>
      </Card>
      {confirmationOpen && (
        <Confirmation setConfirmationOpen={setConfirmationOpen} />
      )}
    </>
  );
}
