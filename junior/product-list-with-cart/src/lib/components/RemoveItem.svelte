<script lang="ts">
	import { updateCart } from '$lib/stores/cartStore';

	export let dessert;
</script>

<button
	class=" flex size-5 items-center justify-center rounded-full border-2 border-rose-400 fill-rose-400 transition-colors duration-200 ease-in-out hover:cursor-pointer hover:border-rose-900 hover:fill-rose-900"
	onclick={() => updateCart(dessert, 0)}
>
	<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10"
		><path
			d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
		/></svg
	>
	<span class="sr-only">Remove Item</span>
</button>
