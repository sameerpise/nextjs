import { Product } from "../type/cart";
import ProductCard from "@/components/ProductCard";

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch('http://localhost:5001/api/products', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    } catch (error) {
        console.error("Error fetching products:", error);
        return []; // return empty array on failure so page doesn't crash completely
    }
}

export default async function ProductPage() {
    const products = await getProducts();

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8 w-full">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Our Products</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Browse our latest collection of premium tech gear.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.length > 0 ? (
                    products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-zinc-500 dark:text-zinc-400">
                        <p>No products available right now. Make sure your product-service is running!</p>
                    </div>
                )}
            </div>
        </div>
    );
}