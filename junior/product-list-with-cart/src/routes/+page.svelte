<script lang="ts">
  import Dessert from '$lib/components/Dessert.svelte';
  import Cart from '$lib/components/Cart.svelte';
  import OrderConfirmation from '$lib/components/OrderConfirmation.svelte';
  import { onMount } from 'svelte';

  import { desserts } from '$lib/stores/desserts';
  import { cartStore } from '$lib/stores/cartStore';

  let showOrderConfirmation: boolean = false;
  
  function setupEventListener() {
    window.addEventListener('confirmOrder', () => {
      showOrderConfirmation = true;
    });
  }
  
  onMount(() => {
    setupEventListener();
  });
</script>

<main class="m-6 flex flex-col gap-8">
  <h1 class="text-heading-lg font-bold text-rose-900">Desserts</h1>
  
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
    {#each $desserts as dessert}
      <Dessert 
        {dessert} 
        isInCart={$cartStore.some((item) => item.dessert.name === dessert.name)} 
      />
    {/each}
  </div>
</main>
<aside>
  <Cart />
</aside>

<OrderConfirmation open={showOrderConfirmation} />
