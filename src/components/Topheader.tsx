import Image from "next/image";
import vector from "@/assets/images/Vector.png";

export default function Topheader() {
  return (
    <div className="w-full h-12 px-[135px] bg-black">
      <div className="lg:grid grid-cols-5 items-center w-full h-full   text-white text-sm  hidden ">
        <div></div>
        <div
          className="flex gap-2 col-span-3 items-center justify-self-center"
          id="marketing"
        >
          <p>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          </p>
          <p className="font-semibold underline">ShopNow</p>
        </div>
        <div
          className="flex items-center  gap-1 justify-self-end"
          id="language"
        >
          <p>English</p>
          <Image src={vector} width={10} height={10} alt="drop down icon" />
        </div>
      </div>
    </div>
  );
}
