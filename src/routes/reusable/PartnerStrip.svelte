<script lang="ts">
  import { onMount } from "svelte";

  // base logos (edit freely)
  const logos = [
    { alt: "WooCommerce",  src: "https://play-lh.googleusercontent.com/aPsA6vS25mrocOJqZhTZyxm7sntS_IZuHh4oLBI6v-70A_mLV0Fe0spqSDTbK_Fy8As", link: "https://woocommerce.com/",  box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-12" },
    { alt: "BigCommerce",  src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZyqmtqSYlC6DpFKfKYxy4bw_N8Itrv3wFg&s", link: "https://www.bigcommerce.com/", box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-12" },
    { alt: "Shopify",      src: "https://play-lh.googleusercontent.com/lQYxSdISBENwWO7RCF1j_AzjzdOaa1LUgRckYPFVvDkSWdD8P6jqCZebmAyZfufGpIY", link: "https://www.shopify.com/",   box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-12" },
    { alt: "Klaviyo",      src: "https://static.wixstatic.com/media/2293e6_da97e8ea3719441d97b3b47e4b2d7534~mv2.png", link: "https://klaviyo.com/",     box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-14" },
    { alt: "Stripe",       src: "https://cdn.iconscout.com/icon/free/png-256/free-stripe-logo-icon-svg-download-png-2945188.png", link: "https://stripe.com/", box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-14" },
    { alt: "Intelligems",  src: "https://cdn.shopify.com/app-store/listing_images/63fb68ea6dcc0f2694c656e6dd5a895f/icon/CMeOqL2y3Y8DEAE=.png", link: "https://www.intelligems.io/", box: "h-20 w-20 sm:h-24 sm:w-24", img: "h-14" }
  ];

  let container: HTMLElement;
  let repeats = 3;               // will update at runtime
  const minFill = 2.2;           // lane should cover ≥ 2.2× viewport width

  function measureAndSetRepeats() {
    if (!container) return;
    const vw = container.clientWidth;
    const probe = container.querySelector<HTMLElement>(".lane-set"); // one set
    if (!probe) return;
    const setWidth = probe.scrollWidth || 1;
    // how many sets to cover minFill × viewport; +1 ensures seamless loop
    const needed = Math.ceil((vw * minFill) / setWidth) + 1;
    repeats = Math.max(2, needed);
  }

  onMount(() => {
    // First layout pass happens before measure; run twice to settle
    const ro = new ResizeObserver(() => {
      measureAndSetRepeats();
      // run again next frame to catch size changes after repeats update
      requestAnimationFrame(measureAndSetRepeats);
    });
    ro.observe(container);
    measureAndSetRepeats();
    return () => ro.disconnect();
  });
</script>

<section class="py-14 relative bg-transparent">
  <div class="mx-auto max-w-3xl px-6 mb-6">
    <p class="text-lg font-semibold tracking-wide text-slate-600 text-center">
      Partnered with familiar brands.
    </p>
  </div>

  <div class="relative w-full overflow-hidden" bind:this={container}>
    <div
      class="group [--speed:40s] md:[--speed:30s] hover:[--pause:paused]"
      aria-label="Supported platforms"
      role="region"
    >
      <!-- Track holds N identical sets; CSS anim shifts by exactly 1 set -->
      <div class="track [animation-play-state:var(--pause, running)]" style={`--n:${repeats}`}>
        {#each Array(repeats) as _, i}
          <div class="lane-set" aria-hidden={i > 0}>
            {#each logos as item (item.src + '-' + i)}
              <a href={item.link} target="_blank" rel="noopener noreferrer" class="shrink-0">
                <div class={`rounded-2xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center ${item.box}`}>
                  <img src={item.src} alt={item.alt} class={`${item.img} w-auto opacity-80 transition hover:opacity-100`} />
                </div>
              </a>
            {/each}
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* shift by exactly one set width: -100% / var(--n) where --n = number of sets */
  @keyframes ticker-x {
    from { transform: translateX(0); }
    to   { transform: translateX(calc(-100% / var(--n))); }
  }

  .track {
    display: flex;
    width: max-content;                 /* true content width */
    animation: ticker-x var(--speed, 40s) linear infinite;
  }

  .lane-set {
    display: inline-flex;
    align-items: center;
    gap: 2rem;                          /* = gap-8 */
    padding-inline: 1rem;               /* small breathing room, symmetrical */
  }

  /* Pause on hover */
  .group:hover .track {
    animation-play-state: var(--pause, running);
  }

  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .track { animation: none !important; }
  }
</style>
