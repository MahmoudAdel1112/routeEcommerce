import { fetchBrands } from "@/lib/brands";

import Image from "next/image";
import Link from "next/link";

export default async function BrandsPage() {
  const { data: brands } = await fetchBrands();

  return (
    <div className="container mx-auto px-[135px] py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Brands</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="relative h-48">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  layout="fill"
                  objectFit="contain"
                  className="p-4"
                />
              </div>
              <div className="p-4 bg-gray-50">
                <h2 className="text-lg font-semibold text-center">
                  {brand.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
