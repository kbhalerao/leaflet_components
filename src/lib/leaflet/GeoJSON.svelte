<script>
	import flush from 'just-flush';
	import { getContext, setContext, onDestroy, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let geojson;
	export let color = 'blue';
	export let pane = undefined;
	export let fillColor = 'blue';
	export let fillOpacity = 0.6;
	export let weight = 2;
	export let fitBounds = true;

	const container = getContext('layerGroup')();
	let layerPane = pane || getContext('pane');
	// @ts-ignore
	export let layer;

	layer = L.geoJSON(geojson, flush({ pane: layerPane }))
		.on('mouseover', (/** @type {any} */ e) => dispatch('mouseover', e))
		.on('mouseout', (/** @type {any} */ e) => dispatch('mouseout', e))
		.on('click', (/** @type {any} */ e) => dispatch('click', e))
		.addTo(container);

	let layerBounds;
	layerBounds = layer.getBounds();

	if (fitBounds && layerBounds) {
		container.fitBounds(layerBounds);
	}

	setContext('layer', () => layer);

	onDestroy(() => {
		layer.remove();
	});

	let layerStyle = flush({ color, fillColor, fillOpacity, weight });
	layer.setStyle(layerStyle);
</script>

<slot />
