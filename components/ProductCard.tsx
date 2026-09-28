"use client";

import { useCart } from "@/app/context/cartcontext";
import { Product } from "@/app/type/cart";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const router = useRouter();

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <Link href={`/product/${product._id}`} className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-800 block">
                {product.image ? (
                    <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover transition-transform hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
            </Link>
            <div className="p-5 flex flex-col flex-1">
                <Link href={`/product/${product._id}`}>
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium text-lg mb-4">₹{product.price.toFixed(2)}</p>
                <div className="mt-auto">
                    <button 
                        onClick={() => {
                            addToCart(product);
                            router.push("/product/checkout");
                        }}
                        className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
