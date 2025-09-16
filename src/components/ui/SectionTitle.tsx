import React from "react";

interface SectionTitleProps {
  children: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
  const capitalizeFirstWord = (text: string) => {
    const words = text.split(" ");
    if (words.length > 0) {
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    }
    return words.join(" ");
  };

  const capitalizedChildren = capitalizeFirstWord(children);

  return (
    <div className="flex items-center ">
      <h2 className="relative pl-6 text-[#DB4444] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-5 before:h-[150%] before:bg-[#DB4444] before:rounded-sm">
        {capitalizedChildren}
      </h2>
    </div>
  );
};

export default SectionTitle;
