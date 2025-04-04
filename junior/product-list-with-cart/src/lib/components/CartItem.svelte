<script lang="ts">
	import type { Dessert } from '$lib/stores/desserts';
	import RemoveItem from './RemoveItem.svelte';

	export let dessert: Dessert;
	export let quantity: number;

	$: totalPrice = dessert.price * quantity;
</script>

<div class="flex items-center justify-between gap-2">
	<div class="grid gap-2">
		<p class="font-semibold text-rose-900">{dessert.name}</p>
		<div class="flex gap-4">
			<p class="text-red font-semibold">{quantity}x</p>
			<div class="flex gap-2">
				<p class=" text-rose-500">@ ${dessert.price.toFixed(2)}</p>
				<p class="font-semibold text-rose-500">${totalPrice.toFixed(2)}</p>
			</div>
		</div>
	</div>
	<RemoveItem {dessert} />
</div>
