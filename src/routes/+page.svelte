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

  <div class="h-[75vh] relative z-10 w-full bg-gray-50">
    <div class="mx-auto max-w-7xl h-full px-6 relative z-10">
      <div class="margin w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 text-black flex-col justify-center h-full">
        <div class="contact-info flex flex-col gap-5 justify-between h-[85%]">

          <div class="top flex flex-col gap-2">
            <h1 class="text-6xl font-medium">Contact Us</h1>
            <p>Send us a message! We're always here to help, our sales team will get back to you as soon as possible.</p>
          </div>
          <div class="middle flex flex-col gap-5">
            <div class="flex">
              <i class="fas fa-phone"></i>
              <p>(773) 706-1447</p>
            </div>
            <div class="flex">
              <i class="fas fa-envelope"></i>
              <p>contact@scalableweb.solutions</p>
            </div>
            <div class="flex">
              <i class="fas fa-map-marker-alt"></i>
              <p>Global</p>
            </div>
          </div>
          <div class="bottom flex flex-col gap-5">
            <h1 class="text-3xl font-medium">Follow Us</h1>
            <div class="flex items-center gap-5">
              <p class="fab fa-facebook-f">Facebook</p>
              <p class="fab fa-twitter">Twitter</p>
              <p class="fab fa-instagram">Instagram</p>
              <p class="fab fa-linkedin-in">LinkedIn</p>
            </div>
          </div>
        </div>
        <div class="form flex flex-col gap-5 bg-gray-100 h-[85%] p-5 rounded-xl">
          <h1 class="p-5 text-3xl font-medium">Send us a message!</h1>
          <input class="p-5 focus:outline-none" placeholder="Name" type="text" />
          <div class="bottomborder absolute bg-black h-[0.5px] z-20 w-[200px] top-[220px] ml-5"></div>
          <input class="p-5 focus:outline-none" placeholder="Email" type="text" />
          <div class="bottomborder absolute bg-black h-[0.5px] z-20 w-[200px] top-[300px] ml-5"></div>
          <input class="p-5 focus:outline-none" placeholder="Phone" type="text" />
          <div class="bottomborder absolute bg-black h-[0.5px] z-20 w-[150px] top-[380px] ml-5"></div>
          <input class="p-5 focus:outline-none" placeholder="Message" type="text" />
          <button class="bg-gray-800 text-white px-4 py-4 rounded-full">Send Message</button>
          <div class="bottomborder absolute bg-black h-[0.5px] z-20 w-[400px] top-[460px] ml-5"></div>

        </div>
      </div>
    </div>
  </div>
  <Footer/>
</div>
