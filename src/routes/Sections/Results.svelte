<script lang="ts">
  import { CalendarCheck2, PenTool, Code2, TestTube2, Rocket } from "lucide-svelte";
  import lighthousereport from '$lib/assets/lighthouse.png';
    import { onDestroy, onMount } from "svelte";

  let active = 0;
  const steps = [
    { t: "Research", d: "From the micro details shaping your industry, we listen, learn, and dig deep to uncover the insights that truly matter to your growth.", icon: CalendarCheck2, chips: ["Goals & KPIs","Market Dynamics","Customer Behaviors","CRO Integartions"] },
    { t: "Test", d: "With the right foundation in place, we design controlled site tests backed by data to reveal exactly what drives growth.", icon: PenTool, chips: ["Hypothesis Design", "Experiment Architecture", "Analytics & Tracking setup", "Guardrail Definition"] },
    { t: "Prove", d: "Once results are validated, we roll out proven wins with confidence. Every implementation is rooted in the data, ensuring that what goes live creates a positive measureable impact.", icon: Code2, chips: ["A/B Testing", "Clean Result Attributions", "Guardrails Against Risk", "Data-Driven Growth"] },
    { t: "Refine & Repeat", d: "Growth is a cycle. We feed every proven win back into updated buyer profiles, sharper marketing strategies, and more tailored customer journeys that keep customers coming back.", icon: TestTube2, chips: ["Buyer Persona Refinement","GTM Refinement","Strategy Scaling", "Compounding Growth"] },
  ];

  // persist until reload
  let seen: boolean[] = Array(steps.length).fill(false);
  let allUnlocked = false;

  function observe(node: HTMLElement, idx: number) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            active = idx;
            if (!seen[idx]) seen[idx] = true;

            // when last step is reached, unlock all (once)
            if (idx === steps.length - 3 && !allUnlocked) {
              // small delay so it feels intentional
              setTimeout(() => { allUnlocked = true; }, 120);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
    );
    io.observe(node);
    return { destroy: () => io.disconnect() };
  }

  // helper: stagger delay when unlocking everything
  const delay = (i: number) => (allUnlocked ? `${i * 90}ms` : "0ms");

  let sectionRef: HTMLElement;
let progress = 0; // 0..1
let sectionTop = 0;
let sectionHeight = 0;

function updateProgress() {
  if (!sectionRef) return;
  const y = window.scrollY;
  const denom = Math.max(1, sectionHeight - window.innerHeight);
  // clamp between 0 and 1
  progress = Math.min(1, Math.max(0, (y - sectionTop) / denom));
}

function measure() {
  if (!sectionRef) return;
  const rect = sectionRef.getBoundingClientRect();
  sectionTop = window.scrollY + rect.top;
  sectionHeight = rect.height;
  updateProgress();
}

onMount(() => {
  measure();
  if(typeof window !== 'undefined') {
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', measure);
  }
});

onDestroy(() => {
  if(typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateProgress);
    window.removeEventListener('resize', measure);
  }
});
</script>

<style>
  .reveal {
    opacity: 0;
    transform: translateY(10px);
    will-change: opacity, transform;
  }
  /* show if individually seen OR after global unlock */
  .reveal[data-seen="true"],
  .reveal[data-all="true"] {
    opacity: 1;
    transform: none;
    transition: opacity .35s ease, transform .35s ease;
  }
</style>

<section id="results" bind:this={sectionRef} class="relative z-20 bg-white py-16 md:py-20">
  <div class="mx-auto max-w-6xl px-6">
    <h2 class="text-3xl md:text-4xl text-center font-semibold">Our Process</h2>
    <p class="mt-2 text-center text-gray-600">Concrete phases. Measurable outcomes.</p>

    <div class="relative mt-10 md:mt-12">
    <!-- Sticky left progress bar -->
    <div class="hidden lg:block absolute -left-8 top-0 h-full">
      <div class="sticky top-24 w-1 rounded-full bg-indigo-200/60 overflow-hidden"
        style="height: calc(100vh - 2.5rem);">
        <div class="w-full bg-indigo-600 origin-top"
         style={`height:${(progress * 100).toFixed(2)}%`}></div>
      </div>
    </div>

      <div class="pointer-events-none hidden lg:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-indigo-200/0 via-indigo-200 to-indigo-200/0"></div>

      <ol class="space-y-10 lg:space-y-10">
        {#each steps as s, i}
          <li class="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start" use:observe={i}>
            <!-- timeline dot -->
            <span
              class="hidden lg:block absolute left-1/2 top-4 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-white ring-4 ring-indigo-200 shadow"
              class:bg-indigo-600={active === i}
            ></span>

            <!-- media / chips side -->
            <div class={i % 2 === 0 ? "order-1 lg:order-1 lg:pr-10" : "order-1 lg:order-2 lg:pl-10"}>
              <div
                class="reveal"
                data-seen={seen[i]}
                data-all={allUnlocked}
                style={`transition-delay:${delay(i)}`}
              >
                {#if s.media}
                  <img src={s.media} alt="" class="rounded-xl border border-gray-200 shadow-sm max-w-md" />
                {:else if s.chips?.length}
                  <ul class="grid grid-cols-2 gap-2 max-w-sm">
                    {#each s.chips as c}
                      <li class="px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">{c}</li>
                    {/each}
                  </ul>
                {/if}
              </div>
            </div>

            <!-- card side -->
            <div class={i % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
              <article
                class="reveal rounded-xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition"
                data-seen={seen[i]}
                data-all={allUnlocked}
                style={`transition-delay:${delay(i)}`}
              >
                <div class="flex items-center gap-3">
                  <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-semibold">
                    {i + 1}
                  </div>
                  <h3 class="text-xl md:text-2xl font-semibold">{s.t}</h3>
                </div>
                <p class="mt-2 text-sm text-gray-700 leading-relaxed max-w-prose">{s.d}</p>
              </article>
            </div>
          </li>
        {/each}
      </ol>

      <div class="mt-10 flex justify-center">
        <a href="#contact" class="bg-gray-900 text-white px-6 py-3.5 rounded-full font-medium hover:bg-gray-800 active:scale-[0.99] transition">
          Book a call
        </a>
      </div>
    </div>
  </div>
</section>
