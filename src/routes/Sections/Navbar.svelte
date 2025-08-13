<script lang="ts">
    export let logo: string;
</script>

<header class="z-50 fixed top-0 left-0 right-0 bg-gradient-to-b from-black/15 to-transparent">
    <div class="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <img src={logo} class="w-10 h-10 rounded-lg" alt="" />
        <h1 class="text-3xl md:text-5xl">Scalable</h1>
      </div>

      <nav class="flex items-center gap-6">
        <p on:click={() => scrollToId('packages')}>Packages</p>
        <a href="#results">About</a>
        <p on:click={() => scrollToId('demo')}>Demo</p>
        <p on:click={() => scrollToId('pricing')}>Pricing</p>
        <button class="bg-[#1D2939] text-white px-5 py-3 rounded-full">Contact Us</button>
        <button class="bg-gray-200 text-black px-5 py-3 rounded-full -ml-2">Request a Demo</button>
      </nav>
    </div>
  </header>