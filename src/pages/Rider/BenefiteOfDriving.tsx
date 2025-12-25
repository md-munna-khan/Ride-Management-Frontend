import { ApplyAsDriver } from "./ApplyAsDriver";

export default function BenefiteOfDriving() {
  const benefits = [
    {
      title: "Freedom & Flexibility",
      desc: "Driving gives you full control over your schedule, routes, and travel time without depending on public transport.",
      icon: "🚗",
    },
    {
      title: "Time Saving",
      desc: "Reach destinations faster by avoiding unnecessary stops and delays common in public transportation.",
      icon: "⏱️",
    },
    {
      title: "Comfort & Privacy",
      desc: "Enjoy personal space, climate control, and a comfortable environment while traveling.",
      icon: "🛋️",
    },
    {
      title: "Emergency Readiness",
      desc: "Driving skills help you respond quickly during emergencies or unexpected situations.",
      icon: "🚨",
    },
    {
      title: "Career Opportunities",
      desc: "Many jobs require driving skills, opening doors to more employment opportunities.",
      icon: "💼",
    },
    {
      title: "Family Convenience",
      desc: "Easily manage family trips, school drop-offs, and grocery shopping without hassle.",
      icon: "👨‍👩‍👧‍👦",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Benefits of Driving
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Learning to drive is more than a skill — it empowers independence,
            saves time, and enhances your lifestyle.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-white rounded-3xl shadow-lg p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Ready to Start Your Driving Journey?
            </h3>
            <p className="mt-2 text-gray-600 max-w-xl">
              Apply as a driver today and take control of your future with
              flexible opportunities and reliable income.
            </p>
          </div>

          <ApplyAsDriver />
        </div>
      </div>
    </section>
  );
}
