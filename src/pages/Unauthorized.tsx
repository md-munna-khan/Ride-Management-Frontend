import { Button } from "@/components/ui/button";
import { Link } from "react-router";


export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted p-6">
      <div className="bg-white shadow-lg rounded-lg p-10 flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold text-destructive">🚫 Unauthorized</h1>
        <p className="text-muted-foreground text-lg">
          You do not have permission to access this page.
        </p>
        <Button asChild size="lg">
          <Link to="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}

