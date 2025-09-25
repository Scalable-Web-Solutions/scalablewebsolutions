<script lang="ts">
  import { Globe, ShieldCheck, Users, ChevronsDown, Pause, Play } from "lucide-svelte";
  import { onMount } from "svelte";

  const steps = [
    {
      id: 0,
      tag: "Mindset",
      title: "We don’t scale with ads; we scale with on-site conversions.",
      body:
        "Most brands burn cash on traffic. We tighten the funnel so the traffic you already earn turns into customers.",
      icon: ShieldCheck
    },
    {
      id: 1,
      tag: "Method",
      title: "Advanced scaling, not freelance ‘brand-scaling’.",
      body:
        "We optimize UX flows, run disciplined A/Bs, and ship needle-moving changes—cart, PDP, checkout, LTV loops.",
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
    const mq = window.matchMedia("(max-width: 1024px)");
    const set = () => (isMobile = mq.matches);
    set();
    mq.addEventListener?.("change", set);
    start();
    return () => mq.removeEventListener?.("change", set);
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

<section id="about" class="relative z-10 w-full bg-gray-50 text-black">
  <div class="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 pt-20 md:pt-28">
    <!-- LEFT PANEL -->
    <aside class="relative">
      <div class="lg:sticky lg:top-24 space-y-6">
        <p class="text-sm tracking-widest uppercase text-indigo-600/80">{steps[active].tag}</p>
        <h1 class="text-3xl sm:text-4xl font-medium leading-tight">{steps[active].title}</h1>
        <p class="text-lg text-gray-700/90">{steps[active].body}</p>

        <!-- dots + controls -->
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
          <button class="ml-2 rounded-full border border-gray-200 p-2 hover:bg-gray-50" on:click={() => { next(); restart(); }} aria-label="Next">
            <ChevronsDown class="w-4 h-4" />
          </button>
          <button class="rounded-full border border-gray-200 p-2 hover:bg-gray-50" on:click={toggleAutoplay} aria-label="Toggle autoplay">
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
      </div>
    </aside>

    <!-- RIGHT PANEL -->
    <div class="relative">
      <div
        id="about-carousel"
        class="{isMobile
          ? 'overflow-visible h-auto space-y-6'
          : 'overflow-hidden h-[62vh] sm:h-[66vh] md:h-[68vh] lg:h-[70vh] max-h-[720px] rounded-3xl no-scrollbar backdrop-blur'}"
        on:touchstart={onTouchStart}
        on:touchend={onTouchEnd}
      >
        <div
          class="{isMobile ? '' : 'track h-full'}"
          style="{isMobile ? '' : `transform: translateY(-${active * 100}%);`}"
        >
          {#each steps as s, i}
            <section class="{isMobile ? 'p-4 sm:p-6 md:p-8' : 'h-full p-6 md:p-10 flex items-start'}">
              <div class="w-full">
                <div class="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm">
                  <div class="flex items-start gap-4">
                    <s.icon class="w-10 h-10 text-indigo-600 shrink-0" />
                    <div class="space-y-2">
                      <h2 class="text-2xl md:text-3xl font-semibold">
                        {#if i === 0}Advanced Scaling{:else if i === 1}Experimentation Engine{:else if i === 2}Global Solutions{:else}1-on-1 Support{/if}
                      </h2>
                      <p class="text-gray-700 text-base md:text-lg leading-relaxed">
                        {#if i === 0}
                          Unlike many “freelance brand-scalers”, we convert more of the visitors you already have.
                        {:else if i === 1}
                          We wire analytics, define hypotheses, and run clean A/Bs across PDP → checkout → post-purchase.
                        {:else if i === 2}
                          E-commerce first: CRO, instrumentation, dashboards, and a roadmap aligned to revenue.
                        {:else}
                          Weekly reviews, transparent dashboards, and a direct Slack line—no black box.
                        {/if}
                      </p>
                    </div>
                  </div>

                  <div class="my-5 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>

                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-700">
                    {#if i === 0}
                      <li>• Funnel friction audits</li><li>• Heatmaps & session replays</li><li>• Speed & LCP tuning</li><li>• Form & checkout fixes</li>
                    {:else if i === 1}
                      <li>• A/B test pipeline</li><li>• Clean attribution</li><li>• Win criteria & guardrails</li><li>• Rollout playbooks</li>
                    {:else if i === 2}
                      <li>• Global storefronts</li><li>• Tax & currency logic</li><li>• Inventory awareness</li><li>• Post-purchase loops</li>
                    {:else}
                      <li>• Weekly roadmap</li><li>• 24–48h turnarounds</li><li>• Loom + docs</li><li>• Shared KPI tracker</li>
                    {/if}
                  </ul>

                  <div class="mt-6 text-sm text-indigo-600 font-medium">
                    {#if i === 0} More conversions without more spend.
                    {:else if i === 1} Testing discipline that compounds.
                    {:else if i === 2} Scale across borders with clarity.
                    {:else} Real humans, real support. {/if}
                  </div>
                </div>
              </div>
            </section>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
