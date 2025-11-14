import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ShoppingCart, Star } from "lucide-react";

const PRODUCTS: Record<string, any> = {
  "1": {
    id: "1",
    name: "Dream Big Hoodie",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1556821840-bf63daf1001d?w=800&h=800&fit=crop",
    description:
      "Premium comfort hoodie with an inspiring message. Perfect for daily wear and motivation.",
    category: "Apparel",
    rating: 4.8,
    reviews: 128,
    fullDescription:
      "This premium hoodie is crafted from 100% organic cotton with a soft fleece lining. The 'Dream Big' message is screen-printed with eco-friendly ink, making it both comfortable and sustainable. Perfect for motivation on chilly days.",
    specifications: [
      "100% Organic Cotton",
      "Fleece Lining",
      "Eco-friendly Ink",
      "Machine Washable",
      "Available in 5 colors",
    ],
  },
  "2": {
    id: "2",
    name: "Limitless T-Shirt",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
    description:
      "Timeless classic tee made from sustainable materials. Express your limitless potential.",
    category: "Apparel",
    rating: 4.6,
    reviews: 94,
    fullDescription:
      "A versatile classic tee made from 100% organic cotton. The minimalist 'Limitless' design makes it perfect for everyday wear, gym sessions, or layering. Available in multiple colors.",
    specifications: [
      "100% Organic Cotton",
      "Breathable Fabric",
      "Eco-friendly Dye",
      "Unisex Fit",
      "Available in 8 colors",
    ],
  },
  "3": {
    id: "3",
    name: "Achieve Cap",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=800&h=800&fit=crop",
    description:
      "Sleek and modern cap to keep you focused on your goals. Weather any season.",
    category: "Accessories",
    rating: 4.7,
    reviews: 67,
    fullDescription:
      "This modern cap features an adjustable back and breathable mesh panels. The embroidered 'Achieve' logo is perfect for making a statement. Weather-resistant and perfect for any season.",
    specifications: [
      "Cotton + Polyester Blend",
      "Adjustable Back",
      "Breathable Mesh",
      "Embroidered Logo",
      "One Size Fits All",
    ],
  },
};

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const product = id && PRODUCTS[id];

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const handleBuyOnPrintful = () => {
    if (selectedSize) {
      window.open(
        `https://www.printful.com`,
        "_blank"
      );
    }
  };

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="font-body">Back to Shop</span>
        </button>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square bg-secondary rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div>
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-body font-semibold mb-3">
                {product.category}
              </span>
              <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-5xl font-heading font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="font-heading font-bold text-foreground mb-4">
                Specifications
              </h3>
              <ul className="space-y-2">
                {product.specifications.map((spec: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selector */}
            <div className="mb-8">
              <h3 className="font-heading font-bold text-foreground mb-4">
                Select Size
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-4 rounded-lg font-heading font-bold transition-all border-2 ${
                      selectedSize === size
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-sm text-primary mt-3">
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity and Buy Button */}
            <div className="flex gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 hover:bg-secondary transition-colors"
                >
                  −
                </button>
                <span className="px-6 py-3 font-body font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 hover:bg-secondary transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleBuyOnPrintful}
                disabled={!selectedSize}
                className={`flex-1 py-3 px-6 rounded-lg font-heading font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  selectedSize
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Buy on Printful
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-4 bg-secondary rounded-lg border border-border/10">
              <p className="text-sm text-muted-foreground">
                <span className="font-body font-semibold text-foreground">
                  Free Shipping
                </span>{" "}
                on orders over $100. Ships within 3-5 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
