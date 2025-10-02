<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
  
    /** Public props (tweak timings to taste) */
    export let text = "Scalable";
    export let show = true;
    export let autoHide = true;
  
    // visuals
    export let bgColor = "#ffffff";
    export let fontSize = "clamp(75px, 15vw, 260px)";
    export let fontWeight: number | string = 500;
    export let letterSpacing = "0em";
    // gradient that fills the text
    export let textGradient =
      "linear-gradient(to right, #32155c, #c870ff, #32155c);";
    // shine animation properties
    export let shineIntensity = 0.95;
    export let shineWidth = 30;
  
    // timings (ms)
    export let bgIn = 350;
    export let textIn = 350;
    export let shineDuration = 700;
    export let hold = 250;
    export let out = 650;
  
    const dispatch = createEventDispatcher();
  
    const delayText = bgIn + 100;
    const delayShine = bgIn + textIn + 50;
    const delayOut = bgIn + textIn + shineDuration + hold - 100;
  
    onMount(() => {
      const total = delayOut + out;
      if (autoHide) {
        const t = setTimeout(() => {
          show = false;
          dispatch("done");
        }, total);
        return () => clearTimeout(t);
      }
    });
  </script>
  
  {#if show}
  <div
    class="overlay"
    style="
      --bg-in: {bgIn}ms;
      --text-in: {textIn}ms;
      --shine: {shineDuration}ms;
      --delay-text: {delayText}ms;
      --delay-shine: {delayShine}ms;
      --delay-out: {delayOut}ms;
      --out: {out}ms;
      background:{bgColor};
    "
    on:animationend={(e) => {
      // When the bg fade-out finishes, let listeners know even if autoHide=false
      if ((e as AnimationEvent).animationName === 'bg-out') dispatch('done');
    }}
  >
    <h1
      class="logo"
      style="
        --text-grad: {textGradient};
        --shine-intensity: {shineIntensity};
        --shine-width: {shineWidth}px;
        --slice-w: 28%;                  /* width of the shiny band */
        --shine-angle: 120deg;           /* angle of the sweep */
        font-size:{fontSize};
        font-weight:{fontWeight};
        letter-spacing:{letterSpacing};
      "
    >
      {text}
    </h1>
  </div>
  {/if}
  
  <style>
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      opacity: 0;
      animation:
        bg-in var(--bg-in) ease forwards,
        bg-out var(--out) ease var(--delay-out) forwards;
    }
  
    @keyframes bg-in   { from { opacity: 0 } to { opacity: 1 } }
    @keyframes bg-out  { from { opacity: 1 } to { opacity: 0 } }
  
    .logo {
      position: relative;
      margin: 0;
      line-height: 1;
      /* gradient-filled text */
      color: transparent;
      background-image:
       linear-gradient(var(--shine-angle),
         rgba(255,255,255,0) 0%,
         rgba(255,255,255,0) 40%,
         rgba(255,255,255,0.95) 50%,
         rgba(255,255,255,0) 60%,
         rgba(255,255,255,0) 100%
       ),
      var(--text-grad);
      background-size:
      var(--slice-w) 100%,
      100% 100%;
      background-position:
      -35% 0,
      center;
      -webkit-background-clip: text;
              background-clip: text;
      filter: drop-shadow(0 6px 24px rgba(0,0,0,0.05));
  
      /* sequence: fade in, shine sweep, fade out */
      opacity: 0;
      animation:
        text-in var(--text-in) cubic-bezier(.22,.61,.36,1) var(--delay-text) forwards,
        shine   var(--shine)   ease                      var(--delay-shine) forwards,
        text-out var(--out)    ease                      var(--delay-out) forwards;
        background-repeat: no-repeat, no-repeat;
    }

    
  
    @keyframes text-in   { to { opacity: 1 } }
    @keyframes text-out  { to { opacity: 0 } }
  
    /* Animate only the second background's position to create the slice sweep */
    @keyframes shine {
    from { background-position: -35% 0, center; }
    to   { background-position: 135% 0, center; }
  }
  
    /* Respect reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .overlay, .logo { animation-duration: 1ms; animation-delay: 0ms; }
    }
  </style>
  