import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex border-b border-neutral-300 mb-lg">
      {categories.map((category) => (
        <button
          key={category}
          className={`py-sm px-md text-sm font-medium transition-colors duration-200
            ${activeCategory === category
              ? 'border-b-2 border-primary text-primary'
              : 'text-neutral-400 hover:text-neutral-500'
            }`}
          onClick={() => onSelectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
