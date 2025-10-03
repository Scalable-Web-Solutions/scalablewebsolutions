<script lang="ts">
  import { Globe, ShieldCheck, Users, ChevronsDown, Pause, Play } from "lucide-svelte";
  import { onMount } from "svelte";
    import { linear, quadIn, quadOut } from "svelte/easing";
    import { fade } from "svelte/transition";

  const steps = [
    {
      id: 0,
      tag: "Mindset",
      title: "We don’t increase your ad-spend, we optimize it.",
      body:
        "Most brands burn cash on traffic. We convert the traffic you already have into lifelong customers.",
      icon: ShieldCheck
    },
    {
      id: 1,
      tag: "Method",
      title: "Experiments that Scale, one test at a time.",
      body:
        "From clean data to winning changes, we manage the entire testing pipeline so you scale with clarity.",
      icon: ShieldCheck
    },
    {
      id: 2,
      tag: "Capability",
      title: "Global solutions with e-commerce focus.",
      body:
        "From analytics wiring to experimentation strategy, we build a system you can operate and grow with confidence.",
      icon: Globe
    },
    {
      id: 3,
      tag: "Partnership",
      title: "1-on-1 support, no black box.",
      body:
        "You’ll have a direct line to us—reviews, roadmaps, and weekly wins that compound.",
      icon: Users
    }
  ];

  let active = 0;
  let autoplay = true;
  let inView = true;
  let timer: ReturnType<typeof setInterval> | null = null;
  const INTERVAL = 5000;

  let pillGroup: HTMLDivElement | null = null;
  let thirdPill: HTMLSpanElement | null = null;
  let textMaxWidth = 0;

  function updateTextClamp() {
    if (!pillGroup || !thirdPill) return;
    const groupRect = pillGroup.getBoundingClientRect();
    const thirdRect = thirdPill.getBoundingClientRect();
    textMaxWidth = Math.round(thirdRect.right - groupRect.left);
  }

  function next() { active = (active + 1) % steps.length; }
  function prev() { active = (active - 1 + steps.length) % steps.length; }
  function goTo(i: number) { active = ((i % steps.length) + steps.length) % steps.length; restart(); }

  function start() {
    stop();
    if (autoplay && inView && !isMobile) timer = setInterval(next, INTERVAL);
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function toggleAutoplay() { autoplay = !autoplay; start(); }
  function restart() { start(); }

  // mobile detection
  let isMobile = false;
  onMount(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia("(max-width: 1024px)");
    const set = () => (isMobile = mq.matches);
    set();
    mq.addEventListener?.("change", set);

    const handleResize = () => updateTextClamp();
    let ro: ResizeObserver | null = null;

    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => updateTextClamp());
      if (pillGroup) ro.observe(pillGroup);
      if (thirdPill) ro.observe(thirdPill);
    }

    window.addEventListener("resize", handleResize);
    requestAnimationFrame(() => updateTextClamp());

    start();

    return () => {
      mq.removeEventListener?.("change", set);
      window.removeEventListener("resize", handleResize);
      ro?.disconnect();
    };
  });

  // swipe support
  let touchY = 0;
  function onTouchStart(e: TouchEvent) { touchY = e.touches[0].clientY; }
  function onTouchEnd(e: TouchEvent) {
    const dy = e.changedTouches[0].clientY - touchY;
    if (Math.abs(dy) > 40) dy > 0 ? prev() : next();
    restart();
  }
</script>

