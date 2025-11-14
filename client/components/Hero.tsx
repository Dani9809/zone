export default function Hero() {
  const handleShopClick = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary">
      {/* Background decorative element */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6 leading-tight">
            Wear Your{" "}
            <span className="text-primary relative inline-block">
              Dreams.
              <div className="absolute -bottom-2 left-0 w-24 h-1 bg-primary rounded-full opacity-30"></div>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg leading-relaxed">
            Express your unique style with our curated collection of sustainable,
            motivational fashion. Designed for dreamers, made for achievers.
          </p>

          <button
            onClick={handleShopClick}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-heading font-bold text-lg hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}
