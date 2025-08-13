<script lang="ts">
  import logo from '$lib/assets/scalablewebsolutions.png'
    import { Globe, ShieldCheck, Users } from 'lucide-svelte';
    import CountUp from './reusable/CountUp.svelte';
    import lighthousereport from '$lib/assets/lighthouse.png'
</script>

<div class="relative min-h-screen w-full">
  <!-- Background -->
  <!-- Global background layer -->
<div class="pointer-events-none fixed inset-0 -z-10">
  <!-- soft page gradient -->
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#EBEEFA]"></div>

  <!-- BLOBS (above gradient) -->
  <div class="absolute z-[1] right-[-140px] top-1/3 w-[620px] h-[620px] bg-indigo-300/30 blur-[120px] rounded-full"></div>
  <div class="absolute z-[1] left-[-160px] bottom-[12%] w-[520px] h-[520px] bg-fuchsia-300/30 blur-[120px] rounded-full"></div>
  <div class="absolute z-[1] right-[15%] top-[-120px] w-[420px] h-[420px] bg-purple-300/25 blur-[110px] rounded-full"></div>
</div>
  <!-- Header -->
  <header class="z-10 fixed top-0 left-0 right-0 bg-gradient-to-b from-black/15 to-transparent">
    <div class="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src={logo} class="w-10 h-10 rounded-lg" alt="" />
        <h1 class="text-3xl md:text-5xl">Scalable</h1>
      </div>

      <nav class="flex items-center gap-6">
        <p>Packages</p>
        <p>About</p>
        <p>Demo</p>
        <p>Pricing</p>
        <button class="bg-[#1D2939] text-white px-5 py-3 rounded-full">Contact Us</button>
        <button class="bg-gray-200 text-black px-5 py-3 rounded-full -ml-2">Request a Demo</button>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="relative z-20 w-full min-h-screen flex items-center">
    <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
      <!-- Left: Copy -->
      <div>
        <h2 class="text-4xl md:text-5xl font-medium leading-tight">
          We <span class="text-indigo-600 font-semibold">Audit, fix, and convert,</span> so you don't have to.
        </h2>
        <p class="mt-4 text-gray-700 max-w-xl">
          Scale your E-commerce platform with ease. Say no to hassle and let us handle the rest.
        </p>
        <button class="bg-[#1D2939] text-white px-5 py-3 w-full rounded-full mt-5 hover:scale-105 transition-all">Get Started</button>
      </div>

        <!-- Right: Mock window -->
        <div class="flex justify-center md:justify-end shadow-[0_10px_50px_-15px_rgba(0,0,0,0.2)]">
          <div class="w-[700px] h-[400px] bg-white rounded-2xl relative shadow-lg border border-gray-200 overflow-hidden">
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
                  <div style="transition-delay: 200ms;" class="text-2xl font-bold text-indigo-900"><CountUp to={24} decimals={1} suffix="M" /></div>
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
        <!-- /Right -->
      </div>
    </div>
  </section>

  <div class="brandshelped relative z-10 w-full h-[100px] bg-white flex items-center justify-center">
    <h1 class="text-3xl mt-2">100+ Brands Scaled</h1>
  </div>

  <div class="h-screen relative z-10 w-full bg-gray-50">
    <div class="mx-auto max-w-7xl h-full px-6 relative z-10">
        <div class="margin w-full relative z-10 grid grid-cols-1 lg:grid-cols-1 items-center gap-12 text-black flex-col justify-center h-full">
          <div class="flex flex-col items-center gap-10 w-full">
            <h1 class="text-4xl font-medium">We don't scale with ads; <span class="font-semibold text-indigo-600">we scale with on-site conversions</span>.</h1>
            <div class="flex w-full">
              <div class="flex flex-col gap-5 w-full">
                <ShieldCheck  class="w-12 h-12  text-indigo-600" />
                <h1 class="text-3xl font-medium">Advanced Scaling</h1>
                <p class="text-lg">Unlike many "freelance brand-scalers", we don't just help brands scale. We help brands scale their online presence by converting more visitors into customers.</p>
              </div>
              <div class="flex flex-col gap-5 w-full">
                <Globe class="w-12 h-12 text-indigo-600" />
                <h1 class="text-3xl font-medium">Global Solutions</h1>
                <p class="text-lg">Scalable Web Solutions offers various solutions and methods to help scale brands. We specialize in the E-commerce space. Whether you're looking to increase conversions, get advanced analytics, or find a strategy that works for you, we've got you covered.</p>
              </div>
              <div class="flex flex-col gap-5 w-full">
                <Users class="w-12 h-12 text-indigo-600" />
                <h1 class="text-3xl font-medium">1-on-1 Support</h1>
                <p class="text-lg">At Scalable Web Solutions, we understand that scaling a brand is a complex process, but it doesn't have to be. That's why we offer 1-on-1 support sessions to help you navigate the challenges and make the most of our solutions. Our team of experts is here to provide guidance, answer questions, and ensure your brand reaches its full potential.</p>
              </div>
            </div>
            <button class="bg-gray-800 text-white px-4 py-4 rounded-full">Schedule a consultation</button>
          </div>
        </div>
    </div>
  </div>


  <!-- ResultsSection.svelte -->
