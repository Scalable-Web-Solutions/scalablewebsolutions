<script>
    let activeTab = 'All Articles';
  
    const categories = [
      'All Articles',
      'Growth Strategy',
      'A/B Testing',
      'Case Studies',
      'UX Optimization',
      'Analytics'
    ];
  
    const articles = [
      {
        id: 1,
        title: 'The Scientific Approach to Scaling E-commerce',
        excerpt: 'Why discipline and data-driven experimentation beat guesswork every time when it comes to sustainable growth.',
        category: 'Growth Strategy',
        readTime: '6 min read',
        date: 'Sep 25, 2025',
        icon: '🚀',
        gradient: 'from-purple-200 to-purple-300'
      },
      {
        id: 2,
        title: '10 A/B Tests That Actually Move the Needle',
        excerpt: 'Not all tests are created equal. Learn which experiments consistently drive revenue growth for Shopify brands.',
        category: 'A/B Testing',
        readTime: '7 min read',
        date: 'Sep 22, 2025',
        icon: '🎯',
        gradient: 'from-pink-200 to-pink-300'
      },
      {
        id: 3,
        title: 'Cart Abandonment: The $18B Problem Solved',
        excerpt: 'How we reduced cart abandonment by 34% using behavioral psychology and micro-interactions.',
        category: 'UX Optimization',
        readTime: '5 min read',
        date: 'Sep 19, 2025',
        icon: '💡',
        gradient: 'from-blue-200 to-blue-300'
      },
      {
        id: 4,
        title: 'From 2% to 5.8%: A Conversion Rate Case Study',
        excerpt: 'The complete breakdown of how we nearly tripled conversion rate for a 7-figure beauty brand in 6 months.',
        category: 'Case Studies',
        readTime: '12 min read',
        date: 'Sep 15, 2025',
        icon: '📈',
        gradient: 'from-purple-200 to-purple-300'
      },
      {
        id: 5,
        title: 'The Metrics That Actually Matter for Growth',
        excerpt: 'Stop tracking vanity metrics. Here are the 7 KPIs that predict sustainable revenue growth.',
        category: 'Analytics',
        readTime: '8 min read',
        date: 'Sep 12, 2025',
        icon: '⚡',
        gradient: 'from-pink-200 to-pink-300'
      },
      {
        id: 6,
        title: 'Why Most E-commerce A/B Tests Fail',
        excerpt: 'Learn the common pitfalls that invalidate test results and how to build a proper experimentation framework.',
        category: 'Growth Strategy',
        readTime: '9 min read',
        date: 'Sep 8, 2025',
        icon: '🔬',
        gradient: 'from-blue-200 to-blue-300'
      }
    ];
  </script>
  
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
  
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 mt-14 text-center">
      <h1 class="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#d755ff]  to-[#170232] text-transparent bg-clip-text">
        Articles & Insights
      </h1>
      <p class="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
        Expert strategies, case studies, and actionable insights to help you scale your Shopify store with confidence.
      </p>
  
      <!-- Filter Tabs -->
      <div class="flex flex-wrap justify-center gap-3 ">
        {#each categories as category}
          <button
            on:click={() => activeTab = category}
            class="px-6 py-3 rounded-full font-semibold transition-all duration-300 {activeTab === category
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
              : 'bg-white text-slate-600 hover:border-purple-600 hover:text-purple-600 border-2 border-transparent'}"
          >
            {category}
          </button>
        {/each}
      </div>
    </section>
  
    <!-- Featured Article -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
      <article class="bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div class="bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-8xl min-h-[400px]">
          📊
        </div>
        <div class="p-8 md:p-10 flex flex-col justify-center">
          <span class="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold mb-4 w-fit">
            FEATURED
          </span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            How We Increased Conversion Rate by 47% in 90 Days
          </h2>
          <p class="text-lg text-slate-600 mb-6">
            A deep dive into our proven methodology for transforming high-intent traffic into lifetime customers through systematic A/B testing and UX optimization.
          </p>
          <div class="flex items-center gap-4 text-sm text-slate-400 mb-6">
            <span>8 min read</span>
            <span>•</span>
            <span>Sep 28, 2025</span>
          </div>
          <a
            href={`/articles/featured`}
            class="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-semibold hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 hover:translate-x-1 w-fit"
          >
            Read Article →
          </a>
        </div>
      </article>
    </section>
  
    <!-- Articles Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each articles as article (article.id)}
          <article on:click={() => window.location.href = `/articles/${article.id}`} class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
            <div class="h-56 bg-gradient-to-br {article.gradient} flex items-center justify-center text-6xl">
              {article.icon}
            </div>
            <div class="p-6">
              <span class="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold mb-3">
                {article.category}
              </span>
              <h3 class="text-xl font-bold text-slate-900 mb-3">
                {article.title}
              </h3>
              <p class="text-slate-600 mb-4 text-sm">
                {article.excerpt}
              </p>
              <div class="flex items-center gap-3 text-xs text-slate-400">
                <span>{article.readTime}</span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
            </div>
          </article>
        {/each}
      </div>
    </section>
  </div>