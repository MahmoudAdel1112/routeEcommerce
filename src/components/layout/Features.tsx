"use client";
import { ArrowUp, ShieldCheck, Headset, Truck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck size={40} />,
      title: "FREE AND FAST DELEVERY",
      description: "free delevery for all orders above 140$",
    },
    {
      icon: <Headset size={40} />,
      title: "24/7 CUSTOMER SERVICE",
      description: "friendly 24/7 customer support",
    },
    {
      icon: <ShieldCheck size={40} />,
      title: "MONEY BACK GURANTE",
      description: "we return money within 30 days",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto my-20">
      <div className="flex justify-center items-center gap-20">
        {features.map((feature, index) => (
          <div key={index} className="text-center flex flex-col items-center">
            <div className="bg-black border-8 border-gray-400 rounded-full p-4 inline-block">
              <div className="text-white">{feature.icon}</div>
            </div>
            <h3 className="text-xl font-semibold mt-6">{feature.title}</h3>
            <p className="mt-2 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-10">
        <button
          onClick={scrollToTop}
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold p-4 rounded-full"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </div>
  );
};

export default Features;
