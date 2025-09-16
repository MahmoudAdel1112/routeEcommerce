import Image from "next/image";
import newArrivalsImage from "@/assets/images/newArrivals.jpeg";

export default function NewArrivalsSection() {
  return (
    <div className="section-padding">
      <Image
        src={newArrivalsImage}
        alt="New Arrivals"
        layout="responsive"
        width={100}
        height={100}
        style={{ width: "100%", height: "auto", color: "white" }}
      />
    </div>
  );
}
