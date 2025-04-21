<script lang="ts">
	import { toCamelCase } from '$lib/utils/toCamelCase';

	let { value, radioIdentifier, group } = $props();
</script>

<label
	for={toCamelCase(value)}
	class="hover:border-lime has-checked:border-lime flex cursor-pointer items-center gap-4 rounded-sm border border-slate-500 px-4 py-3 has-checked:bg-[hsl(from_var(--color-lime)_h_s_95%)] select-none"
>
	<input
		type="radio"
		name={radioIdentifier}
		id={toCamelCase(value)}
    value={toCamelCase(value)}
    bind:group
		class="border-2 rounded-full appearance-none checked:border-lime size-5 relative border-slate-500"
	/>
	<p class="font-bold text-body-lg text-slate-900">{value}</p>
</label>

<style>
  input[type="radio"]:checked::after {
    content: "";
    position: absolute;
    display: block;
    width: 0.7em;
    height: 0.7em;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: var(--color-lime);
  }
</style>
