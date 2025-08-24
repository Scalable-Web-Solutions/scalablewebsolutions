<script lang="ts">
  import { Menu, X } from "lucide-svelte";
  export let logo: string;

  let open = false;

  function scrollToId(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    open = false;
  }
</script>

<header class="z-50 fixed top-0 left-0 right-0 bg-gradient-to-b from-black/15 to-transparent overflow-x-hidden">
  <div class="mx-auto max-w-7xl px-4 md:px-6 py-6 flex items-center justify-between">
    <!-- Logo/Title -->
    <div on:click={()=> window.location.href = '/'} class="flex items-center gap-3 min-w-0">
      <img src={logo} class="w-10 h-10 rounded-lg flex-shrink-0" alt="" />
      <h1 class="text-3xl md:text-5xl truncate">Scalable</h1>
    </div>

    <!-- Desktop nav -->
    <nav class="hidden md:flex items-center gap-6">
      <a on:click={() => scrollToId('about')}>About</a>
      <a on:click={() => scrollToId('results')}>Results</a>
      <p on:click={() => scrollToId('contact')}>Demo</p>
      <a href="/pricing">Pricing</a>

      <button class="bg-[#1D2939] text-white px-5 py-3 rounded-full">Contact Us</button>
      <button class="bg-gray-200 text-black px-5 py-3 rounded-full -ml-2">Request a Demo</button>
    </nav>

    <!-- Mobile hamburger -->
    <button
      class="md:hidden inline-flex items-center justify-center p-2 rounded-lg flex-shrink-0"
      aria-label="Toggle menu"
      aria-expanded={open}
      on:click={() => (open = !open)}
    >
      {#if open}
        <X class="w-7 h-7" />
      {:else}
        <Menu class="w-7 h-7" />
      {/if}
    </button>
  </div>

  <!-- Mobile menu panel -->
  <div
    class="md:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden fixed"
    style={`max-height:${open ? '500px' : '0'}; opacity:${open ? '1' : '0'};`}
  >
    <div class="mx-auto max-w-7xl px-6 pb-6">
      <div class="flex flex-col gap-4 bg-white/80 backdrop-blur rounded-2xl p-5 shadow-sm border border-gray-200">
        <button class="text-left" on:click={() => scrollToId('packages')}>Results</button>
        <a class="text-left" href="#results" on:click={() => (open = false)}>About</a>
        <button class="text-left" on:click={() => scrollToId('demo')}>Demo</button>
        <button class="text-left" on:click={() => scrollToId('pricing')}>Pricing</button>
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <button class="bg-[#1D2939] text-white px-5 py-3 rounded-full w-full sm:w-auto">Contact Us</button>
          <button class="bg-gray-200 text-black px-5 py-3 rounded-full w-full sm:w-auto sm:-ml-2">Request a Demo</button>
        </div>
      </div>
    </div>
  </div>
</header>
