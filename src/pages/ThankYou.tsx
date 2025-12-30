import { CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center">
      <div className="container max-w-md mx-auto px-4 text-center animate-scale-in">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-success/10 mb-6">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">
            Thank You!
          </h1>
          <p className="text-lg text-muted-foreground">
            Your feedback has been submitted successfully. We appreciate you taking the time to help us improve.
          </p>
        </div>

        <div className="p-6 bg-card rounded-xl border shadow-sm mb-8">
          <p className="text-sm text-muted-foreground">
            Your feedback is important to us and will be reviewed by our team. We're committed to providing you with the best experience possible.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button asChild variant="feedback" size="lg">
            <Link to="/feedback">Submit Another Feedback</Link>
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            Powered by Senditbox
          </div>
        </div>
      </div>
    </div>
  );
}
