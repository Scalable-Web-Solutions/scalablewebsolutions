<div class="relative min-h-screen w-full">
  <div class="pointer-events-none fixed inset-0 -z-10">
  <div class="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-[#EBEEFA]"></div>
  <div class="absolute z-[1] right-[-140px] top-1/3 w-[620px] h-[620px] bg-indigo-300/30 blur-[120px] rounded-full"></div>
    <div class="absolute z-[1] left-[-160px] bottom-[12%] w-[520px] h-[520px] bg-fuchsia-300/30 blur-[120px] rounded-full"></div>
    <div class="absolute z-[1] right-[15%] top-[-120px] w-[420px] h-[420px] bg-purple-300/25 blur-[110px] rounded-full"></div>
  </div>

  <section class="relative z-20 w-full min-h-screen flex items-center">
  <div class="mx-auto w-full max-w-md px-4">  <!-- use max-w instead of container -->
    <h1 class="mb-6 text-4xl font-bold text-center text-[#1D2939]">Client Portal</h1>

    <!-- form box with visible padding -->
    <form class="w-full rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-[#1D2939]">Email</label>
        <input
          type="email" id="email" name="email"
          class="mt-1 w-full rounded-md border border-[#D1D5DB] p-2"
          required
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-[#1D2939]">Password</label>
        <input
          type="password" id="password" name="password"
          class="mt-1 w-full rounded-md border border-[#D1D5DB] p-2"
          required
        />
      </div>

      <div class="flex items-center justify-between gap-3">
        <button type="submit" class="rounded-full bg-indigo-600 px-5 py-3 text-white border-none outline-none">Login</button>
        <a href="/portal/register" class="text-sm text-[#1D2939]">Register</a>
      </div>
    </form>
  </div>
</section>


</div>