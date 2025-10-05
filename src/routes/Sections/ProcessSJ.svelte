<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { fade } from "svelte/transition";

  export const inView = writable(false);
  export const isScrollDisabled = writable(false);
  export const syntheticScrollAmount = writable(0);

  // thresholds
  const LOWER = 0;
  const UPPER = 100;

  // when >= this, release native scroll downward
  let section: HTMLElement;

  // keep body scroll lock in sync
  $: {
    // lock page scroll only when we're inside the section AND between bounds
    const shouldLock =
      $inView && $syntheticScrollAmount > LOWER && $syntheticScrollAmount < UPPER;

    isScrollDisabled.set(shouldLock);

    if (typeof document !== "undefined") {
      document.body.style.overflow = shouldLock ? "hidden" : "";
      // optional: also lock on the root element if needed:
      // document.documentElement.style.overflow = shouldLock ? "hidden" : "";
    }
  }

  // IntersectionObserver mount + cleanup
  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => inView.set(entry.isIntersecting));
      },
      { threshold: 0.9 }
    );

    if (section) observer.observe(section);

    // cleanup
    return () => {
      if (section) observer.unobserve(section);
      // always restore scroll on unmount
      document.body.style.overflow = "";
      // document.documentElement.style.overflow = "";
    };
  });

  // helpers
  function clamp(n: number, min: number, max: number) {
    return Math.max(min, Math.min(max, n));
  }

  // derive a single phase id for stable transitions
  $: phase =
    $syntheticScrollAmount < 20
      ? "research"
      : $syntheticScrollAmount < 40
      ? "test"
      : $syntheticScrollAmount < 60
      ? "prove"
      : "refine";

  // ===== Arrow positioning helpers (used in Phase 04) =====
  // SVG circle geometry (matches the <circle> center and radius)
  const CX = 192, CY = 192, R = 160;

  function toRad(deg: number) {
    return (deg * Math.PI) / 180;
  }
  // point on the ring at 'deg' (0° = +X axis, CCW positive)
  function polar(deg: number) {
    const r = toRad(deg);
    return { x: CX + R * Math.cos(r), y: CY + R * Math.sin(r) };
  }
  // tangent (clockwise flow) direction in radians at 'deg'
  function tangentClockwise(deg: number) {
    return toRad(deg - 90); // rotate -90° for clockwise
  }

  // angles for the two small arrows on the ring (tweak to taste)
  const ARROW_TOP_RIGHT_DEG = 30;   // near "Research" -> →
  const ARROW_BOTTOM_LEFT_DEG = 210; // near "Prove"    -> ←
  const ARROW_LEN = 26;
</script>

<!-- Wheel: capture only while disabled (i.e., between LOWER and UPPER) -->
<svelte:window
  on:wheel|nonpassive={(e) => {
    if (!$inView) return;

    // compute the next synthetic value first
    const step = e.deltaY === 0 ? 0 : e.deltaY > 0 ? 1 : -1;
    const next = clamp($syntheticScrollAmount + step, LOWER, UPPER);

    // While "locked" (between bounds), prevent native scroll and update counter
    if (next > LOWER && next < UPPER) {
      e.preventDefault();
      $syntheticScrollAmount = next;
    } else {
      // We’re at/over a boundary — update counter and RELEASE native scroll
      $syntheticScrollAmount = next;
      // no preventDefault -> page can scroll normally
    }
  }}
/>

<section
  bind:this={section}
  class="relative min-h-[100svh] bg-gray-100 flex justify-center items-center overflow-hidden px-4 sm:px-6"
