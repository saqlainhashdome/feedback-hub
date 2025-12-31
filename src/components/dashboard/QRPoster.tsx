import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

interface QRPosterProps {
  businessId?: string;
  businessName?: string;
}

export function QRPoster({ 
  businessId = "demo-business", 
  businessName = "Your Business" 
}: QRPosterProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  
  const feedbackUrl = `${window.location.origin}/feedback?business=${businessId}`;
  
  const downloadPoster = async () => {
    if (!posterRef.current) return;
    
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(posterRef.current, {
        scale: 3,
        backgroundColor: '#f5f0e8',
        useCORS: true,
      });
      
      const link = document.createElement('a');
      link.download = `${businessName.replace(/\s+/g, '-')}-senditbox-poster.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success("Poster downloaded!");
    } catch {
      toast.error("Failed to download poster");
    }
  };
  
  const printPoster = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !posterRef.current) return;
    
    const posterHtml = posterRef.current.outerHTML;
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Senditbox QR Poster - ${businessName}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500&display=swap');
            body { 
              margin: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh;
              background: #f5f0e8;
            }
            @media print {
              body { background: white; }
            }
          </style>
        </head>
        <body>
          ${posterHtml}
          <script>
            window.onload = () => {
              window.print();
              window.close();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };
  
  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
            <Printer className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <CardTitle>Printable QR Poster</CardTitle>
            <CardDescription>
              Download or print this poster to display at your business
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Poster Preview */}
        <div className="flex justify-center overflow-auto py-4">
          <div
            ref={posterRef}
            className="relative w-[280px] bg-[#f5f0e8] p-4"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {/* Mailbox Shape */}
            <div className="relative">
              {/* Top Dome */}
              <div 
                className="h-12 bg-[#c13a3a] rounded-t-[100px] relative"
                style={{ 
                  boxShadow: 'inset 0 -4px 0 rgba(0,0,0,0.15)',
                }}
              >
                {/* Slot */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-2 bg-[#8b2626] rounded-sm" />
              </div>
              
              {/* Main Body */}
              <div 
                className="bg-[#c13a3a] px-6 pb-6 pt-4 text-center"
                style={{ 
                  boxShadow: 'inset -8px 0 0 rgba(0,0,0,0.1)',
                }}
              >
                {/* Brand Name */}
                <h1 
                  className="text-[#f5f0e8] text-2xl font-bold tracking-wider mb-4"
                  style={{ 
                    fontFamily: 'Bebas Neue, sans-serif',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  SENDITBOX
                </h1>
                
                {/* Main Message */}
                <h2 
                  className="text-[#f5f0e8] text-lg font-bold leading-tight mb-3"
                  style={{ 
                    fontFamily: 'Bebas Neue, sans-serif',
                    letterSpacing: '0.05em'
                  }}
                >
                  SHARE YOUR<br />
                  COMPLAINT,<br />
                  SUGGESTION<br />
                  OR FEEDBACK
                </h2>
                
                {/* Subtitle */}
                <p className="text-[#f5f0e8]/90 text-xs mb-4">
                  Scan the QR code to<br />
                  submit your feedback
                </p>
                
                {/* QR Code Container */}
                <div className="bg-[#f5f0e8] p-3 rounded-lg inline-block mx-auto shadow-md">
                  <QRCodeSVG
                    value={feedbackUrl}
                    size={120}
                    level="H"
                    bgColor="#f5f0e8"
                    fgColor="#1a1a1a"
                  />
                </div>
                
                {/* Thank You */}
                <p 
                  className="text-[#f5f0e8] text-xl font-bold mt-4 tracking-wider"
                  style={{ 
                    fontFamily: 'Bebas Neue, sans-serif',
                  }}
                >
                  THANK YOU
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={downloadPoster} 
            className="flex-1 gap-2 bg-red-600 hover:bg-red-700"
          >
            <Download className="h-4 w-4" />
            Download Poster
          </Button>
          <Button 
            onClick={printPoster} 
            variant="outline"
            className="flex-1 gap-2"
          >
            <Printer className="h-4 w-4" />
            Print Poster
          </Button>
        </div>
        
        {/* Info */}
        <p className="text-xs text-muted-foreground text-center">
          Recommended: Print on A4 or Letter size paper
        </p>
      </CardContent>
    </Card>
  );
}
