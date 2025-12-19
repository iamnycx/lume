import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Card from "../card";
import React from "react";
import Axios from "@/lib/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Signup({ setActiveCard }: { setActiveCard: Function }) {
  const [name, setName] = React.useState("");
  const [birth, setBirth] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repassword, setRePassword] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await Axios.post("/auth/users/", {
        name,
        birth_date: birth,
        email,
        password,
      });

      const res = await Axios.post("/auth/jwt/create/", {
        email,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      navigate("/feed");
    } catch (err) {
      console.log("Login failed", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen items-center">
      <Card className="mx-auto">
        <h1
          className="text-2xl mb-8
         text-center font-bold"
        >
          Join Social Network
        </h1>
        <div>
          <Label htmlFor="name" className="mb-2 mt-4">
            Full Name
          </Label>
          <Input
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="i.e. Bruce Wayne"
          />
          <Label htmlFor="dob" className="mb-2 mt-4">
            Date of Birth
          </Label>
          <Input
            onChange={(e) => setBirth(e.target.value)}
            id="dob"
            type="date"
          />
          <Label htmlFor="email" className="mb-2 mt-4">
            Email Address
          </Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="i.e. waynebruce@mail.com"
            type="email"
          />

          <div className="flex gap-4">
            <div>
              <Label htmlFor="password" className="mb-2 mt-4">
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="secure password"
                type="password"
              />
            </div>
            <div>
              <Label htmlFor="re-password" className="mb-2 mt-4">
                Re-Password
              </Label>
              <Input
                disabled={password.length > 0 ? false : true}
                onChange={(e) => setRePassword(e.target.value)}
                id="re-password"
                placeholder="secure password"
                type="password"
              />
            </div>
          </div>
          <p className="text-sm pt-2 text-muted-foreground">
            {"Use A-Z, a-z, 0-9,!@#$%^&* in password"}
          </p>

          <div className="flex flex-col items-center gap-4 mt-8">
            <Button
              disabled={
                password === repassword && password.length > 0 ? false : true
              }
              className="w-full"
              onClick={handleSubmit}
            >
              Signup
            </Button>

            <p className="flex items-center text-sm gap-2">
              <span>Already have account?</span>
              <span
                onClick={() => setActiveCard("login")}
                className="underline cursor-pointer hover:text-primary transition-colors duration-300 ease-in-out"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
