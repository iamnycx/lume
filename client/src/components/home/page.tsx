import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Social Networking App</h1>
        <p className="max-w-lg text-balance">
          A Simple Social Networking app built with React in the frontend and
          Django in the backend.
        </p>
        <div>
          <Link to="/auth">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
