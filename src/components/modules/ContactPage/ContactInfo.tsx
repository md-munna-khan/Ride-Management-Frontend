import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageCircle, Headphones } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Contact Information</h2>
        <p className="text-muted-foreground text-lg">
          We're here to help you with any questions about our ride booking platform. Reach out through any of the
          channels below.
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Office Address</h3>
                <p className="text-muted-foreground">
                  Dhaka
                  <br />
                Badda Gulshan
                  <br />
                  Bangladesh
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Phone Numbers</h3>
                <p className="text-muted-foreground">
                  General Inquiries: 01954288782
                  <br />
                  Driver Support:  01954288782
                  <br />
                  Rider Support:  01954288782
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email Addresses</h3>
                <p className="text-muted-foreground">
                  General: 
                  <br />
                  Support: munnamia0200@gmail.com
                  <br />
                  Business: business@rideflow.com
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Business Hours</h3>
                <p className="text-muted-foreground">
                  Monday - Friday: 9:00 AM - 6:00 PM PST
                  <br />
                  Saturday: 10:00 AM - 4:00 PM PST
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Available 24/7 for immediate assistance</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Headphones className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground">Speak directly with our support team</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
