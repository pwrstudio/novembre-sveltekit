<script lang="ts">
  import { page } from "$app/stores"
  import { cartCount } from "$lib/modules/cart"

  // Show cart when in shop
  // or when cart is not empty and we are not on cart page
  const shopRoutes = ["/shop", "/shop/[slug]"]
  $: showCart =
    shopRoutes.includes($page.route?.id ?? "") ||
    ($cartCount > 0 && $page.route?.id !== "/cart")
</script>

{#if showCart}
  <a href="/cart" class="mobile-cart">
    <div>CART ({$cartCount})</div>
  </a>
{/if}

<style lang="scss">
  @import "../../styles/variables.scss";

  .mobile-cart {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--white);
    display: none;
    z-index: 1000;
    aspect-ratio: 1;
    padding: 10px;
    border-radius: 50%;
    font-family: var(--sans-stack);
    font-size: var(--body);
    justify-content: center;
    align-items: center;
    mix-blend-mode: difference;

    @include screen-size("small") {
      display: flex;
    }

    &:hover {
      mix-blend-mode: normal;
    }
  }
</style>
