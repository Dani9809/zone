import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ProductDetail } from "@shared/api"; // Import our new type
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// 1. Remove the hardcoded PRODUCTS and SIZES constants

// 2. Define the fetcher function
const fetchProductDetail = async (id: string): Promise<ProductDetail> => {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product details from the server.");
  }
  return response.json();
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  // 3. Use useQuery to fetch the product data
  const { data: product, isLoading, error } = useQuery<ProductDetail>({
    queryKey: ["product", id],
    queryFn: () => fetchProductDetail(id!),
    enabled: !!id, // Only run the query if id is present

    
  });

  // 4. Handle the "Buy" button click
  const handleBuyOnPrintful = () => {
    // This button is for you, the store owner, to process the order.
    // This will redirect to the "New Order" page in your Printful dashboard.
    if (selectedSize) {
      const printfulOrderUrl = `https://www.printful.com/dashboard/orders/new`;
      window.open(printfulOrderUrl, "_blank");
    } else {
      // This will just ensure the check still runs
      console.log("Please select a size.");
    }
  };

  // 6. Handle Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-32 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="space-y-6">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-1/2" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 flex-1" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 7. Handle Error or Not Found
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            {error ? error.message : "Sorry, we couldn't find the product you're looking for."}
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

  // 8. Render the page with live data
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
                ${product.price}
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
                {product.sizes.map((size) => (
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