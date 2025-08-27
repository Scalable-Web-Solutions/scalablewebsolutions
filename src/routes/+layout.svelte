<script lang="ts" module>
	declare global {
		interface Window {
			analytics: {
				init: (config?: any) => void;
				trackPageview?: () => void;
				trackEvent?: (type: string, fields?: object) => void;
				setExperimentContext?: (experiments: Record<string, string>, anonId: string) => void;
			};
			firebase: any;
		}
	}
</script>

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
    import Navbar from './Sections/Navbar.svelte';
	import logo from '$lib/assets/scalablewebsolutions.png'
    import { onMount, setContext } from 'svelte';
	const { data, children } = $props<{
    	data: { experiments: Record<string, string>; anonId?: string };
    	children?: any; // type depends on your usage
  	}>();

	onMount(() => {
		function initTracking()
		{
			if(window.analytics){
				window.analytics.init({project: 'scalable-web-solutions'});
				if(data.experiments){
					window.analytics.setExperimentContext?.(data.experiments, data.anonId);
				}
			}
			else{
				console.log('Analytics not initialized');
			}
		}
		initTracking();
		
	})

	setContext('experiments', data.experiments);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="overflow-x-hidden">
	<Navbar logo={logo} />
	{@render children?.()}
</div>