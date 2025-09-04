<script lang="ts">
  import { CalendarCheck2, PenTool, Code2, TestTube2, Rocket } from "lucide-svelte";
  import lighthousereport from '$lib/assets/lighthouse.png';
    import { onDestroy, onMount } from "svelte";

  let active = 0;
  const steps = [
    { t: "Consultation", d: "We align on goals, audience, and current performance. Clear scope, clear KPI.", icon: CalendarCheck2, chips: ["Goals & KPIs","Analytics access","Tech audit","CRO opps"] },
    { t: "Design", d: "Wireframes → system → key flows. Accessibility and mobile-first baked in.", icon: PenTool, chips: ["Wireframes","Visual system","Flow protos","A11y pass"] },
    { t: "Development", d: "Ship a fast, secure stack. Componentized UI, CMS where it matters, trackable CTAs.", icon: Code2, chips: ["Component lib","CMS where needed","Perf budget","Event tracking"] },
    { t: "Testing", d: "Perf, UX, analytics QA. Lighthouse 90+ targets and experiment hooks ready.", icon: TestTube2, chips: ["Lighthouse","Data-driven results","User testing","Accessibility"] },
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
    <h1 class="text-3xl font-bold text-center text-gray-900">Missing Out</h1>
  </div>
</section>
