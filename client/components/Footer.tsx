import { Mail } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-secondary border-t border-border/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              About DreamWear
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We believe in empowering individuals to express themselves through
              beautiful, sustainable fashion. Wear your dreams, live your truth.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#products"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">
              Newsletter
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to get updates on new releases and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-body font-medium"
              >
                <Mail className="w-4 h-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-primary text-sm mt-2">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/10 pt-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2024 DreamWear. All rights reserved. | Powered with dreams and
            creativity
          </p>
        </div>
      </div>
    </footer>
  );
}
