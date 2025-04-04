import { writable } from 'svelte/store';
import type { Dessert } from '$lib/stores/desserts';

export type CartItem = {
	dessert: Dessert;
	quantity: number;
};

export const cartStore = writable<CartItem[]>([]);

export function updateCart(dessert: Dessert, quantity: number) {
	cartStore.update((items) => {
		const updatedItems = [...items];

		const existingItemIndex = updatedItems.findIndex((item) => item.dessert.name === dessert.name);

		if (existingItemIndex !== -1 && updatedItems[existingItemIndex]) {
			updatedItems[existingItemIndex].quantity = quantity;
		} else if (quantity > 0) {
			updatedItems.push({ dessert, quantity });
		}

		if (quantity === 0) {
			updatedItems.splice(existingItemIndex, 1);
		}

		return updatedItems;
	});
}
