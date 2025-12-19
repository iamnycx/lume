import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <h1 className="text-4xl">{"404 - Page not found :("}</h1>
      <h2>The page you are trying to access does not exist</h2>
      <Link to={"/"}>
        <Button variant={"outline"} className="mt-8">
          Go Back
        </Button>
      </Link>
    </div>
  );
}
