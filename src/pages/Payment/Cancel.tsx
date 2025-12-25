// src/components/PaymentCancelled.jsx
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

const Cancel = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <AlertCircle className="w-20 h-20 text-amber-600" />
              <AlertCircle className="w-10 h-10 text-white absolute inset-0 m-auto" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Payment Cancelled
          </CardTitle>
          <CardDescription className="text-lg mt-3 text-gray-600">
            You have cancelled the payment process.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div className="text-center">
            <p className="text-gray-700">
              No charges were made. Your booking is not confirmed yet.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="flex-1">
              <Link to="/checkout">Continue Booking</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link to="/user/bookings">View My Bookings</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cancel;