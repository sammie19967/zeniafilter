// components/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  images?: string[];
  location?: {
    county: string;
  };
  listingType?: 'sale' | 'hire';
  description: string;
  createdAt: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link href={`/products/${product._id}`}>
        <div className="relative h-48 w-full">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No image</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
        </Link>
        
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-xl">Ksh {product.price.toLocaleString()}</span>
          {product.location && (
            <span className="text-sm text-gray-600">{product.location.county}</span>
          )}
        </div>
        
        {product.listingType && (
          <div className="mb-2">
            <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${
              product.listingType === 'sale' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {product.listingType === 'sale' ? 'For Sale' : 'For Hire'}
            </span>
          </div>
        )}
        
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="text-xs text-gray-500">
          {new Date(product.createdAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;