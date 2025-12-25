// src/components/PaymentSuccess.jsx
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

const Success = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <CheckCircle2 className="w-20 h-20 text-green-600" />
              <CheckCircle2 className="w-10 h-10 text-white absolute inset-0 m-auto" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-white-900">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg mt-3 text-white-600">
            Thank you for your payment. Your transaction has been completed successfully.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="text-center">
            <p className="text-gray-700">
              A confirmation email has been sent to your registered email address.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="flex-1">
              <Link to="/user/bookings">View My Bookings</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;