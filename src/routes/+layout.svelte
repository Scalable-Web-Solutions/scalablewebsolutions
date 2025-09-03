<script lang="ts" module>
  declare global {
    interface Window {
      analytics?: {
        VERSION?: string;
        getAnonUserId?: () => string;        // <-- return string
        init: (config?: any) => void;
        trackPageview?: () => void;
        trackEvent?: (type: string, fields?: object) => void;
        setExperimentContext?: (experiments: Record<string, string>, anonId?: string) => void;
      };
      firebase: any;
    }
  }
</script>

<script lang="ts">
  import '../app.css';
  import favicon from '$lib/assets/favicon.ico';
  import Navbar from './Sections/Navbar.svelte';
  import logo from '$lib/assets/scalablewebsolutions.png';
  import { onMount, setContext } from 'svelte';

  const { data, children } = $props<{ 
    data: { experiments?: Record<string, string>; anonId?: string }; 
    children?: any 
  }>();


  onMount(async () => {
    try {
      window.analytics?.init({ project: 'scalable-web-solutions' });

      const uid = window.analytics?.getAnonUserId?.();
      const assignments = data?.experiments ?? {};
      if (window.analytics?.setExperimentContext && uid && Object.keys(assignments).length) {
        window.analytics.setExperimentContext(assignments, uid);
      }

      // optional: sanity log
      console.log('analytics ready', window.analytics?.VERSION ?? 'no-version');
    } catch (e) {
      console.error('Failed to load analytics.js', e);
    }
  });

  // expose experiments to children if you use them
  setContext('experiments', data?.experiments ?? {});
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="overflow-x-hidden">
  <Navbar {logo} />
  {@render children?.()}
</div>