>
  <h1 class="absolute top-4 left-4 sm:top-6 sm:left-6 text-xs sm:text-sm md:text-md font-medium">
    Growth Engine Process
  </h1>

  <!-- Fixed-size stage to prevent layout reflow. Absolute stack phases and fade. -->
  <div class="relative w-full max-w-7xl h-[420px] sm:h-[480px] md:h-[540px] px-0 sm:px-4">
    {#key phase}
      <div class="absolute inset-0" in:fade={{ duration: 220 }} out:fade={{ duration: 180 }}>
        {#if phase === "research"}
          <!-- =============================== PHASE 01: RESEARCH =============================== -->
          <div class="grid md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10 md:gap-16 place-items-center h-full">
            <!-- 3D floating data visualization -->
            <div class="relative w-full h-[300px] sm:h-[380px] md:h-[500px] perspective-1000">
              <!-- Floating 3D cards representing data points -->
              <div
                class="absolute top-[8%] left-[8%] sm:top-[10%] sm:left-[12%] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl transform rotate-12 animate-float"
                style="animation-delay: 0s;"
              >
                <div class="p-3 sm:p-4 text-white">
                  <div class="text-[10px] sm:text-xs font-semibold opacity-80">MACRO</div>
                  <div class="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">↗ 127%</div>
                  <div class="text-[10px] sm:text-xs mt-1 opacity-70">Market Growth</div>
                </div>
              </div>

              <div
                class="absolute top-[46%] left-[2%] sm:top-[45%] sm:left-[5%] w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-2xl shadow-2xl transform -rotate-6 animate-float"
                style="animation-delay: 0.5s;"
              >
                <div class="p-2.5 sm:p-3 text-white">
                  <div class="text-[10px] sm:text-xs font-semibold opacity-80">MICRO</div>
                  <div class="text-lg sm:text-xl font-bold mt-1 sm:mt-2">8.4K</div>
                  <div class="text-[10px] sm:text-xs mt-1 opacity-70">User Signals</div>
                </div>
              </div>

              <div
                class="absolute top-[18%] right-[6%] sm:top-[20%] sm:right-[10%] w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl transform rotate-6 animate-float"
                style="animation-delay: 1s;"
              >
                <div class="p-3 sm:p-4 text-white">
                  <div class="text-[10px] sm:text-xs font-semibold opacity-80">TREND</div>
                  <div class="text-2xl sm:text-3xl font-bold mt-1 sm:mt-2">🔥</div>
                  <div class="text-[10px] sm:text-xs mt-1 opacity-70">Emerging Pattern</div>
                </div>
              </div>

              <div
                class="absolute bottom-[10%] right-[14%] sm:bottom-[15%] sm:right-[20%] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-2xl transform -rotate-12 animate-float"
                style="animation-delay: 1.5s;"
              >
                <div class="p-3 sm:p-4 text-white">
                  <div class="text-[10px] sm:text-xs font-semibold opacity-80">INSIGHT</div>
                  <div class="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">+42%</div>
                  <div class="text-[10px] sm:text-xs mt-1 opacity-70">Conversion</div>
                </div>
              </div>

              <!-- Connecting lines animated -->
              <svg class="absolute inset-0 w-full h-full pointer-events-none -z-10">
                <line x1="30%" y1="25%" x2="70%" y2="35%" stroke="url(#gradient1)" stroke-width="2" stroke-dasharray="5,5" class="animate-dash" />
                <line x1="25%" y1="60%" x2="65%" y2="75%" stroke="url(#gradient2)" stroke-width="2" stroke-dasharray="5,5" class="animate-dash" style="animation-delay: 0.5s" />
                <line x1="70%" y1="35%" x2="65%" y2="75%" stroke="url(#gradient3)" stroke-width="2" stroke-dasharray="5,5" class="animate-dash" style="animation-delay: 1s" />
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:rgb(129,140,248);stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:rgb(167,139,250);stop-opacity:0.8" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:rgb(217,70,239);stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:rgb(192,132,252);stop-opacity:0.8" />
                  </linearGradient>
                  <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:rgb(6,182,212);stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:rgb(139,92,246);stop-opacity:0.8" />
                  </linearGradient>
                </defs>
              </svg>

              <!-- Particle effects -->
              <div class="absolute top-[35%] left-[40%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full animate-ping opacity-60"></div>
              <div class="absolute top-[55%] right-[35%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-ping opacity-60" style="animation-delay: 0.7s"></div>
              <div class="absolute bottom-[40%] left-[30%] w-1.5 h-1.5 sm:w-2 sm:h-2 bg-fuchsia-400 rounded-full animate-ping opacity-60" style="animation-delay: 1.2s"></div>
            </div>

            <div class="text-center md:text-left px-1 sm:px-2">
              <div class="inline-block px-3 sm:px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 01
              </div>
              <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Research
              </h1>
              <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                From the micro details shaping your industry, we listen, learn, and
                dig deep to uncover the insights that truly matter to your growth.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-indigo-600 mb-1">Macro Trends</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Industry-wide patterns</div>
                </div>
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-fuchsia-600 mb-1">Micro Insights</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Customer behavior</div>
                </div>
              </div>
            </div>
          </div>
        {:else if phase === "test"}
          <!-- =============================== PHASE 02: TEST =============================== -->
          <div class="grid md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10 md:gap-16 place-items-center h-full">
            <!-- A/B Testing visualization with split screens -->
            <div class="relative w-full h-[300px] sm:h-[380px] md:h-[500px]">
              <!-- Split container effect -->
              <div class="absolute inset-0 flex flex-col md:flex-row gap-3 sm:gap-4">
                <!-- Variant A -->
                <div class="flex-1 relative bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-pulse-slow min-h-[160px]">
                  <div class="absolute top-3 left-3 bg-white/20 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-bold">
                    VARIANT A
                  </div>
                  <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <div class="bg-white/90 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div class="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span class="text-[10px] sm:text-xs font-semibold text-gray-600">Conversion</span>
                        <span class="text-lg sm:text-2xl font-bold text-blue-600">3.2%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div class="h-1.5 sm:h-2 rounded-full animate-width-grow" style="width: 32%; animation-delay: 0s;"></div>
                      </div>
                    </div>
                  </div>
                  <!-- Floating elements -->
                  <div class="absolute top-16 right-6 w-10 h-10 sm:w-16 sm:h-16 bg-white/30 backdrop-blur rounded-2xl animate-float-slow"></div>
                  <div class="absolute top-40 left-6 w-8 h-8 sm:w-12 sm:h-12 bg-white/30 backdrop-blur rounded-xl animate-float-slow" style="animation-delay: 0.5s"></div>
                </div>

                <!-- VS Badge -->
                <div class="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div class="bg-gradient-to-br from-purple-600 to-pink-600 text-white w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-2xl animate-pulse">
                    VS
                  </div>
                </div>

                <!-- Variant B -->
                <div class="flex-1 relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-pulse-slow min-h-[160px]" style="animation-delay: 0.5s">
                  <div class="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-white text-[10px] sm:text-xs font-bold">
                    VARIANT B
                  </div>
                  <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                    <div class="bg-white/90 backdrop-blur rounded-lg sm:rounded-xl p-3 sm:p-4">
                      <div class="flex items-center justify-between mb-1.5 sm:mb-2">
                        <span class="text-[10px] sm:text-xs font-semibold text-gray-600">Conversion</span>
                        <span class="text-lg sm:text-2xl font-bold text-purple-600">4.8%</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                        <div class="h-1.5 sm:h-2 rounded-full animate-width-grow" style="width: 48%; animation-delay: 0.3s;"></div>
                      </div>
                    </div>
                  </div>
                  <!-- Floating elements -->
                  <div class="absolute top-24 right-8 w-10 h-10 sm:w-14 sm:h-14 bg-white/30 backdrop-blur rounded-2xl animate-float-slow" style="animation-delay: 0.7s"></div>
                  <div class="absolute top-40 left-8 w-8 h-8 sm:w-10 sm:h-10 bg-white/30 backdrop-blur rounded-xl animate-float-slow" style="animation-delay: 1s"></div>
                </div>
              </div>

              <!-- Data particles flowing between variants (keep subtle on mobile) -->
              <div class="absolute top-[30%] left-[48%] w-2 h-2 bg-yellow-400 rounded-full animate-ping hidden md:block"></div>
              <div class="absolute top-[50%] left-[48%] w-2 h-2 bg-green-400 rounded-full animate-ping hidden md:block" style="animation-delay: 0.5s"></div>
              <div class="absolute top-[70%] left-[48%] w-2 h-2 bg-blue-400 rounded-full animate-ping hidden md:block" style="animation-delay: 1s"></div>
            </div>

            <div class="text-center md:text-left px-1 sm:px-2">
              <div class="inline-block px-3 sm:px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 02
              </div>
              <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Test
              </h1>
              <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                With the right foundation in place, we design controlled site tests
                backed by data to reveal exactly what drives growth.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-blue-600 mb-1">A/B Testing</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Compare variants</div>
                </div>
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-purple-600 mb-1">Data-Driven</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Real results</div>
                </div>
              </div>
            </div>
          </div>
        {:else if phase === "prove"}
          <!-- =============================== PHASE 03: PROVE =============================== -->
          <div class="grid md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10 md:gap-16 place-items-center h-full">
            <!-- Trophy/Achievement with stats -->
            <div class="relative w-full h-[300px] sm:h-[380px] md:h-[500px] flex items-center justify-center">
              <!-- Central trophy -->
              <div class="relative z-10">
                <div class="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                  <div class="text-5xl sm:text-7xl md:text-8xl">🏆</div>
                </div>
                <!-- Glow effect -->
                <div class="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full blur-2xl md:blur-3xl opacity-40 sm:opacity-50 animate-pulse"></div>
              </div>

              <!-- Orbiting stat cards -->
              <div class="absolute top-[10%] left-[6%] sm:top-[12%] sm:left-[8%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-1">
                <div class="text-[10px] sm:text-xs font-semibold text-gray-500">Revenue</div>
                <div class="text-2xl sm:text-3xl font-bold text-green-600">+156%</div>
                <div class="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Increase</div>
              </div>

              <div class="absolute top-[10%] right-[6%] sm:top-[12%] sm:right-[8%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-2">
                <div class="text-[10px] sm:text-xs font-semibold text-gray-500">Users</div>
                <div class="text-2xl sm:text-3xl font-bold text-blue-600">42K</div>
                <div class="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Active</div>
              </div>

              <div class="absolute bottom-[12%] left-[8%] sm:bottom-[15%] sm:left-[10%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-3">
                <div class="text-[10px] sm:text-xs font-semibold text-gray-500">Retention</div>
                <div class="text-2xl sm:text-3xl font-bold text-purple-600">89%</div>
                <div class="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Rate</div>
              </div>

              <div class="absolute bottom-[12%] right-[8%] sm:bottom-[15%] sm:right-[10%] bg-white rounded-2xl shadow-xl p-3 sm:p-4 w-28 sm:w-32 md:w-36 animate-orbit-4">
                <div class="text-[10px] sm:text-xs font-semibold text-gray-500">ROI</div>
                <div class="text-2xl sm:text-3xl font-bold text-orange-600">12.4x</div>
                <div class="text-[10px] sm:text-xs text-gray-400 mt-1">↑ Return</div>
              </div>

              <!-- Success particles -->
              <div class="hidden sm:block absolute top-[25%] left-[45%] text-xl sm:text-2xl animate-float-up">⭐</div>
              <div class="hidden sm:block absolute top-[35%] right-[35%] text-xl sm:text-2xl animate-float-up" style="animation-delay: 0.5s">✨</div>
              <div class="hidden sm:block absolute bottom-[30%] left-[40%] text-xl sm:text-2xl animate-float-up" style="animation-delay: 1s">💫</div>
            </div>

            <div class="text-center md:text-left px-1 sm:px-2">
              <div class="inline-block px-3 sm:px-4 py-1 bg-green-100 text-green-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 03
              </div>
              <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Prove
              </h1>
              <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Once results are validated, we roll out proven wins with confidence.
                Every implementation is rooted in the data, ensuring that what goes
                live creates a positive measurable impact.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-green-600 mb-1">Validated</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Data-backed wins</div>
                </div>
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-orange-600 mb-1">Measurable</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Real impact</div>
                </div>
              </div>
            </div>
          </div>
        {:else}
        {@const p1 = polar(ARROW_TOP_RIGHT_DEG)}
        {@const t1 = tangentClockwise(ARROW_TOP_RIGHT_DEG)}
        {@const p2 = polar(ARROW_BOTTOM_LEFT_DEG)}
        {@const t2 = tangentClockwise(ARROW_BOTTOM_LEFT_DEG)}
          <!-- =============================== PHASE 04: REFINE & REPEAT =============================== -->
          <div class="grid md:grid-cols-2 grid-cols-1 gap-6 sm:gap-10 md:gap-16 place-items-center h-full">
            <!-- Infinite loop cycle -->
            <div class="relative w-full h-[300px] sm:h-[380px] md:h-[500px] flex items-center justify-center">
              <!-- Circular progress ring + correctly positioned arrows -->
              <svg class="absolute w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 -rotate-90">
                <defs>
                  <linearGradient id="gradient-cycle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:rgb(99,102,241);stop-opacity:1" />
                    <stop offset="50%" style="stop-color:rgb(168,85,247);stop-opacity:1" />
                    <stop offset="100%" style="stop-color:rgb(236,72,153);stop-opacity:1" />
                  </linearGradient>
                </defs>

                <!-- Ring -->
                <circle cx="192" cy="192" r="160" stroke="#e5e7eb" stroke-width="12" fill="none" />
                <circle cx="192" cy="192" r="160" stroke="url(#gradient-cycle)" stroke-width="12" fill="none" stroke-linecap="round" />
              </svg>

              <!-- Center infinity symbol -->
              <div class="relative z-10 text-5xl sm:text-7xl md:text-8xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                ∞
              </div>

              <!-- Cycle stage badges -->
              <div class="absolute top-4 sm:top-6 md:top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div class="text-[10px] sm:text-xs font-semibold">Research</div>
              </div>

              <div class="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div class="text-[10px] sm:text-xs font-semibold">Test</div>
              </div>
              <!-- Arrow below "Test" badge -->
              <div class="absolute right-[40px] sm:right-[54px] md:right-[63px] top-1/2 translate-y-[30px] sm:translate-y-[36px] md:translate-y-[42px] text-lg sm:text-xl md:text-2xl text-purple-500 select-none">
                ↓
              </div>

              <div class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div class="text-[10px] sm:text-xs font-semibold">Prove</div>
              </div>

              <div class="absolute bottom-0 rotate-90 text-lg sm:text-xl md:text-2xl text-purple-500 select-none">
                ↓
              </div>

              <div class="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl">
                <div class="text-[10px] sm:text-xs font-semibold">Refine</div>
              </div>

              <div class="absolute top-0 -rotate-90 text-lg sm:text-xl md:text-2xl text-purple-500 select-none">
                ↓
              </div>
              <!-- Arrow above "Refine" badge -->
              <div class="absolute left-[48px] sm:left-[62px] md:left-[70px] top-1/2 -translate-y-[42px] sm:-translate-y-[50px] md:-translate-y-[58px] text-lg sm:text-xl md:text-2xl text-fuchsia-500 select-none">
                ↑
              </div>
            </div>

            <div class="text-center md:text-left px-1 sm:px-2">
              <div class="inline-block px-3 sm:px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                Phase 04
              </div>
              <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Refine & Repeat
              </h1>
              <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-4 sm:mb-6">
                Growth is a cycle. We feed every proven win back into updated buyer
                profiles, sharper marketing strategies, and more tailored customer
                journeys that keep customers coming back.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-indigo-600 mb-1">Continuous</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Never-ending improvement</div>
                </div>
                <div class="flex-1 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div class="text-xs sm:text-sm font-semibold text-purple-600 mb-1">Iterative</div>
                  <div class="text-[11px] sm:text-xs text-gray-600">Compound growth</div>
                </div>
              </div>
            </div>
          </div>
        {/if}
      </div>
    {/key}
  </div>

  <!-- Ambient gradient blobs (smaller & less intrusive on mobile) -->
  <div class="pointer-events-none absolute z-[20] right-[-160px] sm:right-[-140px] top-1/3 w-[360px] h-[360px] sm:w-[520px] sm:h-[520px] md:w-[620px] md:h-[620px] bg-indigo-300/30 blur-[80px] sm:blur-[110px] md:blur-[120px] rounded-full"></div>
  <div class="pointer-events-none absolute z-[20] left-[-180px] sm:left-[-160px] bottom-[8%] sm:bottom-[12%] w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[520px] md:h-[520px] bg-fuchsia-300/30 blur-[80px] sm:blur-[110px] md:blur-[120px] rounded-full"></div>
  <div class="pointer-events-none absolute z-[20] right-[5%] sm:right-[10%] md:right-[15%] top-[-80px] sm:top-[-100px] md:top-[-120px] w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[420px] md:h-[420px] bg-purple-300/25 blur-[80px] sm:blur-[100px] md:blur-[110px] rounded-full"></div>
</section>

<style>
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(var(--rotate-start, 0deg));
    }
    50% {
      transform: translateY(-20px) rotate(calc(var(--rotate-start, 0deg) + 5deg));
    }
  }

  @keyframes dash {
    to { stroke-dashoffset: -100; }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) scale(1); }
    50%      { transform: translateY(-15px) scale(1.05); }
  }

  @keyframes pulse-slow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.8; transform: scale(1.02); }
  }

  @keyframes width-grow { from { width: 0; } }

  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-30px); }
  }

  @keyframes orbit-1 { 0%,100% { transform: translate(0,0);} 50% { transform: translate(10px,-10px);} }
  @keyframes orbit-2 { 0%,100% { transform: translate(0,0);} 50% { transform: translate(-10px,-10px);} }
  @keyframes orbit-3 { 0%,100% { transform: translate(0,0);} 50% { transform: translate(10px,10px);} }
  @keyframes orbit-4 { 0%,100% { transform: translate(0,0);} 50% { transform: translate(-10px,10px);} }

  @keyframes float-up {
    0%   { transform: translateY(0);   opacity: 1; }
    100% { transform: translateY(-100px); opacity: 0; }
  }

  .animate-float        { animation: float 3s ease-in-out infinite; }
  .animate-dash         { animation: dash 20s linear infinite; }
  .animate-float-slow   { animation: float-slow 4s ease-in-out infinite; }
  .animate-pulse-slow   { animation: pulse-slow 3s ease-in-out infinite; }
  .animate-width-grow   { animation: width-grow 1.5s ease-out forwards; }
  .animate-bounce-slow  { animation: bounce-slow 3s ease-in-out infinite; }

  .animate-orbit-1      { animation: orbit-1 4s ease-in-out infinite; }
  .animate-orbit-2      { animation: orbit-2 4s ease-in-out infinite; }
  .animate-orbit-3      { animation: orbit-3 4s ease-in-out infinite; }
  .animate-orbit-4      { animation: orbit-4 4s ease-in-out infinite; }

  .animate-float-up     { animation: float-up 3s ease-out infinite; }

  .perspective-1000 { perspective: 1000px; }
</style>
