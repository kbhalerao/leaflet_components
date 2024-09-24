<script>
	import { getContext, setContext } from 'svelte';

	export let contextName = 'featureGroup';

	const container = getContext('layerGroup')();
	export let featureGroup = L.featureGroup().addTo(container);
	export const get_feature_group = () => featureGroup;
	setContext(contextName, get_feature_group);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css"
	/>
</svelte:head>

<slot />

<style>
</style>
