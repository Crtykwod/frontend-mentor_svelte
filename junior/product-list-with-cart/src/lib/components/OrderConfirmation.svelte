<script lang="ts">
  import { cartStore } from "$lib/stores/cartStore";

  export let open = false;

  $: totalPrice = $cartStore.reduce((acc, item) => acc + item.quantity * item.dessert.price, 0);
</script>

{#if open}
<dialog class="flex flex-col gap-8 bg-white rounded-xl p-6 py-10 sm:p-10 w-full max-w-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-brightness-50 backdrop-blur-sm">
  <div class="flex flex-col gap-2">
    <img class="size-10" src="/images/icon-order-confirmed.svg" alt="Order Confirmed">
    <div>
      <h1 class="text-heading-lg font-bold text-rose-900">Order Confirmed</h1>
      <p class="text-rose-500">We hope you enjoy your food!</p>
    </div>
  </div>

  <div class="flex flex-col gap-6 text-body-sm bg-rose-50 rounded-lg p-6">
    <div class="flex flex-col gap-4">
      {#each $cartStore as { dessert, quantity }, index}
        <div class="flex justify-between">
          <div class="flex items-center gap-4">
            <img class="size-12 rounded" src="{dessert.image.thumbnail}" alt="{dessert.name}">
            <div>
              <p class="font-semibold">{dessert.name}</p>
              <div class="flex gap-4">
                <p class="font-semibold text-red">{quantity}x</p>
                <p class="text-rose-500">${dessert.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <p class="font-semibold">${(dessert.price * quantity).toFixed(2)}</p>
        </div>
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
  </div>
  <button
    class="text-body-sm bg-red w-full text-center rounded-full p-4 font-semibold text-white select-none hover:cursor-pointer button-hover"
    onclick={() => {
      $cartStore = [];
      open = false;
    }}
  >
    Start New Order
  </button>
</dialog>
{/if}