import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { Dispatch, SetStateAction } from "react";
import React from "react";
import Axios from "@/lib/axios";
import { toast } from "sonner";

export default function Confirmation({
  setConfirmationOpen,
}: {
  setConfirmationOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [password, setPassword] = React.useState("");

  const handleConfirm = async () => {
    try {
      const res = await Axios.delete("auth/users/me/", {
        data: {
          current_password: password,
        },
      });

      if (res.status === 400) {
        toast.error("Invalid password");
        return;
      }

      if (res.status === 204) {
        toast.error("Password is required");
        return;
      }

      toast.success("Your account has been deleted");
    } catch (err) {
      toast.error("Error deleting your account");
      return;
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-background/30 backdrop-blur-sm">
      <div className="flex h-screen items-center justify-center">
        <div className="bg-background border-2 rounded-md h-80 w-md flex flex-col justify-evenly items-center relative">
          <div
            className="absolute top-4 right-2 cursor-pointer bg-muted p-1 rounded-full"
            onClick={() => setConfirmationOpen(false)}
          >
            <XIcon className="w-4 h-4" />
          </div>
          <h2 className="text-destructive text-md">
            We can not recover your account once deleted
          </h2>

          <div className="grid gap-6">
            <h2 className="text-sm">
              Enter you password to delete your account.
            </h2>
            <Input
              placeholder="Secure password"
              autoFocus
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              disabled={password.length < 1}
              variant="destructive"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
