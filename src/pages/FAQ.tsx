import { Card } from "@/components/ui/card";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "How do I register as a Rider?",
    answer: "Click on the Register button, select Rider as your role, and fill out the form."
  },
  {
    question: "How do Drivers accept rides?",
    answer: "Drivers can toggle their availability and accept incoming ride requests from the dashboard."
  },
  {
    question: "Can I cancel a ride?",
    answer: "Yes, Riders can cancel rides that have not yet been accepted by a driver."
  },
  {
    question: "How do I check my earnings as a Driver?",
    answer: "Your earnings dashboard shows daily, weekly, and monthly earnings with detailed ride history."
  },
  {
    question: "What should I do if I forget my password?",
    answer: "Use the Forgot Password option on the login page to reset your password via email."
  },
  {
    question: "How is the fare calculated?",
    answer: "Fare is dynamically calculated based on distance, time, and ride type selected."
  },
  {
    question: "Can I rate my driver?",
    answer: "Yes, after each ride, Riders can provide feedback and rate their driver."
  },
  {
    question: "How do I become a Driver?",
    answer: "Riders can apply to become a driver via the Driver Application form. Admin approval is required."
  },
  {
    question: "Is my location shared with the driver?",
    answer: "Yes, your pickup location is shared with the driver to ensure accurate ride matching."
  },
  {
    question: "Can I contact customer support?",
    answer: "Yes, our support team is available through the Contact form on the website."
  }
];

type Props = {
  searchParams?: { search?: string };
};

export default function FAQ({ searchParams }: Props) {
  const searchTerm = searchParams?.search?.toLowerCase() || "";

  // Filter FAQs server-side based on query param
  const filteredFAQs = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm) ||
      item.answer.toLowerCase().includes(searchTerm)
  );

  return (
    <section className="py-16 px-6 bg-background text-foreground">
      <div className="container mx-auto max-w-3xl space-y-8">
        <h2 className="text-4xl font-bold text-center">Frequently Asked Questions</h2>
        <p className="text-center text-lg">
          Find answers to common questions about our Ride Booking platform.
        </p>

        <form className="flex justify-center mt-4" method="GET">
          <input
            type="text"
            name="search"
            placeholder="Search FAQs..."
            defaultValue={searchTerm}
            className="border rounded-l-md px-4 py-2 w-64 bg-card text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <Card key={index} className="p-4">
                <h3 className="font-semibold text-lg">{item.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted-foreground">No FAQs match your search.</p>
          )}
        </div>
      </div>
    </section>
  );
}
