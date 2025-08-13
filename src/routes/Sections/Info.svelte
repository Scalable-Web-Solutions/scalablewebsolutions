<script>
    import { Globe, ShieldCheck, Users } from "lucide-svelte";

</script>
<div id="info" class="h-screen relative z-10 w-full bg-gray-50">
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