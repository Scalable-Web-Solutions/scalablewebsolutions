<script>
    import { fly } from "svelte/transition";
    import CountUp from "../reusable/CountUp.svelte";
    import { scrollToId } from "../reusable/functions";
    import { onMount } from "svelte";

    let mounted = false;
    onMount(() => (mounted = true));
</script>
<section class="relative z-20 w-full min-h-screen flex items-center md:mt-5 mt-20 pb-5">
    <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      <!-- Left: Copy -->
      {#if mounted}
      <div transition:fly={{ y: 40, duration: 800, delay: 200 }}>
        <h2 class="text-4xl md:text-[45px] font-medium leading-tight">
            We
            <span class="bg-gradient-to-r from-[#4726ff] via-[#b370ff] to-[#4726ff] text-transparent bg-clip-text font-semibold">leverage</span>
            
            <span class="bg-gradient-to-r from-[#4726ff] via-[#b370ff] to-[#4726ff] text-transparent bg-clip-text font-semibold">your</span> 
            website
            for
            <span class="bg-gradient-to-r from-[#4726ff] via-[#b370ff] to-[#4726ff] text-transparent bg-clip-text font-semibold">sustainable</span>
            <span class="bg-gradient-to-r from-[#4726ff] via-[#b370ff] to-[#4726ff] text-transparent bg-clip-text font-semibold">growth</span>
            so you don't have to.
        </h2>
        <p class="mt-4 text-gray-700 max-w-xl">
          Empowering high-growth eCommerce brands to scale with data-driven Revenue Per Visitor optimization — without the hassle of traditional marketing agencies.
        </p>
        <div class="flex gap-2 items-center pt-[10px]">
          <span class="bg-green-500 size-3 rounded-full block animate-pulse"></span>
          <span class="uppercase text-sm">Accepting new clients</span>
        </div>
        <button data-cta="hero_get_started" on:click={() => scrollToId('contact')} class="bg-[#1D2939] text-white px-5 py-3 w-full rounded-full mt-5 hover:scale-105 transition-all"><span class="text-lg">Free 20-minute consultation</span></button>
      </div>
      {/if}

      {#if mounted}
        <!-- Right: Mock window -->
        <div transition:fly={{ y: 10, duration: 1000, delay: 600 }} class="flex justify-center md:justify-end shadow-[0_10px_50px_-15px_rgba(0,0,0,0.2)]">
          
          <div
          
          class="w-[700px] h-[400px] bg-white rounded-2xl relative shadow-lg border border-gray-200 overflow-hidden"
          >
            <!-- Top Bar -->
            <div class="absolute top-0 left-0 w-full h-12 bg-gray-100 border-b border-gray-200 flex items-center px-5">
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

            <!-- Content -->
            <div class="absolute inset-x-0 top-12 bottom-0 p-4">
              <!-- Top Stat Cards -->
              <div class="grid grid-cols-2 gap-3">
                <div class="rounded-xl bg-indigo-50 border border-gray-200 p-4">
                  <div class="text-sm text-indigo-800">Monthly Visitors</div>
                  <div style="transition-delay: 200ms;" class="text-2xl font-bold text-indigo-900"><CountUp to={272.76} decimals={2} suffix="K" /></div>
                  <div class="mt-1 text-xs text-emerald-600">↗ +<CountUp to={24} decimals={1} suffix="%" /></div>
                </div>
                <div class="rounded-xl bg-emerald-50 border border-gray-200 p-4">
                  <div class="text-sm text-emerald-800">Uptime</div>
                  <div class="text-2xl font-bold text-emerald-900"><CountUp to={98.2} decimals={1} suffix="%" /></div>
                  <div class="mt-1 text-xs text-emerald-600">↗ <CountUp to={0.3} decimals={1} suffix="%" /></div>
                </div>
              </div>

              <!-- Performance -->
              <div class="mt-3">
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
              <div class="mt-3">
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
        </div>
        {/if}
        <!-- /Right -->
      </div>
    </div>
  </section>