import { readable } from 'svelte/store';
import dessertsData from '$lib/data/data.json';

interface Images {
	thumbnail?: string;
	mobile?: string;
	tablet?: string;
	desktop?: string;
}

export interface Dessert {
	image: Images;
	name: string;
	category: string;
	price: number;
}

export const desserts = readable<Dessert[]>(dessertsData);
