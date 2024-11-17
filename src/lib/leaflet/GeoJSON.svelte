<script>
	import flush from 'just-flush';
	import { getContext, setContext, onDestroy, createEventDispatcher } from 'svelte';
	import { getFeatureGroupsBounds } from './helpers.js';

	const dispatch = createEventDispatcher();

	export let geojson;
	export let color = 'blue';
	export let pane = undefined;
	export let fillColor = 'blue';
	export let fillOpacity = 0.6;
	export let weight = 2;
	export let fitBounds = true;
	export let addToFeatureGroup = false;
	export let fitFeatureGroup = false;
	export let featureGroups = [];
	export let addFillPattern = false;
	export let addStrokePattern = false;
	export let patternUrl = 'url(#angledCrossLines)';
	export let strokePatternUrl = 'url(#stroke)';
	export let showIcon = false;
	export let customIcon;
	const container = getContext('layerGroup')();
	const featureGroup = getContext('featureGroup')();

	const addLayerTo = addToFeatureGroup && featureGroup ? featureGroup : container;

	let layerPane = pane || getContext('pane');
	// @ts-ignore
	export let layer;

	const pointToLayer = (/** @type {any} */ feature, /** @type {any} */ latlng) => {
		if (showIcon) {
			if (customIcon) {
				return L.marker(latlng, { icon: customIcon });
			} else {
				console.log('Inside PointToLayer', latlng);
				return L.marker(latlng);
			}
		}
	};

	layer = L.geoJSON(geojson, flush({ pane: layerPane, pointToLayer: pointToLayer }))
		.on('mouseover', (/** @type {any} */ e) => dispatch('mouseover', e))
		.on('mouseout', (/** @type {any} */ e) => dispatch('mouseout', e))
		.on('click', (/** @type {any} */ e) => dispatch('click', e))
		.addTo(addLayerTo);

	let bounds;
	bounds = fitFeatureGroup ? featureGroup?.getBounds() : layer.getBounds();
	if (featureGroups?.length) {
		bounds = getFeatureGroupsBounds(L, featureGroups);
	}

	if (fitBounds && bounds) {
		container.fitBounds(bounds);
	}

	setContext('layer', () => layer);

	onDestroy(() => {
		layer.remove();
	});

	if (addFillPattern) {
		fillColor = patternUrl;
	}
	if (addStrokePattern) {
		color = patternUrl;
	}
	let layerStyle = flush({ color, fillColor, fillOpacity, weight });
	layer.setStyle(layerStyle);
</script>

<slot />

<!-- SVG pattern definition with id -->
<svg style="height: 0; width: 0; position: absolute;">
	<defs>
		<pattern id="angledCrossLines" patternUnits="userSpaceOnUse" width="20" height="20">
			<path d="M0,20 L20,0" stroke="red" stroke-width="2" />
			<path d="M0,0 L20,20" stroke="yellow" stroke-width="2" />
		</pattern>
	</defs>
</svg>
