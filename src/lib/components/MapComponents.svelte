<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let Leaflet;
	// export let GeoJSON;

	onMount(async () => {
		if (browser) {
			const components = await import('@agsci/leaflet-components');
			Leaflet = components.Leaflet;
			// GeoJSON = components.GeoJSON;
		}
	});
</script>
