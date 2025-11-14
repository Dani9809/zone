import Hero from "@/components/Hero";
import ProductCard, { type Product } from "@/components/ProductCard";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Dream Big Hoodie",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1556821840-bf63daf1001d?w=500&h=500&fit=crop",
    description:
      "Premium comfort hoodie with an inspiring message. Perfect for daily wear and motivation.",
    category: "Apparel",
  },
  {
    id: "2",
    name: "Limitless T-Shirt",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    description:
      "Timeless classic tee made from sustainable materials. Express your limitless potential.",
    category: "Apparel",
  },
  {
    id: "3",
    name: "Achieve Cap",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=500&fit=crop",
    description:
      "Sleek and modern cap to keep you focused on your goals. Weather any season.",
    category: "Accessories",
  },
  {
    id: "4",
    name: "Vision Hoodie",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=500&h=500&fit=crop",
    description:
      "Premium heavyweight hoodie with bold vision print. Street style meets motivation.",
    category: "Apparel",
  },
  {
    id: "5",
    name: "Rise Socks",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1556821840-bf63daf1001d?w=500&h=500&fit=crop",
    description:
      "Keep your feet comfortable with premium socks that remind you to rise. 3-pack.",
    category: "Accessories",
  },
  {
    id: "6",
    name: "Victory Joggers",
    price: 64.99,
    image:
      "https://images.unsplash.com/photo-1506629082632-696c5e5ef205?w=500&h=500&fit=crop",
    description:
      "Comfortable and stylish joggers for your active lifestyle. Every step is a victory.",
    category: "Apparel",
  },
];

export default function Index() {
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
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
