<script lang="ts">
  import { fly } from "svelte/transition";
  import CountUp from "../reusable/CountUp.svelte";
  import { scrollToId } from "../reusable/functions";
  import { onMount, onDestroy } from "svelte";

  let mounted = false;
  onMount(() => (mounted = true));

  // --- 3D tilt state/logic ---
  let tiltWrap: any;   // the perspective wrapper
  let tiltCard: any;   // the card that rotates

  const maxTilt = 12;       // degrees
  const maxLift = 18;       // px translateZ
  const scale    = 1.02;
  const lerpAmt  = 0.12;    // smoothing (0..1)

  let targetRX = 0, targetRY = 0, targetTZ = 0, targetGX = 50, targetGY = 50;
  let curRX = 0, curRY = 0, curTZ = 0, rafId: number;

  function onMove(e: any) {
    if (!tiltWrap) return;
    const rect = tiltWrap.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // normalize to [-1, 1]
    const nx = (x / rect.width) * 2 - 1;
    const ny = (y / rect.height) * 2 - 1;

    // rotate so top follows cursor upward (invert ny for rotateX)
    targetRX = -ny * maxTilt;
    targetRY =  nx * maxTilt;
    targetTZ = maxLift;

    ensureRAF();
  }

  function onLeave() {
    targetRX = 0; targetRY = 0; targetTZ = 0;
    ensureRAF();
  }

  function ensureRAF() {
    if (rafId) return;
    rafId = requestAnimationFrame(tick);
  }

  function tick() {
    // lerp towards target
    curRX += (targetRX - curRX) * lerpAmt;
    curRY += (targetRY - curRY) * lerpAmt;
    curTZ += (targetTZ - curTZ) * lerpAmt;

    if (tiltCard) {
      tiltCard.style.transform =
        `translateZ(${curTZ}px) rotateX(${curRX}deg) rotateY(${curRY}deg) scale(${scale})`;
    }

    // stop the loop when close to rest to save CPU
    const done =
      Math.abs(curRX - targetRX) < 0.05 &&
      Math.abs(curRY - targetRY) < 0.05 &&
      Math.abs(curTZ - targetTZ) < 0.15;

    if (!done) {
      rafId = requestAnimationFrame(tick);
    } else {
      cancelAnimationFrame(rafId);
      rafId = NaN;
    }
  }

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });
</script>

