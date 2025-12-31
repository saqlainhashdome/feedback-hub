import { useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Copy, Check, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Senditbox logo as SVG data URL (MessageSquare icon with brand colors)
const SENDITBOX_LOGO = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#0d9488"/>
  <path d="M25 30 h50 a10 10 0 0 1 10 10 v25 a10 10 0 0 1 -10 10 h-35 l-15 12 v-12 a10 10 0 0 1 -10 -10 v-25 a10 10 0 0 1 10 -10" fill="white"/>
  <circle cx="38" cy="52" r="5" fill="#0d9488"/>
  <circle cx="55" cy="52" r="5" fill="#0d9488"/>
  <circle cx="72" cy="52" r="5" fill="#0d9488"/>
</svg>
`)}`;

interface QRCodeGeneratorProps {
  businessId?: string;
  businessName?: string;
}

export function QRCodeGenerator({ 
  businessId = "demo-business", 
  businessName = "Your Business" 
}: QRCodeGeneratorProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  
  // Generate the feedback URL for this business
  const feedbackUrl = `${window.location.origin}/feedback?business=${businessId}`;
  
  const downloadQRCode = (format: "png" | "svg") => {
    if (!qrRef.current) return;
    
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;
    
    if (format === "svg") {
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${businessName.replace(/\s+/g, "-")}-qr-code.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("QR code downloaded as SVG");
    } else {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = 1024;
        canvas.height = 1024;
        if (ctx) {
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const pngUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = pngUrl;
          link.download = `${businessName.replace(/\s+/g, "-")}-qr-code.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast.success("QR code downloaded as PNG");
        }
        URL.revokeObjectURL(url);
      };
      
      img.src = url;
    }
  };
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(feedbackUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };
  
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <QrCode className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Your Feedback QR Code</CardTitle>
            <CardDescription>
              Print this QR code and place it where customers can scan
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code Display */}
        <div className="flex flex-col items-center gap-4">
          <div 
            ref={qrRef}
            className="p-6 bg-white rounded-xl shadow-sm border"
          >
            <QRCodeSVG
              value={feedbackUrl}
              size={200}
              level="H"
              includeMargin={true}
              bgColor="#ffffff"
              fgColor="#0f172a"
              imageSettings={{
                src: SENDITBOX_LOGO,
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Scan to leave feedback for <strong>{businessName}</strong>
          </p>
        </div>
        
        {/* Feedback URL */}
        <div className="space-y-2">
          <Label htmlFor="feedback-url">Feedback Link</Label>
          <div className="flex gap-2">
            <Input
              id="feedback-url"
              value={feedbackUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyLink}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={() => downloadQRCode("png")} 
            className="flex-1 gap-2"
          >
            <Download className="h-4 w-4" />
            Download PNG
          </Button>
          <Button 
            onClick={() => downloadQRCode("svg")} 
            variant="outline"
            className="flex-1 gap-2"
          >
            <Download className="h-4 w-4" />
            Download SVG
          </Button>
        </div>
        
        {/* Tips */}
        <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
          <h4 className="font-medium text-sm text-foreground mb-2">💡 Tips for placement</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Place near checkout counters or reception desks</li>
            <li>• Add to receipts or business cards</li>
            <li>• Display on table tents in restaurants</li>
            <li>• Include in packaging or product inserts</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
