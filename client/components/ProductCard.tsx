import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-card rounded-lg overflow-hidden border border-border/10 hover:border-border/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-body font-semibold">
            {product.category}
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5">
          <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-heading font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <ArrowRight className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