<section class="bg-white py-20 relative z-20">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <!-- Text -->
    <div>
      <h1 class="text-5xl font-semibold mb-6">
        Let the results speak for themselves.
      </h1>
      <h2 class="text-3xl font-medium mb-4">
        Speed, Responsiveness, and SEO.
      </h2>
      <p class="text-lg text-gray-700 leading-relaxed">
        Our client was struggling with slow loading times, unresponsive website,
        and low search engine rankings. We helped them improve their website's speed
        by <span class="font-semibold text-indigo-600 text-xl">150%</span>, responsiveness,
        and SEO, and also increased their security practice score by 22%.
      </p>
    </div>

    <!-- Image -->
    <div class="flex justify-center">
      <img
        src={lighthousereport}
        alt="Lighthouse Report"
        class="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>

<section class="w-full py-16 relative z-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    
    <!-- Image on the left -->
    <div class="flex justify-center">
      <img
        src="https://cdn.prod.website-files.com/63c77dab3c05b174f8487226/63fec13e57c2b7075f71ae2c_Oliver%20Birch%20Website%20Mobile%20Device%20Responsive%20Across%20Screens_2560--New%20BG.jpg"
        alt="Dashboard preview"
        class="w-full max-w-md h-[300px] rounded-lg shadow-lg"
      />
    </div>
    
    <!-- Text on the right -->
    <div>
      <h2 class="text-3xl font-semibold mb-4">
        Ditch cookie cutter Shopify sites.
      </h2>
      <p class="text-lg text-gray-600 leading-relaxed">
        Ditch the basic Shopify sites and themes. With Scalable Web Solutions we design your dream site from scratch, high quality, high conversions, and high traffic.
      </p>
    </div>
    
  </div>
</section>

<section class="bg-white py-20 relative z-20">
  <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <!-- Text -->
    <div>
      <h1 class="text-5xl font-semibold mb-6">
        Let the results speak for themselves.
      </h1>
      <h2 class="text-3xl font-medium mb-4">
        Speed, Responsiveness, and SEO.
      </h2>
      <p class="text-lg text-gray-700 leading-relaxed">
        Our client was struggling with slow loading times, unresponsive website,
        and low search engine rankings. We helped them improve their website's speed
        by <span class="font-semibold text-indigo-600 text-xl">150%</span>, responsiveness,
        and SEO, and also increased their security practice score by 22%.
      </p>
    </div>

    <!-- Image -->
    <div class="flex justify-center">
      <img
        src={lighthousereport}
        alt="Lighthouse Report"
        class="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>

</div>
