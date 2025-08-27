<script>
  import { Globe, ShieldCheck, Users } from "lucide-svelte";
</script>

<section id="about" class="relative z-10 w-full bg-gray-50 py-16 md:py-24">
  <div class="mx-auto max-w-7xl px-6">
    <div class="grid grid-cols-1 items-center gap-12 text-black">
      <div class="flex flex-col items-center gap-10 w-full">
        <h1 class="text-3xl sm:text-4xl font-medium text-center leading-tight">
          We don't scale with ads; <span class="font-semibold text-indigo-600">we scale with on-site conversions</span>.
        </h1>

        <!-- Features -->
        <div class="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex flex-col gap-4 p-6">
            <ShieldCheck class="w-10 h-10 text-indigo-600" />
            <h2 class="text-2xl font-semibold">Advanced Scaling</h2>
            <p class="text-base sm:text-lg text-gray-700">
              Unlike many "freelance brand-scalers", we don't just help brands scale. We help brands scale their online
              presence by converting more visitors into customers.
            </p>
          </div>

          <div class="flex flex-col gap-4 rounded-2xl p-6">
            <Globe class="w-10 h-10 text-indigo-600" />
            <h2 class="text-2xl font-semibold">Global Solutions</h2>
            <p class="text-base sm:text-lg text-gray-700">
              Scalable Web Solutions offers various solutions and methods to help scale brands. We specialize in
              E-commerce. Whether you're looking to increase conversions, get advanced analytics, or dial a strategy
              that works for you, we've got you covered.
            </p>
          </div>

          <div class="flex flex-col gap-4 rounded-2xl p-6">
            <Users class="w-10 h-10 text-indigo-600" />
            <h2 class="text-2xl font-semibold">1-on-1 Support</h2>
            <p class="text-base sm:text-lg text-gray-700">
              Scaling a brand is complex, but it doesn't have to be. We offer 1-on-1 sessions to guide you, answer
              questions, and ensure your brand reaches its full potential.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <button
          class="mt-2 w-full sm:w-auto bg-gray-900 text-white px-6 py-4 rounded-full text-base sm:text-lg font-medium hover:bg-gray-800 active:scale-[0.99] transition"
        >
          Schedule a consultation
        </button>
      </div>
    </div>
  </div>
</section>
