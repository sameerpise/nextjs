"use client";

import { use } from "react";
import { SAMPLE_PRODUCTS } from "../page";
import Image from "next/image";
import { useCart } from "@/app/context/cartcontext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const product = SAMPLE_PRODUCTS.find((p) => p._id === slug);
    const { addToCart } = useCart();
    const router = useRouter();

    if (!product) {
        return (
            <div className="max-w-6xl mx-auto p-6 md:p-8 flex flex-col items-center justify-center min-h-[50vh]">
                <h1 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Product Not Found</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">The product you are looking for does not exist or has been removed.</p>
                <Link href="/product" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                    Back to Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8 w-full">
            <Link href="/product" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 mb-8 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Products
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="relative w-full aspect-square bg-zinc-100 dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                    {product.image ? (
                        <Image 
                            src={product.image} 
                            alt={product.name} 
                            fill 
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                            <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>
                
                <div className="flex flex-col py-4">
                    <h1 className="text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-zinc-50">{product.name}</h1>
                    <p className="text-3xl font-semibold text-indigo-600 dark:text-indigo-400 mb-6">₹{product.price.toFixed(2)}</p>
                    
                    <div className="text-zinc-600 dark:text-zinc-300 mb-8 space-y-4 text-lg">
                        <p>This is a premium product designed with the highest quality materials and state-of-the-art technology. It perfectly balances aesthetics, performance, and durability.</p>
                        <ul className="list-disc pl-5 mt-4 space-y-2 text-base">
                            <li>Premium build quality</li>
                            <li>Sleek and modern design</li>
                            <li>Excellent performance</li>
                            <li>1-year warranty included</li>
                        </ul>
                    </div>
                    
                    <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-zinc-800">
                        <button 
                            onClick={() => {
                                addToCart(product);
                                router.push("/product/checkout");
                            }}
                            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 hover:shadow-md transition-all flex items-center justify-center"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
