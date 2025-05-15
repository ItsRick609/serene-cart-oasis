
import { Link } from 'react-router-dom';

export interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
}

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { id, name, image, productCount } = category;
  
  return (
    <Link to={`/category/${id}`} className="category-card h-40 group">
      <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:bg-black/20" />
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h3 className="text-white font-medium text-lg">{name}</h3>
        <p className="text-white/80 text-sm">{productCount} products</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
