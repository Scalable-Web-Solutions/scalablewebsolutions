<script lang="ts">
  import { Check, ArrowRight, Sparkles } from 'lucide-svelte';

  type Billing = 'monthly' | 'anually';
  let billing: Billing = 'anually';

  const plans = [
    {
      name: 'Starter',
      badge: '',
      highlight: false,
      description: 'Best for new stores validating product–market fit.',
      prices: { monthly: 3000, anually: 28000 },
      cta: 'Get Started',
      features: [
        'Core site audit & fixes',
        'Custom Shopify theme',
        'Basic SEO + analytics setup'
      ]
    },
    {
      name: 'Growth',
      badge: 'Most popular',
      highlight: true,
      description: 'For brands ready to scale conversions.',
      prices: { monthly: 5000, anually: 48000 },
      cta: 'Get Started',
      features: [
        'Everything in Starter',
        'Speed & responsiveness boost',
        'Conversion optimisation',
        '1-on-1 strategy session'
      ]
    },
    {
      name: 'Scale',
      badge: '',
      highlight: false,
      description: 'Custom growth program for high-volume stores.',
      prices: { monthly: null, anually: null }, // custom
      cta: 'Request a Quote',
      features: [
        'Everything in Growth',
        'Ongoing A/B testing',
        'Advanced analytics dashboard',
        'Priority support'
      ]
    }
  ];

  const fmt = (n: number | null) => (n === null ? 'Custom' : `$${n.toLocaleString()}`);
</script>

<svelte:head>
  <title>Pricing — Scalable</title>
</svelte:head>

<!-- BG -->
<div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-[#EBEEFA]">
  <div class="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[#7b7bf2]/20 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#b6b8ff]/30 blur-3xl"></div>

  <main class="mx-auto max-w-7xl px-6 pt-28 pb-20">
    <!-- Hero -->
    <section class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
        Simple, transparent <span class="text-[#514BB2]">pricing</span>
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-gray-600 text-lg">
        Every plan includes a site audit, custom design, and expert guidance—no hidden fees.
      </p>

      <!-- Billing toggle -->
      <div class="mt-8 inline-flex items-center rounded-full bg-white/80 backdrop-blur border border-gray-200 p-1 shadow-sm">
        <button
          class="rounded-full px-4 py-2 text-sm font-medium transition
                 data-[active=true]:bg-[#1D2939] data-[active=true]:text-white"
          data-active={billing === 'monthly'}
          on:click={() => (billing = 'monthly')}>
          Per project
        </button>
        <button
          class="rounded-full px-4 py-2 text-sm font-medium transition
                 data-[active=true]:bg-[#1D2939] data-[active=true]:text-white"
          data-active={billing === 'anually'}
          on:click={() => (billing = 'anually')}>
          Anually
        </button>
      </div>
    </section>

    <!-- Trust mini-bar -->
    <section class="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
      <span class="inline-flex items-center gap-2"><Sparkles class="h-4 w-4" /> 7-day average turnaround</span>
      <span class="h-1 w-1 rounded-full bg-gray-300"></span>
      <span>No long-term contracts</span>
      <span class="h-1 w-1 rounded-full bg-gray-300"></span>
      <span>Cancel anytime</span>
    </section>

    <!-- Pricing grid -->
    <section class="mt-12 grid gap-8 md:grid-cols-3">
      {#each plans as plan}
        <article
          class={`group relative rounded-3xl p-[1px] ${
            plan.highlight
              ? 'bg-gradient-to-b from-[#C2C3FF] to-[#E8E9FF]'
              : 'bg-gradient-to-b from-white to-white'
          } shadow-xl`}
          aria-label={`${plan.name} plan`}>
          <div class="flex h-full flex-col rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/90 backdrop-blur border border-gray-200 p-7">
            <!-- Badge / title -->
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">{plan.name}</h3>
              {#if plan.badge}
                <span class="rounded-full bg-[#514BB2] px-3 py-1 text-xs font-medium text-white shadow-sm">
                  {plan.badge}
                </span>
              {/if}
            </div>

            <p class="mt-2 text-gray-600">{plan.description}</p>

            <!-- Price -->
            <div class="mt-6 flex items-baseline gap-2">
              <span class="text-4xl font-bold">
                {fmt(plan.prices[billing])}
              </span>
              <span class="text-gray-500">
                {plan.prices[billing] === null
                  ? ''
                  : billing === 'monthly' ? 'per month' : 'per year'}
              </span>
            </div>

            <!-- Features -->
            <ul class="mt-6 space-y-3">
              {#each plan.features as f}
                <li class="flex gap-3 text-gray-700">
                  <Check class="h-5 w-5 text-[#514BB2] shrink-0" />
                  <span>{f}</span>
                </li>
              {/each}
            </ul>

            <!-- CTA -->
            <a
              href="/contact"
              class={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition
                      ${plan.highlight
                        ? 'bg-[#1D2939] text-white hover:bg-[#0F172A]'
                        : 'border border-[#1D2939] text-[#1D2939] hover:bg-[#1D2939] hover:text-white'}`}>
              {plan.cta}
              <ArrowRight class="h-4 w-4" />
            </a>
          </div>
        </article>
      {/each}
    </section>

    <!-- Secondary CTA -->
    <section class="mt-16 text-center">
      <p class="text-gray-600">Not sure which fit is best? We’ll recommend one in a 10-minute call.</p>
      <a href="/contact"
         class="mt-4 inline-block rounded-full border border-[#1D2939] px-5 py-3 text-[#1D2939] hover:bg-[#1D2939] hover:text-white transition">
        Contact Us
      </a>
    </section>

    <!-- Tiny FAQ (minimal, optional) -->
    <section class="mt-14 grid gap-4 md:max-w-3xl md:mx-auto">
      <details class="group rounded-2xl border border-gray-200 bg-white/80 p-5">
        <summary class="cursor-pointer list-none font-medium">What does “per project” include?</summary>
        <p class="mt-3 text-gray-600">One scoped engagement covering audit, design, and implementation for a single store or site.</p>
      </details>
      <details class="group rounded-2xl border border-gray-200 bg-white/80 p-5">
        <summary class="cursor-pointer list-none font-medium">Can I upgrade later?</summary>
        <p class="mt-3 text-gray-600">Yep. Move from Starter → Growth or to a custom Scale program anytime.</p>
      </details>
    </section>
  </main>
</div>
