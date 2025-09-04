import React, { useState } from "react";
import { toast } from "sonner";

const SOSButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const phone = "01867418698";
  const email = "munnamia0200@gmail.com";

  const handleSOS = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const message = `SOS! I need help. My location: ${locationLink}`;

        // WhatsApp link
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

        // Email link
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent("SOS Help")}&body=${encodeURIComponent(message)}`;

        // Open links in new tabs
        window.open(whatsappUrl, "_blank");
        window.open(mailtoLink, "_blank");

        toast.success("SOS initiated!");
      },
      (err) => {
        console.error(err);
        toast.error("Failed to get location");
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition"
      >
        SOS
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 relative">
            <h2 className="text-xl font-bold mb-4 text-red-600">Emergency Contacts</h2>
            <p className="mb-2"><strong>Phone/WhatsApp:</strong> {phone}</p>
            <p className="mb-4"><strong>Email:</strong> {email}</p>

            <div className="flex gap-4">
              <button
                onClick={handleSOS}
                className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
              >
                WhatsApp & Email
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 bg-gray-300 text-black py-2 rounded hover:bg-gray-400 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SOSButton;
