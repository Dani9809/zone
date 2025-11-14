import Hero from "@/components/Hero";
import ProductCard, { type Product } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

// 1. Define the fetcher function
const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("/api/products");
  if (!response.ok) {
    throw new Error("Failed to fetch products from the server.");
  }
  return response.json();
};

// 2. Remove the hardcoded PRODUCTS array
// const PRODUCTS: Product[] = [ ... ];

export default function Index() {
  // 3. Use the useQuery hook to fetch data
  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ["products"], // This is the cache key
    queryFn: fetchProducts,
  });

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Products Section */}
      <section id="products" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
              Our Collection
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover motivational apparel designed for those who dare to dream big.
              Each piece is crafted with intention and sustainability in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 4. Add loading and error states */}
            {isLoading ? (
              // Show skeleton loaders while data is fetching
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-64 rounded-lg" />
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-1/2 rounded" />
                </div>
              ))
            ) : error ? (
              // Show an error message if the fetch fails
              <p className="text-destructive col-span-3 text-center">
                Error: {error.message}
              </p>
            ) : (
              // 5. Render the products from your API
              products?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}