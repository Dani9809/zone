import { RequestHandler } from "express";
// Import both types from our shared file
import type { Product, ProductDetail } from "@shared/api";

// --- Types for Printful's API responses ---

interface PrintfulSyncProduct {
  id: number;
  name: string;
  thumbnail_url: string;
  variants: number; // This is just a count in the list view
}

interface PrintfulSyncVariant {
  id: number;
  name: string; // e.g., "S", "M", "L"
  retail_price: string;
  [key: string]: any; // other properties
}

interface PrintfulDetailedSyncProduct {
  sync_product: {
    id: number;
    name: string;
    thumbnail_url: string;
    external_url: string; // The URL to the product on Printful
  };
  sync_variants: PrintfulSyncVariant[];
}

// --- API Handler for ALL Products (with Pagination) ---

export const handleGetProducts: RequestHandler = async (req, res) => {
  const apiKey = process.env.PRINTFUL_API_KEY?.trim();

  if (!apiKey) {
    console.error("Printful API key is not configured.");
    return res.status(500).json({ error: "API key is not configured." });
  }

  const authHeader = { "Authorization": `Bearer ${apiKey}` };
  let allBasicProducts: PrintfulSyncProduct[] = [];
  let offset = 0;
  let total = 0;
  const limit = 20; // Printful's default page size

  try {
    // 1. Loop to get all product IDs (handles pagination)
    do {
      const listResponse = await fetch(
        `https://api.printful.com/sync/products?offset=${offset}&limit=${limit}`,
        {
          method: "GET",
          headers: authHeader,
        }
      );

      if (!listResponse.ok) {
        const errorText = await listResponse.text();
        console.error("Printful API Error (List):", errorText);
        throw new Error(`Printful API error (List): ${listResponse.status} ${listResponse.statusText}`);
      }

      const listData = await listResponse.json();
      allBasicProducts = allBasicProducts.concat(listData.result);
      
      total = listData.paging.total;
      offset += listData.result.length;

    } while (offset < total);

    // 2. Fetch details for each product concurrently
    const productDetailPromises = allBasicProducts.map(async (basicProduct) => {
      const detailResponse = await fetch(
        `https://api.printful.com/sync/products/${basicProduct.id}`,
        {
          method: "GET",
          headers: authHeader,
        }
      );

      if (!detailResponse.ok) {
        console.error(`Failed to fetch details for product ${basicProduct.id}`);
        return null; // Skip this product if details fail
      }

      const detailData: { result: PrintfulDetailedSyncProduct } = await detailResponse.json();
      const { sync_product, sync_variants } = detailData.result;

      // 3. Map to the frontend Product interface
      return {
        id: sync_product.id.toString(),
        name: sync_product.name,
        price: parseFloat(sync_variants[0]?.retail_price || "0.00"),
        image: sync_product.thumbnail_url,
        description: `A high-quality "${sync_product.name}" available in ${sync_variants.length} variants.`,
        category: "Apparel",
      } as Product;
    });

    const productsWithDetails = await Promise.all(productDetailPromises);
    const products: Product[] = productsWithDetails.filter((p): p is Product => p !== null);

    res.status(200).json(products);

  } catch (error) {
    console.error("Error fetching Printful products:", error);
    res.status(500).json({ error: "Failed to fetch products from Printful." });
  }
};


// --- API Handler for a SINGLE Product ---

export const handleGetProductById: RequestHandler = async (req, res) => {
  const apiKey = process.env.PRINTFUL_API_KEY?.trim();
  const { id } = req.params;

  if (!apiKey) {
    console.error("Printful API key is not configured.");
    return res.status(500).json({ error: "API key is not configured." });
  }

  const authHeader = { "Authorization": `Bearer ${apiKey}` };

  try {
    const response = await fetch(`https://api.printful.com/sync/products/${id}`, {
      method: "GET",
      headers: authHeader,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Printful API Error (Product ${id}):`, errorText);
      throw new Error(`Printful API error (Product ${id}): ${response.status} ${response.statusText}`);
    }

    const data: { result: PrintfulDetailedSyncProduct } = await response.json();
    const { sync_product, sync_variants } = data.result;

    // Map to our detailed ProductDetail interface
    const productDetail: ProductDetail = {
      id: sync_product.id.toString(),
      name: sync_product.name,
      price: sync_variants[0]?.retail_price || "0.00",
      image: sync_product.thumbnail_url, // You might want to find a larger image if available
      fullDescription: `This premium, on-demand "${sync_product.name}" is crafted just for you.`, // Printful doesn't provide a long description
      category: "Apparel", // Mocked
      rating: 4.5, // Mocked
      reviews: 100, // Mocked
      specifications: sync_variants.map(v => v.name), // Using variant names as "specifications"
      sizes: sync_variants.map(v => v.name), // e.g., "S", "M", "L"
      external_url: sync_product.external_url, // The direct link to the product
    };

    res.status(200).json(productDetail);

  } catch (error) {
    console.error(`Error fetching Printful product ${id}:`, error);
    res.status(500).json({ error: `Failed to fetch product ${id} from Printful.` });
  }
};