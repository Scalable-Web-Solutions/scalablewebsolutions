<script lang="ts">
  // Logos with links
  const logos = [
    {
      alt: "WooCommerce",
      src: "https://play-lh.googleusercontent.com/aPsA6vS25mrocOJqZhTZyxm7sntS_IZuHh4oLBI6v-70A_mLV0Fe0spqSDTbK_Fy8As",
      link: "https://woocommerce.com/",
      box: "h-20 w-20 sm:h-24 sm:w-24",
      img: "h-12"
    },
    {
      alt: "BigCommerce",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZyqmtqSYlC6DpFKfKYxy4bw_N8Itrv3wFg&s",
      link: "https://www.bigcommerce.com/",
      box: "h-20 w-20 sm:h-24 sm:w-24",
      img: "h-12"
    },
    {
      alt: "Shopify",
      src: "https://play-lh.googleusercontent.com/lQYxSdISBENwWO7RCF1j_AzjzdOaa1LUgRckYPFVvDkSWdD8P6jqCZebmAyZfufGpIY",
      link: "https://www.shopify.com/",
      box: "h-20 w-20 sm:h-24 sm:w-24",
      img: "h-12"
    },
    {
      alt: "Klayvio",
      src: "https://static.wixstatic.com/media/2293e6_da97e8ea3719441d97b3b47e4b2d7534~mv2.png",
      link: "http://klaviyo.com/",
      box: "h-20 w-20 sm:h-24 sm:w-24",
      img: "h-14"
    },
    {
      alt: "Stripe",
      src: "https://cdn.iconscout.com/icon/free/png-256/free-stripe-logo-icon-svg-download-png-2945188.png",
      link: "https://stripe.com/",
      box: "h-20 w-20 sm:h-24 sm:w-24",
      img: "h-14"
    },
    {
      alt: "Intelligems",
      src: "https://cdn.shopify.com/app-store/listing_images/63fb68ea6dcc0f2694c656e6dd5a895f/icon/CMeOqL2y3Y8DEAE=.png",
      link: "https://www.intelligems.io/",
      box: "h-20 w-20 sm:h-24 sm:w-24",
      img: "h-14"
    }
  ];
</script>

<section class="py-14 relative bg-transparent">
  <div class="mx-auto max-w-3xl px-6 mb-6">
    <p class="text-lg font-semibold tracking-wide text-slate-600 text-center">
      Partnered with familiar brands.
    </p>
  </div>

  <div class="relative w-full overflow-hidden">
    <div
      class="group [--speed:40s] md:[--speed:30s] hover:[--pause:paused] relative"
      aria-label="Supported platforms"
      role="region"
    >
      <div class="flex items-center gap-8 pr-8 animate-marquee [animation-play-state:var(--pause, running)]">
        {#each logos as item (item.src)}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            class="shrink-0"
          >
            <div
              class={`rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center ${item.box}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                class={`${item.img} w-auto opacity-80 transition hover:opacity-100`}
              />
            </div>
          </a>
        {/each}

        <!-- duplicate for seamless loop -->
        {#each logos as item (item.src + "-dup1")}
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            class="shrink-0"
          >
            <div
              class={`rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center ${item.box}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                class={`${item.img} w-auto opacity-80 transition hover:opacity-100`}
              />
            </div>
          </a>
        {/each}
      </div>
    </div>
  </div>
</section>


<style>
  /* Infinite marquee keyframes */
  @keyframes marquee {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  /* The lane is 2x content width (original + duplicate); translate -50% loops seamlessly */
  .animate-marquee {
    width: max-content;
    display: flex;
    animation: marquee var(--speed, 40s) linear infinite;
  }

  /* Pause on hover (set via CSS var on wrapper) */
  .group:hover .animate-marquee {
    animation-play-state: var(--pause, running);
  }

  /* Reduced motion: stop animation, allow manual scroll */
  @media (prefers-reduced-motion: reduce) {
    .animate-marquee {
      animation: none !important;
    }
  }
</style>
