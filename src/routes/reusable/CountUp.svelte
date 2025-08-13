<script lang="ts">
  import { onMount } from "svelte";

  export let to = 0;          // final value
  export let duration = 1200; // ms
  export let decimals = 0;    // digits after the decimal
  export let prefix = "";
  export let suffix = "";
  export let start = 0;       // starting value
  export let once = true;     // only run the first time it appears
  export let easing = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

  let el: HTMLSpanElement;
  let current = start;
  let ran = false;
  let raf = 0;

  function format(n: number) {
    return (
      prefix +
      n.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      }) +
      suffix
    );
  }

  function animate() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current = to;
      return;
    }
    const t0 = performance.now();
    const from = start;

    cancelAnimationFrame(raf);
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      current = from + (to - from) * easing(p);
      if (p < 1) {
        raf = requestAnimationFrame(step);
      } else {
        current = to;
      }
    };
    raf = requestAnimationFrame(step);
  }

  onMount(() => {
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.some(e => e.isIntersecting);
        if (visible && (!ran || !once)) {
          ran = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  });
</script>

<span bind:this={el}>{format(current)}</span>
