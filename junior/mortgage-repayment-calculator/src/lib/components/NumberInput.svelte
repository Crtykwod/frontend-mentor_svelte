<script lang="ts">
	import { toCamelCase } from '$lib/utils/toCamelCase';
  import { formatCurrency, formatNumber } from '$lib/utils/formatting';

  let { prefix, title, text, error = "", currency = false } = $props();

</script>

<label
	for={toCamelCase(title)}
	class="text-body-lg flex min-w-0 flex-col gap-3 font-bold text-slate-700 h-fit"
>
	<p class="text-body-md font-medium">{title}</p>
	<div
		class="group focus-within:border-lime hover:focus-within:border-lime flex flex-auto justify-between rounded-sm border border-slate-500 hover:border-slate-900"
	>
		{#if prefix}
			<span
				class="group-focus-within:bg-lime rounded-l-sm bg-slate-100 px-4 py-3 group-focus-within:text-slate-900"
			>
				{text}
			</span>
		{/if}
		<input
			class="peer w-full shrink px-4 py-3 text-slate-900"
			type="text"
      inputmode="numeric"
			id={toCamelCase(title)}
			name={toCamelCase(title)}
      oninput={currency ? formatCurrency : formatNumber}
		/>
		{#if !prefix}
			<span
				class="group-focus-within:bg-lime rounded-r-sm bg-slate-100 px-4 py-3 group-focus-within:text-slate-900"
			>
				{text}
			</span>
		{/if}
	</div>
	{#if error}
		<p class="text-red text-body-sm font-medium">{error}</p>
	{/if}
</label>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='text'] {
		appearance: textfield;
		-moz-appearance: textfield;
		outline: none;
	}
</style>
