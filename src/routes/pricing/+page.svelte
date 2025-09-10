<script lang="ts">
  import { Check, ArrowRight, Sparkles } from 'lucide-svelte';

  type Billing = 'monthly' | 'annually';
  let billing: Billing = 'monthly';

  // single plan
  const plan = {
    name: 'RPV Growth',
    badge: 'Most popular',
    highlight: true,
    description: 'For brands ready to scale & optimize conversions.',
    prices: { monthly: 10000, annually: null as number | null },
    cta: 'Get Started',
    datacta: 'premium_pkg',
    features: [
      'Trust building layout',
      'Data backed A/B testing',
      'RPV optimization',
      'Advanced analytics dashboard',
      'Cancel anytime',
      'No hidden fees',
      'Dedicated account manager'
    ]
  };

  const hasAnnual = plan.prices.annually !== null;
  const fmt = (n: number | null) => (n === null ? 'Custom' : `$${n.toLocaleString()}`);
  $: price = billing === 'monthly' ? plan.prices.monthly : plan.prices.annually;
  $: priceLabel =
    price === null ? '' : billing === 'monthly' ? 'billed monthly' : 'per month — total billed annually';
</script>

<svelte:head><title>Pricing — Scalable</title></svelte:head>

<div class="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-[#EBEEFA]">
  <div class="pointer-events-none absolute -top-32 -left-24 h-72 w-72 rounded-full bg-[#7b7bf2]/20 blur-3xl"></div>
  <div class="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#b6b8ff]/30 blur-3xl"></div>

  <main class="mx-auto max-w-7xl px-6 pt-28 pb-20">
    <!-- Hero -->
    <section class="text-center">
      <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
        Simple, transparent <span class="bg-gradient-to-r from-[#32155c] via-[#c870ff] to-[#32155c] text-transparent bg-clip-text">pricing</span>
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-gray-600 text-lg">
        RPV growth with data-backed A/B testing, trust building layouts, and <b>deep</b> analytics.
        <br /><b>Cancel anytime</b>, <b>no hidden fees</b>, and <b>dedicated account manager</b>.
      </p>

      <!-- Billing toggle (auto-hides if no annual price) -->
      {#if hasAnnual}
        <div class="mt-8 inline-flex items-center rounded-full bg-white/80 backdrop-blur border border-gray-200 p-1 shadow-sm">
          <button
            class="rounded-full px-4 py-2 text-sm font-medium transition data-[active=true]:bg-[#1D2939] data-[active=true]:text-white"
            data-active={billing === 'monthly'}
            on:click={() => (billing = 'monthly')}>
            Monthly
          </button>
          <button
            class="rounded-full px-4 py-2 text-sm font-medium transition data-[active=true]:bg-[#1D2939] data-[active=true]:text-white"
            data-active={billing === 'annually'}
            on:click={() => (billing = 'annually')}>
            Annually
          </button>
        </div>
      {/if}
    </section>

    <!-- Trust mini-bar -->
    <section class="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
      <span class="inline-flex items-center gap-2"><Sparkles class="h-4 w-4" /> 14-day average turnaround</span>
      <span class="h-1 w-1 rounded-full bg-gray-300"></span>
      <span>No long-term contracts</span>
      <span class="h-1 w-1 rounded-full bg-gray-300"></span>
      <span>Cancel anytime</span>
    </section>

    <!-- Single pricing card -->
    <section class="mt-12">
      <article
        class={`group relative rounded-3xl p-[1px] ${
          plan.highlight ? 'bg-gradient-to-b from-[#C2C3FF] to-[#E8E9FF]' : 'bg-gradient-to-b from-white to-white'
        } shadow-xl`}
        aria-label={`${plan.name} plan`}>
        <div class="flex h-full flex-col rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/90 backdrop-blur border border-gray-200 p-7">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold">{plan.name}</h3>
            {#if plan.badge}
              <span class="rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-sm">{plan.badge}</span>
            {/if}
          </div>

          <p class="mt-2 text-gray-600">{plan.description}</p>

          <div class="mt-6 flex items-baseline gap-2">
            <span class="text-4xl font-bold">{fmt(price)}</span>
            <span class="text-gray-500">{priceLabel}</span>
          </div>

          <ul class="mt-6 space-y-3">
            {#each plan.features as f}
              <li class="flex gap-3 text-gray-700">
                <Check class="h-5 w-5 text-[#514BB2] shrink-0" />
                <span>{f}</span>
              </li>
            {/each}
          </ul>

          <a
            href="mailto:contact@scalablewebsolutions.com"
            data-cta={plan.datacta}
            class={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 font-medium transition ${
              plan.highlight
                ? 'bg-[#1D2939] text-white hover:bg-[#0F172A]'
                : 'border border-[#1D2939] text-[#1D2939] hover:bg-[#1D2939] hover:text-white'
            }`}>
            {plan.cta}
            <ArrowRight class="h-4 w-4" />
          </a>
        </div>
      </article>
    </section>

    <!-- Secondary CTA -->
    <section class="mt-16 text-center">
      <p class="text-gray-600">Not sure which fit is best? We’ll recommend one in a 10-minute call.</p>
      <a href="/#contact" class="mt-4 inline-block rounded-full border border-[#1D2939] px-5 py-3 text-[#1D2939] hover:bg-[#1D2939] hover:text-white transition">
        Contact Us
      </a>
    </section>

    <!-- Tiny FAQ -->
    <section class="mt-14 grid gap-4 md:max-w-3xl md:mx-auto">
      <details class="group rounded-2xl border border-gray-200 bg-white/80 p-5">
        <summary class="cursor-pointer list-none font-medium">Why Scalable Web Solutions?</summary>
        <p class="mt-3 text-gray-600">We help businesses grow by providing the tools and support they need to succeed. Our team of experts are here to help you every step of the way.</p>
      </details>
      <details class="group rounded-2xl border border-gray-200 bg-white/80 p-5">
        <summary class="cursor-pointer list-none font-medium">Yearly vs. Monthly</summary>
        <p class="mt-3 text-gray-600">We offer both monthly and annual plans. The monthly plan is a great way to get started, and the annual plan is a great way to save money.</p>
      </details>
    </section>
  </main>
</div>