<script lang="ts">
	import type { Dessert } from '$lib/stores/desserts';
	import AddToCart from './AddToCart.svelte';

	export let dessert: Dessert;

	export let { image, name, category, price } = dessert;

	export let isInCart: boolean = false;
</script>

<div id={name} class="flex flex-col gap-4">
	<div class="relative mb-6 w-fit rounded-lg {isInCart ? 'outline-red outline-2' : ''}">
		<picture>
			<source media="(max-width: 640px)" srcset={image.mobile} />
			<source media="(max-width: 1024px)" srcset={image.tablet} />
			<img class="rounded-lg" src={image.desktop} alt={name} />
		</picture>
		<div class="absolute -bottom-6 flex w-full justify-center">
			<AddToCart {dessert} />
		</div>
	</div>
	<div class="flex flex-col gap-1">
		<p class="text-body-sm text-rose-500">{category}</p>
		<p class="text-body-lg font-semibold text-rose-900">{name}</p>
		<p class="text-body-lg text-red font-semibold">${price.toFixed(2)}</p>
	</div>
</div>
