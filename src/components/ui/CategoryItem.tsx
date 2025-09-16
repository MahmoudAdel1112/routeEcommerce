import { Category } from "@/interfaces/categories.interfaces";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <Link href={`/categories/${category._id}`}>
      <div className="cursor-pointer group border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center gap-4 hover:bg-[var(--secondary-two)] transition-colors duration-300 h-48">
        <div className="w-24 h-24 relative">
          <Image
            src={category.image}
            alt={category.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <p className="text-base font-medium text-black group-hover:text-white text-center">
          {category.name}
        </p>
      </div>
    </Link>
  );
}
