import Image from "next/image";
import Categories from "@/components/layout/Categories";
import FlashSales from "@/components/layout/FlashSales";
import { fetchProducts } from "@/lib/products";
import { ProductResponse } from "@/interfaces/product.interface";
import BrowseByCategories from "@/components/layout/BrowseByCategories";
import BestSellingProducts from "@/components/layout/BestSellingProducts";
import lineBetweenSections from "@/assets/images/lineBetweenSections.jpeg";
import SpeakerSection from "@/components/layout/SpeakerSection";
import OurProducts from "@/components/layout/OurProducts";
import NewArrivalsSection from "@/components/layout/NewArrivalsSection";
import Features from "@/components/layout/Features";
import LoginStatus from "@/components/LoginStatus";

export default async function Home() {
  let data: ProductResponse | null = null;

  try {
    data = await fetchProducts();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unknown error occurred");
    }
  }

  const products = data?.data || [];

  return (
    <>
      <div className="container mx-auto">
      </div>
      <Categories />
      <FlashSales products={products} />
      <div className="px-[135px] my-8">
        <Image
          src={lineBetweenSections}
          alt="line separator"
          layout="responsive"
        />
      </div>
      <BrowseByCategories />
      <div className="px-[135px] my-8">
        <Image
          src={lineBetweenSections}
          alt="line separator"
          layout="responsive"
        />
      </div>
      <BestSellingProducts />
      <SpeakerSection />
      <OurProducts />
      <NewArrivalsSection />
      <Features />
    </>
  );
}