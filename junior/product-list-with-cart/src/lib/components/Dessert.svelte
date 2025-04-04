<script lang="ts">
  import type { Dessert } from "$lib/stores/desserts";
  import AddToCart from "./AddToCart.svelte";

  export let dessert: Dessert;

  export let { image, name, category, price} = dessert

  export let isInCart: boolean = false;
  
</script>

<div id="{name}" class="flex flex-col gap-4">
  <div class="relative w-fit mb-6 rounded-lg {isInCart ? 'outline-2 outline-red' : ''}">
    <picture>
      <source media="(max-width: 640px)" srcset="{image.mobile}">
      <source media="(max-width: 1024px)" srcset="{image.tablet}">
      <img class="rounded-lg" src="{image.desktop}" alt="{name}">
    </picture>
    <div class="absolute -bottom-6 w-full flex justify-center">
      <AddToCart {dessert}/>
    </div>
  </div>
  <div class="flex flex-col gap-1">
    <p class="text-body-sm text-rose-500">{category}</p>
    <p class="text-body-lg font-semibold text-rose-900">{name}</p>
    <p class="text-body-lg font-semibold text-red">${price.toFixed(2)}</p>
  </div>
</div>