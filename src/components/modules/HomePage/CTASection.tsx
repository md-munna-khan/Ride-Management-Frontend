import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Download } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <Smartphone className="h-16 w-16 mx-auto mb-4 opacity-90" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>

            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join millions of satisfied users. Download our app today and experience the future of transportation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Download className="h-5 w-5 mr-2" />
                Download App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                Sign Up as Driver
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                <span>Available on iOS & Android</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                <span>Free to download</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                <span>No subscription fees</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
