"use client";

import { useCart } from "@/app/context/cartcontext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalItems, subtotal } = useCart();

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 w-full">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart ({totalItems} items)</h1>
            
            {cart.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-lg">Your cart is empty.</p>
                    <Link href="/explore" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col gap-8">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {cart.map((item) => (
                                <li key={item._id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0">
                                            {item.image ? (
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">{item.name}</h3>
                                            <p className="text-zinc-500 dark:text-zinc-400 font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 self-end sm:self-auto">
                                        <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
                                            <button 
                                                onClick={() => decreaseQuantity(item._id)}
                                                className="px-3 py-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                                aria-label="Decrease quantity"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                            </button>
                                            <span className="px-3 py-1.5 min-w-[2.5rem] text-center font-medium border-x border-zinc-200 dark:border-zinc-700">
                                                {item.quantity}
                                            </span>
                                            <button 
                                                onClick={() => increaseQuantity(item._id)}
                                                className="px-3 py-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 hover:text-red-600 p-2 transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-1 w-full md:w-auto">
                            <span className="text-zinc-500 dark:text-zinc-400 font-medium">Order Total</span>
                            <span className="font-bold text-3xl tracking-tight text-zinc-900 dark:text-zinc-100">${subtotal.toFixed(2)}</span>
                        </div>
                        <Link href="/product/checkout" className="w-full md:w-auto bg-indigo-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-500/20 transition-all text-lg text-center">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
