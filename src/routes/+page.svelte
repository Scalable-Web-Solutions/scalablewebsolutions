<script lang="ts">
    import Footer from './Sections/footer.svelte';
    import Hero from './Sections/Hero.svelte';
    import Info from './Sections/Info.svelte';
    import Results from './Sections/Results.svelte';
    import Contact from './Sections/Contact.svelte';

    import kaytee from '$lib/assets/kaytee.jpg'
    import MissingOut from './Sections/MissingOut.svelte';

    const { data } = $props<{
      data: { experiments: Record<string, string>; anonId?: string }
    }>();

</script>

<div class="relative min-h-screen w-full">
  <div class="pointer-events-none fixed inset-0 -z-10">
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#EBEEFA]"></div>
  <div class="absolute z-[1] right-[-140px] top-1/3 w-[620px] h-[620px] bg-indigo-300/30 blur-[120px] rounded-full"></div>
    <div class="absolute z-[1] left-[-160px] bottom-[12%] w-[520px] h-[520px] bg-fuchsia-300/30 blur-[120px] rounded-full"></div>
    <div class="absolute z-[1] right-[15%] top-[-120px] w-[420px] h-[420px] bg-purple-300/25 blur-[110px] rounded-full"></div>
  </div>
  <Hero/>
  <div class="w-full bg-[#EBEEFA] py-6">
  <div class="w-full h-full flex flex-col justify-center items-center gap-4">
    <p class="text-sm md:text-base font-medium text-gray-700 font-semibold">
      We scale with the platforms you love
    </p>
    <div class="flex justify-center items-center gap-6">
      <img src="https://play-lh.googleusercontent.com/aPsA6vS25mrocOJqZhTZyxm7sntS_IZuHh4oLBI6v-70A_mLV0Fe0spqSDTbK_Fy8As" class="w-[60px] h-[60px] rounded-lg object-contain" alt="WooCommerce" />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYZyqmtqSYlC6DpFKfKYxy4bw_N8Itrv3wFg&s" class="w-[60px] h-[60px] rounded-lg object-contain" alt="BigCommerce" />
      <img src="https://play-lh.googleusercontent.com/lQYxSdISBENwWO7RCF1j_AzjzdOaa1LUgRckYPFVvDkSWdD8P6jqCZebmAyZfufGpIY" class="w-[60px] h-[60px] rounded-lg object-contain" alt="Shopify" />
    </div>
  </div>
</div>

  <Info/>
  <Results/>
  <MissingOut/>
  <Contact experiments={data.experiments} />
  <Footer/>
</div>
