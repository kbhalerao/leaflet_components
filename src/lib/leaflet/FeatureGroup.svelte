<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { browser } from '$app/environment';

	export let contextName = 'featureGroup';

	const geomanControls = {
		drawMarker: false,
		drawPolyline: false,
		drawCircle: true,
		dragMode: true,
		drawPolygon: true,
		cutPolygon: true,
		removalMode: true,
		rotateMode: false,
		pickPolygons: true,
		editMode: true
	};

	const container = getContext('layerGroup')();
	export let featureGroup = L.featureGroup().addTo(container);
	export const get_feature_group = () => featureGroup;
	setContext(contextName, get_feature_group);

	onMount(async () => {
		if (browser && container) {
			const { setUpMapForEditEvents, add_map_boundary_draw_controls } = await import('./utils.js');
			add_map_boundary_draw_controls(container, geomanControls, 'topright');
			setUpMapForEditEvents(featureGroup, container);
		}
	});
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
