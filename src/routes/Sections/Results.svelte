<script lang="ts">
  import { CalendarCheck2, PenTool, Code2, TestTube2, Rocket } from "lucide-svelte";
  import lighthousereport from '$lib/assets/lighthouse.png';

  let active = 0;
  const steps = [
    { t: "Consultation", d: "We align on goals, audience, and current performance. Clear scope, clear KPI.", icon: CalendarCheck2, chips: ["Goals & KPIs","Analytics access","Tech audit","CRO opps"] },
    { t: "Design", d: "Wireframes → system → key flows. Accessibility and mobile-first baked in.", icon: PenTool, chips: ["Wireframes","Visual system","Flow protos","A11y pass"] },
    { t: "Development", d: "Ship a fast, secure stack. Componentized UI, CMS where it matters, trackable CTAs.", icon: Code2, chips: ["Component lib","CMS where needed","Perf budget","Event tracking"] },
    { t: "Testing", d: "Perf, UX, analytics QA. Lighthouse 90+ targets and experiment hooks ready.", icon: TestTube2, media: lighthousereport, chips: [] },
    { t: "Launch & Iterate", d: "Deploy, monitor, and iterate with an A/B backlog focused on conversion wins.", icon: Rocket, chips: ["Weekly review","KPI tracker","A/B backlog","Rollouts"] }
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
            if (idx === steps.length - 1 && !allUnlocked) {
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

<section id="results" class="relative z-20 bg-white py-16 md:py-20">
  <div class="mx-auto max-w-6xl px-6">
    <h2 class="text-3xl md:text-4xl text-center font-semibold">Our Process</h2>
    <p class="mt-2 text-center text-gray-600">Concrete phases. Measurable outcomes.</p>

    <div class="relative mt-10 md:mt-12">
      <div class="pointer-events-none hidden lg:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-indigo-200/0 via-indigo-200 to-indigo-200/0"></div>

      <ol class="space-y-10 lg:space-y-14">
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
                <p class="mt-2 text-gray-700 leading-relaxed max-w-prose">{s.d}</p>
              </article>
            </div>
          </li>
        {/each}
      </ol>

      <div class="mt-10 flex justify-center">
        <a href="#contact" class="bg-gray-900 text-white px-6 py-3.5 rounded-full font-medium hover:bg-gray-800 active:scale-[0.99] transition">
          Start with a 20-minute consult
        </a>
      </div>
    </div>
  </div>
</section>
