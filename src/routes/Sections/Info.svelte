<script lang="ts">
  import { Globe, ShieldCheck, Users } from "lucide-svelte";

  // which step is in view?
  let active = 0;
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

  // observer updates the active step
  function observe(node: HTMLElement, idx: number) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) active = idx;
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.2 }
    );
    io.observe(node);
    return {
      destroy() {
        io.disconnect();
      }
    };
  }

  function goTo(i: number) {
  const el = document.getElementById(`step-${i}`);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' }); // works because el is inside the snapy scroller
}

</script>

<style>
  /* tiny parallax illusion */
  .parallax::before {
    content: "";
    position: absolute;
    inset: -20vh -10vw;
    background: radial-gradient(40vw 40vw at 80% 20%, rgba(99,102,241,.09), transparent),
                radial-gradient(30vw 30vw at 10% 80%, rgba(236,72,153,.07), transparent);
    transform: translateZ(0);
    will-change: transform;
  }
  @media (prefers-reduced-motion: no-preference) {
    .parallax[data-active="0"]::before { transform: translateY(0px);    transition: transform .6s ease; }
    .parallax[data-active="1"]::before { transform: translateY(-40px);  transition: transform .6s ease; }
    .parallax[data-active="2"]::before { transform: translateY(-80px);  transition: transform .6s ease; }
    .parallax[data-active="3"]::before { transform: translateY(-120px); transition: transform .6s ease; }
  }

  /* subtle card motion */
  .step-card {
    transform: translateY(24px);
    opacity: 0;
  }
  .step-card[data-inview="true"] {
    transform: translateY(0);
    opacity: 1;
    transition: transform .5s ease, opacity .5s ease;
  }

  /* snap scrolling */
  /* stable viewport height units */
.h-svh { height: 100svh; }
@supports (height: 100dvh) { .h-svh { height: 100dvh; } }

/* hide scrollbar but keep scrollable */
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.no-scrollbar::-webkit-scrollbar { display: none; }

/* snap container behavior */
.snapy {
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
}
.snap-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
}


</style>

<section id="about" class="relative z-10 w-full bg-gray-50 text-black">
  <!-- background vibes -->
  <div class="pointer-events-none absolute inset-0 parallax" data-active={active}></div>

  <!-- sticky narrative rail -->
  <div class="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 pt-20 md:pt-28 min-h-0 lg:h-[70vh]">
    <aside class="relative min-h-0">
      <div class="sticky top-24 space-y-6">
        <p class="text-sm tracking-widest uppercase text-indigo-600/80">{steps[active].tag}</p>
        <h1 class="text-3xl sm:text-4xl font-medium leading-tight">
          {steps[active].title}
        </h1>
        <p class="text-lg text-gray-700/90">
          {steps[active].body}
        </p>

        <!-- progress dots -->
        <div class="flex items-center gap-3 pt-2">
          {#each steps as s}
            <button
              class="h-2.5 w-2.5 rounded-full transition-all"
              class:bg-indigo-600={active === s.id}
              class:bg-gray-300={active !== s.id}
              class:w-8={active === s.id}
              aria-label={`Go to ${s.tag}`}
              on:click={() => goTo(s.id)}
            />
          {/each}
        </div>

        <!-- CTA is always visible -->
        <button
          class="mt-4 bg-gray-900 text-white px-6 py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:scale-[0.99] transition"
          on:click={() => goTo(steps.length)}
          data-cta="schedule_consultation"
        >
          Schedule a consultation
        </button>
      </div>
    </aside>

    <!-- scrollable story stream -->
    <div class="relative min-h-0">
      <div class="snapy h-svh lg:h-[70vh] overflow-y-auto pr-1 no-scrollbar overscroll-contain">
        <!-- intro spacer so the sticky rail has breathing room -->

        {#each steps as s, i}
          <section id={`step-${i}`} class="snap-section min-h-full flex items-start pt-6" use:observe={i}>
  <div class="w-full">
    <div
      class="step-card rounded-2xl border border-gray-200 bg-white/80 backdrop-blur p-6 md:p-10 shadow-sm"
      data-inview={active === i}
    >
      <!-- header -->
      <div class="flex items-start gap-4">
        <s.icon class="w-10 h-10 text-indigo-600 shrink-0" />
        <div class="space-y-2">
          <h2 class="text-2xl md:text-3xl font-semibold">
            {#if i === 0}Advanced Scaling
            {:else if i === 1}Experimentation Engine
            {:else if i === 2}Global Solutions
            {:else}1-on-1 Support{/if}
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

      <!-- divider -->
      <div class="my-5 h-px bg-gradient-to-r from-gray-200 to-transparent"></div>

      <!-- features grid -->
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-700">
        {#if i === 0}
          <li>• Funnel friction audits</li>
          <li>• Heatmaps & session replays</li>
          <li>• Speed & LCP tuning</li>
          <li>• Form & checkout fixes</li>
        {:else if i === 1}
          <li>• A/B test pipeline</li>
          <li>• Clean attribution</li>
          <li>• Win criteria & guardrails</li>
          <li>• Rollout playbooks</li>
        {:else if i === 2}
          <li>• Global storefronts</li>
          <li>• Tax & currency logic</li>
          <li>• Inventory awareness</li>
          <li>• Post-purchase loops</li>
        {:else}
          <li>• Weekly roadmap</li>
          <li>• 24–48h turnarounds</li>
          <li>• Loom + docs</li>
          <li>• Shared KPI tracker</li>
        {/if}
      </ul>

      <!-- optional footer so card never feels empty -->
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

        <!-- finale -->
        <section id={`step-${steps.length}`} class="snap-section min-h-[120vh] flex items-start pt-6">
          <div class="w-full">
            <div class="rounded-2xl p-8 md:p-12 bg-gray-900 text-white shadow-xl">
              <p class="text-sm tracking-widest uppercase text-indigo-300">Next Step</p>
              <h3 class="mt-2 text-3xl md:text-4xl font-semibold leading-tight">
                Let’s find your first 3 quick wins, and a plan to compound them.
              </h3>
              <p class="mt-3 text-white/80 text-lg max-w-2xl">
                We’ll review your analytics, identify friction, and propose experiments for the next 30 days.
              </p>
              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  class="bg-white text-gray-900 px-6 py-4 rounded-full font-medium hover:bg-gray-100 active:scale-[0.99] transition"
                  data-cta="schedule_consultation_finale"
                  on:click={() => window.location.href = '/#contact'}
                >
                  Schedule a consultation
                </button>
                <a href="#results" class="px-6 py-4 rounded-full border border-white/30 hover:bg-white/10">
                  See case-style results
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</section>
