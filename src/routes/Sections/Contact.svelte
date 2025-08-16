<script lang="ts">
  import { Experiment } from "sws-parallel-render-engine";
  
  import ContactOne from "../reusable/ContactOne.svelte";
  import ContactTwo from "../reusable/ContactTwo.svelte";
  const { experiments } = $props<{ experiments: Record<string, string> }>();
</script>

<div id='contact' class="min-h-[45vh] md:h-[75vh] relative z-10 w-full bg-gray-50 py-10 md:py-0 flex items-center justify-center">
  <div class="mx-auto max-w-7xl w-full px-6 flex justify-center">
    <!-- <Experiment id="landing_hero_v1" current={experiments.landing_hero_v1} let:current>
      {#if current === 'alt'}
        <ContactTwo/>
      {:else}
        <ContactOne/>
      {/if}

    </Experiment> -->


    <!-- Contact Info -->
    <div class="contact-info flex flex-col gap-5 justify-between max-w-lg w-full text-left">
      <div class="top flex flex-col gap-2">
        <h1 class="text-4xl md:text-6xl font-medium">Contact Us</h1>
        <p>Send us a message! We're always here to help, our sales team will get back to you as soon as possible.</p>
      </div>

      <div class="middle flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <p>(773) 706-1447</p>
        </div>
        <div class="flex items-center gap-3">
          <p>contact@scalableweb.solutions</p>
        </div>
        <div class="flex items-center gap-3">
          <p>Global</p>
        </div>
      </div>

      <div class="bottom flex flex-col gap-4">
        <h1 class="text-2xl md:text-3xl font-medium">Follow Us</h1>
        <div class="flex flex-wrap items-center gap-5">
          <p class="fab fa-facebook-f">Facebook</p>
          <p class="fab fa-twitter">Twitter</p>
          <p class="fab fa-instagram">Instagram</p>
          <p class="fab fa-linkedin-in">LinkedIn</p>
        </div>
        <a  href="mailto:contact@scalableweb.solutions" class="bg-gray-800 text-white px-6 py-4 rounded-full text-center">Contact via Email</a>

      </div>
    </div>

  </div>
</div>
