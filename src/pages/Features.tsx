import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Features() {
  return (
  <section className="py-16 px-6 bg-background text-foreground">
      <div className="container mx-auto space-y-12 text-center">
        <h2 className="text-4xl font-bold">Our Platform Features</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Our ride booking system provides tailored experiences for Riders, Drivers, and Admins,
          ensuring smooth operations, real-time updates, and robust management.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Rider Features */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle>Riders</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-2">
              <ul className="list-disc ml-5">
                <li>Request, cancel, and track rides in real-time</li>
                <li>Fare estimation with dynamic pricing</li>
                <li>Driver feedback system</li>
                <li>Ride history with search and filter options</li>
                <li>Profile management (name, phone, password)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Driver Features */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle>Drivers</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-2">
              <ul className="list-disc ml-5">
                <li>Availability control (online/offline)</li>
                <li>Accept or reject ride requests</li>
                <li>Update ride statuses (Accepted → Picked Up → In Transit → Completed)</li>
                <li>Earnings dashboard with summary</li>
                <li>Profile management including vehicle details</li>
              </ul>
            </CardContent>
          </Card>

          {/* Admin Features */}
          <Card className="bg-card text-card-foreground shadow-lg">
            <CardHeader>
              <CardTitle>Admins</CardTitle>
            </CardHeader>
            <CardContent className="text-left space-y-2">
              <ul className="list-disc ml-5">
                <li>Manage all users (block/unblock riders, approve/suspend drivers)</li>
                <li>View all rides with filters (date, status, driver, rider)</li>
                <li>Analytics dashboard with charts and summaries</li>
                <li>Search and filter tools across listings</li>
                <li>Profile management (name, email, password)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
