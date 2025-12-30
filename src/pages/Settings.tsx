import { QRCodeGenerator } from "@/components/dashboard/QRCodeGenerator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, User, Bell, Palette } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your business profile and preferences
        </p>
      </div>

      <Tabs defaultValue="qrcode" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
          <TabsTrigger value="qrcode" className="gap-2">
            <Palette className="h-4 w-4 hidden sm:block" />
            QR Code
          </TabsTrigger>
          <TabsTrigger value="business" className="gap-2">
            <Building2 className="h-4 w-4 hidden sm:block" />
            Business
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4 hidden sm:block" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4 hidden sm:block" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* QR Code Tab */}
        <TabsContent value="qrcode" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <QRCodeGenerator 
              businessId="acme-coffee" 
              businessName="Acme Coffee Shop" 
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Customize Your Page</CardTitle>
                <CardDescription>
                  Personalize how your feedback page appears to customers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="display-name">Display Name</Label>
                  <Input 
                    id="display-name" 
                    defaultValue="Acme Coffee Shop"
                    placeholder="Your business name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Input 
                    id="welcome-message" 
                    defaultValue="We'd love to hear from you!"
                    placeholder="Custom welcome message"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thank-you-message">Thank You Message</Label>
                  <Input 
                    id="thank-you-message" 
                    defaultValue="Thank you for your feedback!"
                    placeholder="Custom thank you message"
                  />
                </div>
                <Button className="w-full">Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Update your business details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="Acme Coffee Shop" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" defaultValue="Food & Beverage" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input id="email" defaultValue="hello@acmecoffee.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, New York, NY 10001" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your personal account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-email">Email</Label>
                <Input id="user-email" defaultValue="john@business.com" />
              </div>
              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about new feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Notification settings will be available soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
