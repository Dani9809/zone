/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Interface for the product list on the home page
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

/**
 * Interface for the detailed product page
 */
export interface ProductDetail {
  id: string;
  name: string;
  price: string;
  image: string;
  fullDescription: string;
  category: string;
  rating: number; // Mocked
  reviews: number; // Mocked
  specifications: string[];
  sizes: string[];
  external_url: string; // The Printful "buy" link
}