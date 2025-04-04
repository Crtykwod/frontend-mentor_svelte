<script lang="ts">
	import { updateCart } from '$lib/stores/cartStore';
	import type { Dessert } from '$lib/stores/desserts';

	export let dessert: Dessert;

	let quantity: number = 0;
	let inputValue: string = '0';

	function handleInput(event: Event) {
		const value = (event.target as HTMLInputElement)?.value;

		inputValue = value;

		if (value !== '') quantity = Number(value);
		updateCart(dessert, Number(value));
	}

	function handleBlur() {
		if (inputValue === '' || inputValue === '0') quantity = 0;
	}
</script>

{#if quantity === 0}
	<button
		class="text-body-sm hover:border-red hover:text-red inline-flex w-full max-w-40 gap-2 rounded-full border-2 border-rose-400 bg-white px-6 py-3 font-medium text-rose-900 transition-colors duration-150 ease-in-out select-none hover:cursor-pointer"
		onclick={() => {
			quantity++;
			updateCart(dessert, quantity);
		}}
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"
			><g fill="#C73B0F" clip-path="url(#a)"
				><path
					d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
				/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" /></g
			><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z" /></clipPath></defs></svg
		>
		Add to Cart
	</button>
{/if}

{#if quantity > 0}
	<div
		class="text-body-sm bg-red border-red button-hover inline-flex w-full max-w-40 justify-between rounded-full border-2 px-3 py-3 font-medium text-white select-none hover:cursor-pointer"
	>
		<button
			class="hover:fill-red flex size-5 items-center justify-center rounded-full border border-white fill-white hover:cursor-pointer hover:bg-white"
			onclick={() => {
				quantity--;
				updateCart(dessert, quantity);
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2"
				><path d="M0 .375h10v1.25H0V.375Z" /></svg
			>
			<span class="sr-only">Subtract item</span>
		</button>
		<input
			class="w-10 border-white/80 text-center outline-none focus:border-b"
			type="number"
			min="0"
			value={quantity}
			oninput={handleInput}
			onblur={handleBlur}
			onkeydown={(e) => {
				const allowedKeys = [
					'Backspace',
					'Delete',
					'ArrowLeft',
					'ArrowRight',
					'ArrowUp',
					'ArrowDown',
					'Tab',
					'Enter'
				];
				if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
					e.preventDefault();
				}
			}}
		/>
		<button
			class="hover:fill-red flex size-5 items-center justify-center rounded-full border border-white fill-white hover:cursor-pointer hover:bg-white"
			onclick={() => {
				quantity++;
				updateCart(dessert, quantity);
			}}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"
				><path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" /></svg
			>
			<span class="sr-only">Add item</span>
		</button>
	</div>
{/if}

<style>
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>
