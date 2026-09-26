"use client";

import { Product } from "../type/cart";
import ProductCard from "@/components/ProductCard";

export const SAMPLE_PRODUCTS: Product[] = [
    {
        _id: "1",
        name: "Premium Wireless Headphones",
        price: 4999,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    },
    {
        _id: "2",
        name: "Mechanical Keyboard",
        price: 8999,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80",
    },
    {
        _id: "3",
        name: "Ergonomic Mouse",
        price: 2499,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80",
    },
    {
        _id: "4",
        name: "4K Monitor",
        price: 24999,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80",
    },
];

export default function ProductPage() {
    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8 w-full">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Our Products</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Browse our latest collection of premium tech gear.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {SAMPLE_PRODUCTS.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
}