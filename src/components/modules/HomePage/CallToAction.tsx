import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 px-6 text-center bg-primary text-primary-foreground rounded-2xl shadow-lg">
      <h2 className="text-4xl font-bold mb-4">Ready to Ride?</h2>
      <p className="text-lg mb-6">
        Book your next ride now and experience the difference.
      </p>
      <Button className="bg-accent text-accent-foreground hover:opacity-90 transition px-8 py-3 rounded-xl">
        Get Started
      </Button>
    </section>
  );
};

export default CallToAction;
