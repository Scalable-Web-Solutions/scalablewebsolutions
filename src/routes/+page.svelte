<script lang="ts">
  import logo from '$lib/assets/scalablewebsolutions.png'
    import { Globe, ShieldCheck, Users } from 'lucide-svelte';
    import CountUp from './reusable/CountUp.svelte';
    import lighthousereport from '$lib/assets/lighthouse.png'
    import Footer from './Sections/footer.svelte';
    import Navbar from './Sections/Navbar.svelte';
    import Hero from './Sections/Hero.svelte';
    import Info from './Sections/Info.svelte';
    import Results from './Sections/Results.svelte';
    import Contact from './Sections/Contact.svelte';

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
  <Navbar logo={logo} />


  <!-- Hero -->
  <Hero/>

  <div class="brandshelped relative z-10 w-full h-[100px] bg-white flex items-center justify-center">
    <h1 class="text-3xl mt-2">100+ Brands Scaled</h1>
  </div>

  <Info/>
  <!-- ResultsSection.svelte -->
  <Results/>
  <Contact/>

  <Footer/>
</div>
