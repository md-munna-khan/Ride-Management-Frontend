import { Car, Bike, Crown, Users } from "lucide-react";

const rideCategories = [
  {
    id: 1,
    title: "Economy Ride",
    description: "Affordable rides for everyday travel",
    icon: Car,
  },
//   {
//     id: 2,
//     title: "Standard Ride",
//     description: "Comfortable rides at reasonable price",
//     // icon: Taxi,
//   },
  {
    id: 3,
    title: "Premium Ride",
    description: "Luxury rides with premium comfort",
    icon: Crown,
  },
  {
    id: 4,
    title: "Bike Ride",
    description: "Fast and budget friendly bike rides",
    icon: Bike,
  },
  {
    id: 5,
    title: "Shared Ride",
    description: "Share your ride and save money",
    icon: Users,
  },
];

const Categories = () => {
  return (
    <div className="py-10 ">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Ride Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
        {rideCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              className="border rounded-xl p-5 text-center hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex justify-center mb-4">
                <Icon size={36} className="text-primary" />
              </div>

              <h3 className="text-lg font-medium">{category.title}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {category.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