<section id="about" class="relative z-10 w-full bg-gray-50 text-black overflow-hidden">
  <!-- Ambient blobs ABOVE the bg (z-0), not behind it -->
  <div class="pointer-events-none absolute inset-0 z-0">
    <span
      class="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-40"
      style="background: radial-gradient(circle closest-side, rgba(99,102,241,0.35), transparent 70%);"
    ></span>
    <span
      class="absolute -bottom-32 -right-24 h-80 w-80 rounded-full blur-3xl opacity-40"
      style="background: radial-gradient(circle closest-side, rgba(236,72,153,0.30), transparent 70%);"
    ></span>
    <span
      class="absolute top-1/3 right-1/4 h-64 w-64 rounded-full blur-3xl opacity-30"
      style="background: radial-gradient(circle closest-side, rgba(16,185,129,0.25), transparent 70%);"
    ></span>
  </div>

  <!-- optional: ultra-subtle noise for depth -->
  <div class="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-multiply"
       style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%%22 height=%22100%%22 filter=%22url(%23n)%22 opacity=%220.15%22/></svg>'); background-size: 240px 240px;">
  </div>

  <div
    transition:fade={{ duration: 220, easing: linear }}
    class="relative z-10 mx-auto max-w-4xl px-6 flex items-center justify-center min-h-[80vh] py-20 text-left"
    on:touchstart={onTouchStart}
    on:touchend={onTouchEnd}
  >

    <div class="space-y-6 max-w-2xl">
      <p class="text-sm tracking-widest uppercase text-indigo-600/90">
        {steps[active].tag}
      </p>

      <h1 class="text-2xl sm:text-[45px] font-semibold leading-tight">
        {steps[active].title}
      </h1>

      <p
        class="text-lg text-gray-700/90"
        style:max-width={!isMobile && textMaxWidth ? `${textMaxWidth}px` : null}
      >
        {steps[active].body}
      </p>

      <!-- proof pills -->
      <div
        bind:this={pillGroup}
        class="flex flex-wrap items-center gap-2 pt-1 w-fit max-w-full"
      >
        <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1.5 text-sm">
          <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"/></svg>
          +12-28 RPV lifts
        </span>
        <span class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1.5 text-sm">
          <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"/></svg>
          Clean analytics wiring
        </span>
        <span
          bind:this={thirdPill}
          class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur px-3 py-1.5 text-sm"
        >
          <svg class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17l-3.88-3.88-1.41 1.41L9 19 20.29 7.71l-1.41-1.41z"/></svg>
          Weekly experiment cadence
        </span>
      </div>
      <div class="h-[1px] w-full bg-gradient-to-r from-gray-200 via-gray-300/60 to-transparent my-2"></div>

      {#if !isMobile}
        <div class="flex items-center gap-3 pt-2">
          {#each steps as s}
            <button
              class="h-2.5 w-2.5 rounded-full transition-all"
              class:w-8={active === s.id}
              class:bg-indigo-600={active === s.id}
              class:bg-gray-300={active !== s.id}
              aria-label={`Go to ${s.tag}`}
              on:click={() => goTo(s.id)}
            />
          {/each}
          <button
            class="ml-2 rounded-full border border-gray-200 p-2 hover:bg-gray-50"
            on:click={() => { next(); restart(); }}
            aria-label="Next"
          >
            <ChevronsDown class="w-4 h-4" />
          </button>
          <button
            class="rounded-full border border-gray-200 p-2 hover:bg-gray-50"
            on:click={toggleAutoplay}
            aria-label="Toggle autoplay"
          >
            {#if autoplay}
              <Pause class="w-4 h-4" />
            {:else}
              <Play class="w-4 h-4" />
            {/if}
          </button>
        </div>
      {/if}

      <button
        class="mt-4 bg-gray-900 text-white px-6 py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:scale-[0.99] transition"
        on:click={() => (window.location.href = "/#contact")}
        data-cta="schedule_consultation"
      >
        Book a call
      </button>

      <!-- subtle scroll hint -->
      <div class="pt-4">
        <div class="mx-auto w-6 h-10 rounded-full border border-gray-300 flex items-start justify-center p-1 opacity-70">
          <div class="w-1 h-2 rounded-full bg-gray-400 animate-bounce"></div>
        </div>
      </div>
    </div>
  </div>
</section>
