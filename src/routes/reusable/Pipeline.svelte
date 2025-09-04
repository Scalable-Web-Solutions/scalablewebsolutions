<script lang="ts">
  type Row = {
    label: string;
    icon ? : string; // emoji or inline SVG
    other: number; // 0..1
    withUs: number; // 0..1
  };
  // Copy + data
  export let title = "You’re missing out on";
  export let kicker = "50% of your pipeline.";
  export let subtitle = "You’ve invested time identifying contacts that fit your ICP, but over half of them are slipping away due to missing contact details.";
  export let rows: Row[] = [{
    label: "Total Reachable Market",
    icon: "▶️",
    other: 0.55,
    withUs: 0.95
  }, {
    label: "Sales Pipeline",
    icon: "☰",
    other: 0.30,
    withUs: 0.78
  }, {
    label: "Deals",
    icon: "💲",
    other: 0.18,
    withUs: 0.52
  }];
  let showOther = true;
  let showWithUs = true;
  const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
  const pct = (n: number) => `${Math.round(clamp01(n) * 100)}%`;
</script>
<section class="w-full text-neutral-900 bg-white rounded-3xl p-6 md:p-10 shadow-xl ring-1 ring-neutral-200">
  <!-- Headline -->
  <div class="space-y-3 text-center max-w-3xl mx-auto">
    <p class="text-2xl md:text-3xl/none font-medium text-neutral-700">{title}</p>
    <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight">{kicker}</h1>
    <p class="text-neutral-600 max-w-2xl mx-auto">{subtitle}</p>
  </div>
  <!-- Legend -->
  <div class="flex items-center justify-center gap-6 mt-8 border-t border-neutral-200 pt-6">
    <label class="inline-flex items-center gap-2 cursor-pointer select-none text-neutral-700">
      <span class="inline-flex items-center gap-2">
        <span class="h-3 w-3 rounded bg-neutral-400 ring-1 ring-neutral-300"></span> With other firms/no firm</span>
    </label>
    <label class="inline-flex items-center gap-2 cursor-pointer select-none text-neutral-700">
      <span class="inline-flex items-center gap-2">
        <span class="h-3 w-3 rounded bg-gradient-to-r from-violet-500 to-violet-700 shadow-[0_0_12px_rgba(124,58,237,.25)]"></span> With <span class="font-semibold">Scalable</span>
      </span>
    </label>
  </div>
  <!-- Rows -->
  <div class="mt-6 space-y-5"> {#each rows as r}
      
		<div class="rounded-2xl overflow-hidden bg-neutral-100 ring-1 ring-neutral-200">
			<!-- label -->
			<div class="px-5 py-3 flex items-center gap-3 text-sm md:text-base font-semibold bg-neutral-100/60 border-b border-neutral-200">
          {#if r.icon}
				<span class="opacity-70">{r.icon}</span>{/if}
				<span>{r.label}</span>
			</div>
			<!-- track -->
			<div class="relative h-16">
				<div class="absolute inset-0 bg-gradient-to-b from-white to-neutral-100"></div>

  {#if showOther}
    
				<!-- OTHER (baseline) -->
				<div
      class="absolute left-1 top-1 h-[calc(100%-0.5rem)]
             rounded-l-xl bg-neutral-300
             transition-[width] duration-700 ease-out z-10"
      style={`width:${pct(r.other)};`}
      title={`Other vendors • ${pct(r.other)}`}
    />
  {/if}

  {#if showWithUs}
    
				<!-- WITH US (delta only) -->
    {#key r} 
				<!-- ensure smooth reflow if data changes -->
				<!-- svelte-ignore element_invalid_self_closing_tag -->
				<div
        class="absolute left-1 top-1 h-[calc(100%-0.5rem)]
             rounded-r-xl bg-gradient-to-r from-violet-500 to-violet-700
             transition-[width] duration-700 ease-out z-10"
        style={`
          left:${pct(r.other)};
          width:${pct(Math.max(0, r.withUs - r.other))};
        `}
        title={`With you • ${pct(r.withUs)} (Δ ${pct(Math.max(0, r.withUs - r.other))})`}
      />
    {/key}
  {/if}

  
				<!-- outline -->
				<div class="absolute inset-0 pointer-events-none rounded-b-2xl ring-1 ring-neutral-200"></div>
			</div>
		</div>
    {/each}
  
	</div>
</section>
<style>
  /* Respect reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .transition-\[width\] { transition: none !important; }
  }
</style>