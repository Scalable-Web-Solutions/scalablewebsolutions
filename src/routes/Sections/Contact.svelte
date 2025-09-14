<script lang="ts">
  import { Mail, Phone, CalendarClock, Copy, Check, ShieldCheck, X, CalendarDays, Clock } from "lucide-svelte";
  import { Experiment } from "sws-parallel-render-engine";
  import ContactTwo from "../reusable/ContactTwo.svelte";
  import ContactOne from "../reusable/ContactOne.svelte";

  const email = "contact@scalableweb.solutions";
  const phone = "+17737061447";

  const chips = ["New site", "Redesign", "CRO / A/B", "Shopify", "Analytics", "Performance"];
  let selected = new Set<string>();
  let copied = false;

  function toggleChip(c: string) {
    selected.has(c) ? selected.delete(c) : selected.add(c);
  }

  const subject = () => `Project inquiry — ${[...selected].join(", ") || "General"}`;
  const body = () => `Hi Scalable team,

I'm interested in ${[...selected].join(", ") || "a new project"}.
A bit about us / goals:

- Current site / stack:
- Main KPI to improve:
- Timeline / budget range:

Thanks!`;

  const mailtoHref = () =>
    `mailto:${email}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(body())}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      copied = true;
      setTimeout(() => (copied = false), 1200);
    } catch {}
  }

  /* calendar modal state */
  let open = false;
  let selectedDate: Date | null = null;
  let selectedTime: string | null = null;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + i);
    return d;
  });

  function fmtDay(d: Date) {
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  }
  function fmtISODateTime(date: Date, time: string) {
    const [h, m] = time.split(":").map(Number);
    const d = new Date(date);
    d.setHours(h, m, 0, 0);
    return d;
  }
  function fmtPretty(date: Date, time: string) {
    const dt = fmtISODateTime(date, time);
    return dt.toLocaleString(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  }
  const times = (() => {
    const out: string[] = [];
    let mins = 9 * 60; // 9:00
    const end = 17 * 60; // 5:00 PM
    while (mins <= end - 20) { // 20-min consult
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      out.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
      mins += 30; // 30-min increments feel natural; change to 20 for every 20 mins
    }
    return out;
  })();

  function mailtoConsult() {
    if (!selectedDate || !selectedTime) return "#";
    const pretty = fmtPretty(selectedDate, selectedTime);
    const sub = `20-min consult — ${pretty} (${tz})`;
    const b = `Hi Scalable team,

I'd like to book a 20-minute consult.

Proposed time:
• ${pretty} (${tz})

Context: ${[...selected].join(", ") || "General"}

Thanks!`;
    return `mailto:${email}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(b)}`;
  }

  function openModal() {
    open = true;
    selectedDate ??= days[0];
  }
  function closeModal() {
    open = false;
  }
  function backdropClose(e: MouseEvent) {
    if (e.target === e.currentTarget) closeModal();
  }

  //const { experiments } = $props<{ experiments: Record<string, string> }>();
</script>

<section id="contact" class="relative z-10 w-full bg-gray-50 py-10">
  <!-- <Experiment id="landing_hero_v1" current={experiments.landing_hero_v1} let:current>
      {#if current === 'alt'}
        <ContactTwo/>
      {:else}
        <ContactOne/>
      {/if}

    </Experiment> -->
  <div class="mx-auto max-w-7xl px-6 py-12 md:py-16">
    <div class="grid grid-cols-1 lg:grid-cols-[1.1fr] gap-8">
      <div class="rounded-2xl backdrop-blur p-6 md:p-8">
        <div class="flex items-start justify-between gap-6">
          <div>
            <h2 class="text-4xl md:text-5xl font-medium">Contact Us</h2>
            <p class="mt-2 text-gray-700">
              One click and we’ll take it from there. Avg reply time: <span class="font-medium">~1 hour</span>.
            </p>
          </div>
          <div class="hidden md:flex items-center gap-2 rounded-full bg-indigo-50 text-indigo-700 px-3 py-1 text-sm">
            <ShieldCheck class="w-4 h-4" /> No spam. Ever.
          </div>
        </div>

        <!-- Primary CTAs -->
        <div class="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            class="inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 text-white px-6 py-4 font-medium hover:bg-gray-800 active:scale-[0.99] transition"
            href={mailtoHref()}
            data-cta="contact_email_oneclick"
            aria-label="Email us"
          >
            <Mail class="w-5 h-5" /> Email us
          </a>

          <a
            class="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-4 font-medium hover:bg-gray-50 active:scale-[0.99] transition"
            href={`tel:${phone}`}
            data-cta="contact_call"
            aria-label="Call us"
          >
            <Phone class="w-5 h-5" /> Call {phone}
          </a>

          <!-- changed to button to open modal -->
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white px-6 py-4 font-medium hover:bg-indigo-500 active:scale-[0.99] transition"
            on:click={openModal}
            data-cta="contact_book_consult"
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <CalendarClock class="w-5 h-5" /> Book 20-min consult
          </button>
        </div>

        <!-- Quick scope chips -->
        <div class="mt-6">
          <p class="text-sm text-gray-600 mb-2">What’s this about? (optional)</p>
          <div class="flex flex-wrap gap-2">
            {#each chips as c}
              <button
                class="px-3 py-1.5 rounded-full text-xs font-medium transition"
                class:bg-indigo-600={selected.has(c)}
                class:text-white={selected.has(c)}
                class:bg-indigo-50={!selected.has(c)}
                class:text-indigo-700={!selected.has(c)}
                on:click={() => toggleChip(c)}
                data-cta={`contact_chip_${c.replace(/[^a-z0-9]/gi,'_').toLowerCase()}`}
              >
                {c}
              </button>
            {/each}
          </div>
        </div>

        <!-- Copy-to-clipboard line -->
        <div class="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div class="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
            {email}
          </div>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3 hover:bg-gray-50 active:scale-[0.99] transition"
            on:click={copyEmail}
            data-cta="contact_copy_email"
            aria-live="polite"
          >
            {#if copied}
              <Check class="w-4 h-4 text-green-600" /> Copied
            {:else}
              <Copy class="w-4 h-4" /> Copy
            {/if}
          </button>
        </div>

        <div class="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span class="opacity-70">Prefer socials?</span>
          <a href="#" class="hover:text-gray-900">Instagram</a>
          <span class="text-gray-300">•</span>
          <a href="#" class="hover:text-gray-900">LinkedIn</a>
          <span class="text-gray-300">•</span>
          <a href="#" class="hover:text-gray-900">Twitter/X</a>
        </div>
      </div>
    </div>
  </div>

  <!-- CALENDAR MODAL -->
  {#if open}
    <!-- svelte-ignore a11y_interactive_supports_focus -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      class="absolute inset-0 z-[100] bg-white/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      on:click={backdropClose}
    >
    <button class="absolute top-0 right-0 bg-neutral-900 px-4 py-2 rounded-bl-2xl text-white" on:click={closeModal}>
      Close
    </button>
    <iframe src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ397Z41W23PqTONRXOh9M0daImk-unGhYlQqM37Cqj0Gc2pJQA398agJAhf8SWWWo_8fX1GaLKH?gv=true" style="border: 0" width="100%" height="600" frameborder="0"></iframe>
    </div>
  {/if}
</section>

<svelte:window on:keydown={(e) => e.key === 'Escape' && open && closeModal()} />