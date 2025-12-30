import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AlertTriangle, Lightbulb, MessageCircle, Send, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FeedbackTypeCard } from "@/components/feedback/FeedbackTypeCard";
import { VoiceRecorder } from "@/components/feedback/VoiceRecorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Mic } from "lucide-react";
import { toast } from "sonner";

type FeedbackType = "complaint" | "suggestion" | "feedback" | null;
type InputMode = "text" | "voice";

export default function CustomerFeedback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const businessName = searchParams.get("business") || "Demo Business";

  const [feedbackType, setFeedbackType] = useState<FeedbackType>(null);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [textMessage, setTextMessage] = useState("");
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedbackType) {
      toast.error("Please select a feedback type");
      return;
    }

    if (inputMode === "text" && !textMessage.trim()) {
      toast.error("Please enter your message");
      return;
    }

    if (inputMode === "voice" && !voiceBlob) {
      toast.error("Please record your message");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Thank you for your feedback!");
    navigate("/feedback/thank-you");
  };

  const wordCount = textMessage.split(/\s+/).filter(Boolean).length;
  const maxWords = 300;

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <MessageCircle className="h-4 w-4" />
            Powered by Senditbox
          </div>
          <h1 className="text-2xl font-bold text-foreground">{businessName}</h1>
          <p className="text-muted-foreground mt-2">
            We value your feedback. Help us improve!
          </p>
        </div>

        {/* Feedback Type Selection */}
        <div className="space-y-4 mb-8 animate-slide-up">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Select Feedback Type
          </h2>
          <div className="grid gap-3">
            <FeedbackTypeCard
              icon={AlertTriangle}
              title="Complaint"
              description="Report an issue or problem"
              selected={feedbackType === "complaint"}
              onClick={() => setFeedbackType("complaint")}
              color="complaint"
            />
            <FeedbackTypeCard
              icon={Lightbulb}
              title="Suggestion"
              description="Share an idea for improvement"
              selected={feedbackType === "suggestion"}
              onClick={() => setFeedbackType("suggestion")}
              color="suggestion"
            />
            <FeedbackTypeCard
              icon={MessageCircle}
              title="General Feedback"
              description="Share your thoughts with us"
              selected={feedbackType === "feedback"}
              onClick={() => setFeedbackType("feedback")}
              color="feedback"
            />
          </div>
        </div>

        {/* Input Mode Tabs */}
        {feedbackType && (
          <div className="space-y-4 mb-8 animate-slide-up">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Your Message
            </h2>

            <Tabs
              value={inputMode}
              onValueChange={(v) => setInputMode(v as InputMode)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="voice" className="gap-2">
                  <Mic className="h-4 w-4" />
                  Voice
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="mt-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Write your message here..."
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    className="min-h-[150px] resize-none"
                  />
                  <p
                    className={`text-xs text-right ${
                      wordCount > maxWords
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}
                  >
                    {wordCount}/{maxWords} words
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="voice" className="mt-4">
                <div className="p-6 bg-card rounded-xl border">
                  <VoiceRecorder
                    onRecordingComplete={setVoiceBlob}
                    maxDuration={30}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Optional Contact Info */}
        {feedbackType && (
          <div className="space-y-4 mb-8 animate-slide-up">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Contact Info (Optional)
              </h2>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={(checked) =>
                    setIsAnonymous(checked as boolean)
                  }
                />
                <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                  Submit anonymously
                </Label>
              </div>
            </div>

            {!isAnonymous && (
              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Submit Button */}
        {feedbackType && (
          <Button
            variant="feedback"
            size="xl"
            className="w-full animate-slide-up"
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              (inputMode === "text" && !textMessage.trim()) ||
              (inputMode === "voice" && !voiceBlob)
            }
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-5 w-5" />
                Send Feedback
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
