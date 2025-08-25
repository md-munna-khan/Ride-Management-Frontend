import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const HowItWorks = () => {
  return (
  <section className="py-16 px-6 text-center">
      <h2 className="text-3xl font-bold mb-8 text-foreground">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <Card className="bg-card text-card-foreground shadow">
          <CardHeader>
            <CardTitle>1. Choose Your Ride</CardTitle>
          </CardHeader>
          <CardContent>
            Select from a variety of vehicles that suit your needs.
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground shadow">
          <CardHeader>
            <CardTitle>2. Confirm Booking</CardTitle>
          </CardHeader>
          <CardContent>
            Enter your details and confirm your ride instantly.
          </CardContent>
        </Card>
        <Card className="bg-card text-card-foreground shadow">
          <CardHeader>
            <CardTitle>3. Enjoy the Journey</CardTitle>
          </CardHeader>
          <CardContent>
            Sit back and relax while our drivers take you safely.
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowItWorks;
