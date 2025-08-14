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

  <div class="min-h-[75vh] md:h-[75vh] relative z-10 w-full bg-gray-50 py-10 md:py-0">
  <div class="mx-auto max-w-7xl h-full px-6 relative z-10">
    <div class="margin w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-start lg:items-center gap-12 text-black h-full">
      
      <!-- Left: Contact Info -->
      <div class="contact-info flex flex-col gap-5 justify-between h-auto md:h-[85%]">
        <div class="top flex flex-col gap-2">
          <h1 class="text-4xl md:text-6xl font-medium">Contact Us</h1>
          <p>Send us a message! We're always here to help, our sales team will get back to you as soon as possible.</p>
        </div>

        <div class="middle flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <i class="fas fa-phone"></i>
            <p>(773) 706-1447</p>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-envelope"></i>
            <p>contact@scalableweb.solutions</p>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-map-marker-alt"></i>
            <p>Global</p>
          </div>
        </div>

        <div class="bottom flex flex-col gap-4">
          <h1 class="text-2xl md:text-3xl font-medium">Follow Us</h1>
          <div class="flex flex-wrap items-center gap-5">
            <a class="fab fa-facebook-f">Facebook</a>
            <a class="fab fa-twitter">Twitter</a>
            <a class="fab fa-linkedin-in">LinkedIn</a>
          </div>
        </div>
      </div>

      <!-- Right: Form -->
      <div class="form relative flex flex-col gap-5 bg-gray-100 h-auto md:h-[85%] p-5 rounded-xl">
        <h1 class="p-5 text-2xl md:text-3xl font-medium">Send us a message!</h1>

        <div class="relative">
          <input class="w-full p-5 bg-transparent focus:outline-none" placeholder="Name" type="text" />
        </div>

        <div class="relative">
          <input class="w-full p-5 bg-transparent focus:outline-none" placeholder="Email" type="text" />
        </div>

        <div class="relative">
          <input class="w-full p-5 bg-transparent focus:outline-none" placeholder="Phone" type="text" />
        </div>

        <div class="relative">
          <input class="w-full p-5 bg-transparent focus:outline-none" placeholder="Message" type="text" />
        </div>

        <button class="bg-gray-800 text-white px-4 py-4 rounded-full w-full sm:w-auto">Send Message</button>
      </div>
    </div>
  </div>
</div>

  <Footer/>
</div>
