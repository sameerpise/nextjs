// types/cart.ts

export interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}