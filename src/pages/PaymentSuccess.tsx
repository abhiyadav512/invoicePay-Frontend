import { CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center  bg-sidebar">
      <Card className="w-full max-w-md p-6 shadow-2xl rounded-2xl text-center">
        <CardContent className="flex flex-col items-center gap-6">
          <CheckCircle2 className="text-green-600 w-16 h-16" />
          <h2 className="text-2xl font-bold ">Payment Successful!</h2>
          <p className="">
            Thank you for your payment. Your invoice has been processed
            successfully.
          </p>

          <Button className="w-full mt-4" onClick={() => navigate("/")}>
            Back to InvoicePay
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
