<div class="relative z-20 bg-gray-50 py-10">
  <div class="flex justify-center items-center gap-4 mb-10">
    <a href="https://github.com/Scalable-Web-Solutions">GitHub</a>
    <a href="https://www.linkedin.com/company/scalable-web-solutions">LinkedIn</a>
    <a href="https://www.instagram.com/scalablewebsolutions/">Instagram</a>
  </div>

  <h1 
    id="gradient-text"
    class="text-[75px] lg:text-[260px] font-semibold text-center bg-clip-text text-transparent transition-all duration-300"
    style="
      background-image: radial-gradient(circle at 50% 50%, #bb71ff, #9a4dff, #6d28d9);
      background-size: 200% 200%;
    "
  >
    SCALABLE
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
      text.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, #bb71ff, #9a4dff, #6d28d9)`;
    }
  });
  })
</script>
