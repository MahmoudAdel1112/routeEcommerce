import Image from "next/image";
import speakerImage from "@/assets/images/speakerImage.jpeg";

export default function SpeakerSection() {
  return (
    <div className="section-padding">
      <Image
        src={speakerImage}
        alt="Speaker"
        layout="responsive"
        width={100}
        height={100}
        quality={100}
        priority={true}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
