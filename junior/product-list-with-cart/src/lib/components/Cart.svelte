<script lang="ts">
	import CartItem from './CartItem.svelte';
	import { cartStore } from '$lib/stores/cartStore';

	$: cartLength = $cartStore.reduce((acc, item) => acc + item.quantity, 0);

	$: totalPrice = $cartStore.reduce((acc, item) => acc + item.quantity * item.dessert.price, 0);

	function handleConfirmOrder() {
		const event = new CustomEvent('confirmOrder', {
			bubbles: true,
			composed: true
		});
		dispatchEvent(event);
	}
</script>

<div class="text-body-sm m-6 grid gap-6 rounded-xl bg-white p-6 text-rose-900 lg:max-w-sm">
	<h2 class="text-heading-sm text-red font-bold">Your Cart ({cartLength})</h2>
	<div class="grid gap-4">
		{#each $cartStore as { dessert, quantity }, index}
			<CartItem {dessert} {quantity} />
			{#if index < $cartStore.length - 1}
				<hr class="border-t border-rose-100" />
			{/if}
		{/each}
	</div>

	<hr class="border-t border-rose-100" />

	<div class="flex items-center justify-between">
		<h3>Order Total</h3>
		<p class="text-heading-sm font-bold">${totalPrice.toFixed(2)}</p>
	</div>

	<div class="flex items-center justify-center gap-2 rounded-lg bg-rose-50 px-2 py-4">
		<img class="size-5" src="/images/icon-carbon-neutral.svg" alt="Carbon Neutral" />
		<p>This is a <strong class="font-semibold">carbon-neutral</strong> delivery</p>
	</div>

	<button
		class="bg-red text-body-md button-hover w-full rounded-full py-4 font-semibold text-white hover:cursor-pointer"
		onclick={() => {
			handleConfirmOrder();
		}}
	>
		Confirm Order
	</button>
</div>
