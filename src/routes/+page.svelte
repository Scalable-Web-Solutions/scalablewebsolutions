<script lang="ts">
    import Footer from './Sections/footer.svelte';
    import Hero from './Sections/Hero.svelte';
    import Info from './Sections/Info.svelte';
    import Results from './Sections/Results.svelte';
    import Contact from './Sections/Contact.svelte';

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

  <div class="brandshelped relative z-10 w-full h-[100px] bg-white flex items-center justify-center">
    <h1 class="text-3xl mt-2">10+ Brands Scaled</h1>
  </div>

  <Info/>
  <Results/>
  <Contact experiments={data.experiments}/>
  <Footer/>
</div>