<section class="relative z-20 w-full min-h-screen flex items-center md:mt-5 mt-10 pb-5">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] items-center gap-12">
      {#if mounted}
      <div transition:fly={{ y: 40, duration: 800, delay: 200 }}>
        <h2 class="text-4xl md:text-[48px] font-medium leading-tight">
          We
          <span class="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">transform</span>
          your
          <span class="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">store</span> 
          into a
          <span class="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">scalable</span>
          <span class="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text font-semibold">growth engine</span>
        </h2>
        <p class="mt-4 text-gray-700 max-w-xl">
          Turning high-intent traffic into lifetime customers to give Shopify brands the <b>clarity</b>, <b>control</b>, and <b>compounding revenue</b> streams that create <b>category leaders</b>.
        </p>
        <div class="flex gap-2 items-center pt-[10px]">
          <span class="bg-green-500 size-3 rounded-full block animate-pulse"></span>
          <span class="uppercase text-sm">Accepting new clients</span>
        </div>
        <button
          data-cta="hero_get_started"
          on:click={() => scrollToId('contact')}
          class="bg-[#1D2939] text-white px-5 py-3 w-full rounded-full mt-5 hover:scale-105 transition-all"
        >
          <span class="text-lg">Free 20-minute consultation</span>
        </button>
      </div>
      {/if}

      {#if mounted}
      <!-- Right: 3D tilt area -->
      <div
        transition:fly={{ y: 10, duration: 1000, delay: 600 }}
        class="hidden md:flex md:justify-end"
      >
        <!-- Perspective wrapper (bigger hit area on mobile/desktop) -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div
          bind:this={tiltWrap}
          on:mousemove={onMove}
          on:mouseleave={onLeave}
          class="relative"
          style="
            perspective: 900px;
            perspective-origin: 50% 50%;
            transform-style: preserve-3d;
          "
        >
          <!-- the tilting card -->
          <div
            bind:this={tiltCard}
            class="w-[550px] h-[350px] bg-white/5 rounded-2xl relative border border-gray-200 overflow-hidden
                   shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]
                   will-change-transform"
            style="
              transform-style: preserve-3d;
              transition: transform 120ms ease-out;
            "
          >
            <!-- Top Bar -->
            <div class="absolute top-0 left-0 w-full h-12 bg-gray-100/10 border-b border-gray-200 flex items-center px-5"
                 style="transform: translateZ(8px);">
              <div class="flex space-x-2">
                <div class="size-4 bg-red-500 rounded-full"></div>
                <div class="size-4 bg-yellow-400 rounded-full"></div>
                <div class="size-4 bg-green-500 rounded-full"></div>
              </div>
              <div class="flex-1 flex justify-center">
                <div class="bg-white border border-gray-300 rounded-md px-3 py-[2px] shadow-inner">
                  <p class="font-mono text-xs text-gray-700">scalableweb.solutions/portal</p>
                </div>
              </div>
            </div>

            <!-- Content (parallax by pushing forward slightly) -->
            <div class="absolute inset-x-0 top-12 bottom-0 p-4" style="transform: translateZ(12px);">
              <!-- Top Stat Cards -->
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-xl bg-indigo-50 border border-gray-200 p-4" style="transform: translateZ(10px);">
                  <div class="text-sm text-indigo-800">Monthly Visitors</div>
                  <div style="transition-delay: 200ms;" class="text-2xl font-bold text-indigo-900"><CountUp to={272.76} decimals={2} suffix="K" /></div>
                  <div class="mt-1 text-xs text-emerald-600">↗ +<CountUp to={24} decimals={1} suffix="%" /></div>
                </div>
                <div class="rounded-xl bg-emerald-50 border border-gray-200 p-4" style="transform: translateZ(10px);">
                  <div class="text-sm text-emerald-800">Uptime</div>
                  <div class="text-2xl font-bold text-emerald-900"><CountUp to={98.2} decimals={1} suffix="%" /></div>
                  <div class="mt-1 text-xs text-emerald-600">↗ <CountUp to={0.3} decimals={1} suffix="%" /></div>
                </div>
              </div>

              <!-- Performance -->
              <div class="mt-3" style="transform: translateZ(8px);">
                <div class="flex items-baseline justify-between">
                  <h3 class="text-sm font-semibold text-gray-800">Performance</h3>
                  <span class="text-[11px] text-gray-500">Last 30 days</span>
                </div>

                <div class="mt-2 space-y-2.5">
                  <div>
                    <div class="flex justify-between text-xs text-gray-700">
                      <span>Load Time</span><span>89%</span>
                    </div>
                    <div class="h-2 rounded-full bg-gray-200">
                      <div class="h-2 rounded-full bg-indigo-500" style="width:89%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs text-gray-700">
                      <span>SEO Score</span><span>96%</span>
                    </div>
                    <div class="h-2 rounded-full bg-gray-200">
                      <div class="h-2 rounded-full bg-emerald-500" style="width:96%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs text-gray-700">
                      <span>Accessibility</span><span>94%</span>
                    </div>
                    <div class="h-2 rounded-full bg-gray-200">
                      <div class="h-2 rounded-full bg-violet-500" style="width:94%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-xs text-gray-700">
                      <span>Best Practices</span><span>92%</span>
                    </div>
                    <div class="h-2 rounded-full bg-gray-200">
                      <div class="h-2 rounded-full bg-orange-500" style="width:92%"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recent Deployments -->
              <div class="mt-3" style="transform: translateZ(6px);">
                <h3 class="text-sm font-semibold text-gray-800">Recent Deployments</h3>
                <ul class="mt-2 space-y-2">
                  <li class="flex items-center justify-between rounded-xl bg-white border border-gray-200 px-3 py-2 shadow-sm">
                    <div class="flex items-center gap-2">
                      <span class="size-2 rounded-full bg-emerald-500"></span>
                      <div>
                        <div class="text-sm font-medium text-gray-800">E-commerce Platform</div>
                        <div class="text-[11px] text-gray-500">2 min ago</div>
                      </div>
                    </div>
                    <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">success</span>
                  </li>
                  <li class="flex items-center justify-between rounded-xl bg-white border border-gray-200 px-3 py-2 shadow-sm">
                    <div class="flex items-center gap-2">
                      <span class="size-2 rounded-full bg-emerald-500"></span>
                      <div>
                        <div class="text-sm font-medium text-gray-800">Marketing Site</div>
                        <div class="text-[11px] text-gray-500">1 hour ago</div>
                      </div>
                    </div>
                    <span class="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">success</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- soft floating shadow for extra depth -->
          <div
            class="absolute -inset-2 rounded-[28px] -z-10 blur-2xl opacity-40"
            style="background: radial-gradient(40% 50% at 50% 65%, rgba(50,21,92,0.35), transparent 70%);"
          ></div>
        </div>
      </div>
      {/if}
      <!-- /Right -->
    </div>
  </div>
</section>

<style>
  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    [style*="transform: translateZ"] {
      transform: none !important;
    }
  }

  /* Optional: disable tilt on small screens */
  @media (max-width: 767px) {
    :global([bind\:this="tiltWrap"]) {
      pointer-events: none;
    }
  }
</style>
