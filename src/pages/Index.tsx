import { Link } from "react-router-dom";
import { MessageSquare, ArrowRight, QrCode, BarChart3, Brain, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: QrCode,
    title: "QR-Based Collection",
    description: "Customers simply scan and share feedback—no app download required.",
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Automatic sentiment analysis, categorization, and actionable recommendations.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Track trends, identify issues, and measure improvements over time.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description: "Handle feedback privately before issues become public reviews.",
  },
];

const benefits = [
  "Convert complaints into improvements",
  "Understand customer sentiment",
  "Track staff and service performance",
  "Generate actionable reports",
  "Voice and text feedback support",
  "Anonymous submission option",
];

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Senditbox</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/feedback?business=Demo%20Business">Try Demo</Link>
            </Button>
            <Button asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="gradient-hero py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <QrCode className="h-4 w-4" />
              QR-Based Customer Feedback Platform
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
              Turn Customer Feedback Into
              <span className="text-primary"> Business Growth</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Collect complaints, suggestions, and feedback through simple QR codes. 
              Get AI-powered insights to improve your business before issues become public reviews.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Button size="xl" asChild>
                <Link to="/dashboard">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/feedback?business=Demo%20Business">
                  <QrCode className="h-5 w-5 mr-2" />
                  See Customer View
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Manage Feedback
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete solution for collecting, analyzing, and acting on customer feedback.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-card rounded-xl border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Fix Problems Before They Become Public
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Give your customers a private channel to share their concerns. 
                Address issues directly and improve your service without negative public reviews.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted rounded-2xl p-8">
              <div className="bg-card rounded-xl border shadow-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">New Feedback</p>
                    <p className="text-sm text-muted-foreground">Just now</p>
                  </div>
                </div>
                <p className="text-foreground mb-4">
                  "The waiting time was longer than expected, but the staff was very friendly and apologetic."
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium">
                    Neutral Sentiment
                  </span>
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                    Service
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Customer Feedback?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join businesses that are turning customer insights into growth opportunities.
          </p>
          <Button
            size="xl"
            variant="secondary"
            className="bg-background text-foreground hover:bg-background/90"
            asChild
          >
            <Link to="/dashboard">
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Senditbox</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Senditbox. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
