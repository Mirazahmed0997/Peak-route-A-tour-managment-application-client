import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const unAuthorised = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold text-destructive">403</h1>

            <h2 className="mt-4 text-2xl font-semibold">
                Unauthorized Access
            </h2>

            <p className="mt-2 text-muted-foreground max-w-md">
                You don’t have permission to view this page.
                Please log in with the correct account or go back.
            </p>

            <div className="mt-6 flex gap-3">
                <Button asChild variant="default">
                    <Link to="/">Go Home</Link>
                </Button>

                <Button asChild variant="outline">
                    <Link to="/login">Login</Link>
                </Button>
            </div>
        </div>
    );
};

export default unAuthorised;