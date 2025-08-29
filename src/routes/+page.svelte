<script lang="ts">
    import Footer from './Sections/footer.svelte';
    import Hero from './Sections/Hero.svelte';
    import Info from './Sections/Info.svelte';
    import Results from './Sections/Results.svelte';
    import Contact from './Sections/Contact.svelte';

    import kaytee from '$lib/assets/kaytee.jpg'

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

  <div class="brandshelped relative z-10 w-full h-[140px] bg-white flex items-center justify-center flex-col">
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore event_directive_deprecated -->
    <div class="flex items-center gap-2">
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <img on:click={() => window.open('https://upcontenthu.netlify.app', '_blank')} src={kaytee} alt="" class="w-[80px] h-[80px] rounded-md">
    </div>
  </div>

  <Info/>
  <Results/>
  <Contact/>
  <Footer/>
</div>
