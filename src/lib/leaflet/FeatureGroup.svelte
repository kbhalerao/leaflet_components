<script>
	import { getContext, onMount, setContext } from 'svelte';

	const container = getContext('layerGroup')();
	let { contextName = 'featureGroup', featureGroup = $bindable() } = $props();

	onMount(() => {
		featureGroup = L.featureGroup().addTo(container);
	});
	featureGroup = L.featureGroup().addTo(container);
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
