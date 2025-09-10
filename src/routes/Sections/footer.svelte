<div class="relative z-20 bg-gray-50 py-10">
  <div class="flex justify-center items-center gap-4 mb-10">
    <a href="https://github.com/Scalable-Web-Solutions">GitHub</a>
    <a href="https://www.linkedin.com/company/scalable-web-solutions">LinkedIn</a>
    <a href="https://www.instagram.com/scalablewebsolutions/">Instagram</a>
  </div>

  <h1 
    id="gradient-text"
    class="text-[75px] font-medium lg:text-[260px] text-center bg-clip-text text-transparent transition-all duration-300"
    style="
      background-image: radial-gradient(circle at 50% 50%, #32155c, #c870ff, #32155c);
      background-size: 200% 200%;
    "
  >
    Scalable
  </h1>
</div>

<script>
    import { onMount } from "svelte";

  onMount(() => {
    const text = document.getElementById("gradient-text");

  document.addEventListener("mousemove", (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 100;
    const y = (e.clientY / innerHeight) * 100;
    if (text) {
      text.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, #32155c, #c870ff, #32155c)`;
    }
  });
  })
</script>
