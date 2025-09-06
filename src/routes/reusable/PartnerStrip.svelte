<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";

  let el: HTMLDivElement;     // card wrapper (the thing that becomes fixed)
  let holder: HTMLDivElement; // spacer to keep layout height when docked

  let isDocked = false;
  let isExpanded = false;

  // Height to reserve when we detach the card
  let measuredH = 0;

  // Absolute page Y at which we want to dock (top of card, in normal flow)
  let triggerY = 0;

  let isMobile = false;
  let mql: MediaQueryList;

  // Add a little buffer so we don't bounce at the threshold
  const HYST = 24; // px

  function pageY(el: HTMLElement) {
    const r = el.getBoundingClientRect();
    return r.top + window.scrollY;
  }

  async function computeTrigger() {
    await tick(); // ensure layout is settled
    // compute based on the element WHILE it is in normal flow
    if (!isDocked) {
      measuredH = el.offsetHeight;
      triggerY = pageY(el); // where its top sits on the page
    } else {
      // when docked, use the holder to recover the original page position
      triggerY = pageY(holder);
    }
  }

  function updateIsMobile() {
    if (mql) {
      isMobile = mql.matches;
    }
    if (isMobile) {
      isDocked = false;
      isExpanded = false;
      measuredH = 0;
    } else {
      // recompute trigger for desktop
      computeTrigger();
    }
  }

  let ticking = false;
  function onScroll() {
    if (isMobile) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;

      if (!isDocked && y >= triggerY + HYST) {
        // Dock it
        isDocked = true;
        measuredH = measuredH || el.offsetHeight;
      } else if (isDocked && y <= triggerY - HYST) {
        // Return to normal flow
        isDocked = false;
        isExpanded = false;
      }

      ticking = false;
    });
  }

  let ro: ResizeObserver;

  onMount(async () => {
    if (typeof window === "undefined") return;

    mql = window.matchMedia("(max-width: 767.98px)");
    mql.addEventListener?.("change", updateIsMobile);
    updateIsMobile();

    await computeTrigger();

    // Recompute if layout or element size changes
    ro = new ResizeObserver(() => computeTrigger());
    ro.observe(el);
    ro.observe(holder);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", computeTrigger);
  });

  onDestroy(() => {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", computeTrigger);
    mql?.removeEventListener?.("change", updateIsMobile);
    ro?.disconnect();
  });

  function toggleExpand(e?: MouseEvent) {
    if (!isDocked || isMobile) return;
    if (!isDocked) return;
    isExpanded = !isExpanded;
    e?.stopPropagation();
  }
</script>

<section class="py-14 relative">
  <!-- Spacer keeps layout height when the card is fixed -->
  <div bind:this={holder} style="height: {( !isMobile && isDocked ) ? measuredH + 'px' : 0}px;"></div>

  <!-- svelte-ignore a11y_interactive_supports_focus -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    bind:this={el}
    role="button"
    aria-label="Supported platforms"
    on:click={toggleExpand}
    class="mx-auto max-w-3xl px-6 transition-[transform,box-shadow,opacity,left,bottom,width,height] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] will-change-transform"
    style={( !isMobile && isDocked )
      ? `
        position: fixed;
        left: 1rem;
        bottom: 1rem;
        width: ${isExpanded ? 'min(92vw, 720px)' : '350px'};
        z-index: 50;
        transform: translateZ(0);
        `
      : ''}
  >
    <div
      class={`rounded-2xl border border-black/5 bg-white/60 backdrop-blur
              supports-[backdrop-filter]:bg-white/40
              shadow-[0_10px_30px_-15px_rgba(0,0,0,.25)]
              ${isDocked ? (isExpanded ? 'scale-100' : 'scale-90') : 'scale-100'}
              transition-transform`}
    >
      <div class="px-6 sm:px-8 py-6 flex items-center justify-between gap-4">
        <p class="text-sm tracking-wide text-slate-600 justify-center flex w-full">Built for modern commerce</p>
        {#if isDocked}
          <button
            class="shrink-0 rounded-full bg-black/5 hover:bg-black/10 transition p-2"
            aria-label={isExpanded ? 'Minimize' : 'Expand'}
            on:click={toggleExpand}
          >{#if isExpanded}✕{:else}⤢{/if}</button>
        {/if}
      </div>

      <div class="px-6 sm:px-8 pb-6">
        <ul class={`flex items-center gap-6 ${isExpanded ? 'justify-start flex-wrap' : 'justify-center'}`}>
          <!-- logos ... (same as before) -->
          <li>
            <div class="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center">
              <img src="https://play-lh.googleusercontent.com/aPsA6vS25mrocOJqZhTZyxm7sntS_IZuHh4oLBI6v-70A_mLV0Fe0spqSDTbK_Fy8As"
                   alt="WooCommerce"
                   class="h-8 w-auto grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100" />
            </div>
          </li>
          <li>
            <div class="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZyqmtqSYlC6DpFKfKYxy4bw_N8Itrv3wFg&s"
                   alt="BigCommerce"
                   class="h-8 w-auto grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100" />
            </div>
          </li>
          <li>
            <div class="h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-white shadow-[0_2px_12px_rgba(0,0,0,.06)] ring-1 ring-black/5 grid place-items-center">
              <img src="https://play-lh.googleusercontent.com/lQYxSdISBENwWO7RCF1j_AzjzdOaa1LUgRckYPFVvDkSWdD8P6jqCZebmAyZfufGpIY"
                   alt="Shopify"
                   class="h-8 w-auto grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  {#if isDocked && isExpanded}
    <button
      class="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
      aria-label="Close"
      on:click={() => (isExpanded = false)}
    />
  {/if}
</section>
