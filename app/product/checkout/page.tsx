"use client";

import { useState } from "react";
import { useCart } from "@/app/context/cartcontext";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
    const { cart, subtotal, totalItems } = useCart();
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Future integration: Razorpay would add some extra fees or taxes, let's just add a flat shipping rate for now
    const shippingRate = 99;
    const total = subtotal > 0 ? subtotal + shippingRate : 0;

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate processing - In the future, this is where you'd initialize Razorpay
        setTimeout(() => {
            alert("Razorpay integration will be added here! Your total is ₹" + total.toFixed(2));
            setIsProcessing(false);
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 md:p-8 flex flex-col items-center justify-center min-h-[50vh]">
                <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-full mb-6">
                    <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h1 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">Your Cart is Empty</h1>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/product" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-8 w-full">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Checkout Form */}
                <div className="lg:col-span-7 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
                    <form onSubmit={handleCheckout} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Name</label>
                                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Last Name</label>
                                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="Doe" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
                            <input required type="email" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="john@example.com" />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Phone Number</label>
                            <input required type="tel" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="+91 98765 43210" />
                        </div>
                        
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Shipping Address</label>
                            <textarea required rows={3} className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="123 Main St, Apartment 4B"></textarea>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">City</label>
                                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="Mumbai" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">PIN Code</label>
                                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400" placeholder="400001" />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-6">
                            <button 
                                type="submit" 
                                disabled={isProcessing}
                                className="w-full bg-indigo-600 text-white px-6 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isProcessing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </>
                                ) : (
                                    "Proceed to Pay with Razorpay"
                                )}
                            </button>
                            <p className="text-xs text-center text-zinc-500 mt-4 flex items-center justify-center">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                Secure payment powered by Razorpay (Coming Soon)
                            </p>
                        </div>
                    </form>
                </div>
                
                {/* Order Summary */}
                <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm sticky top-6">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                        {cart.map((item) => (
                            <div key={item._id} className="flex gap-4 items-center">
                                <div className="relative w-16 h-16 bg-white dark:bg-zinc-800 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 flex-shrink-0">
                                    {item.image ? (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate">{item.name}</h4>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">Qty: {item.quantity}</p>
                                </div>
                                <div className="font-medium text-sm">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="space-y-3 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-sm">
                        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                            <span>Subtotal ({totalItems} items)</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                            <span>Shipping</span>
                            <span className="font-medium text-zinc-900 dark:text-zinc-100">₹{shippingRate.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
