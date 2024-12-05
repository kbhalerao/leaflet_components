<script>
	import flush from 'just-flush';
	import { getContext, setContext, onDestroy } from 'svelte';
	import { getFeatureGroupsBounds } from './helpers.js';

	let {
		geojson,
		color,
		pane = $bindable(undefined),
		fillColor = 'blue',
		fillOpacity = 0.6,
		weight = 2,
		fitBounds = true,
		addToFeatureGroup = false,
		fitFeatureGroup = false,
		featureGroups = [],
		addFillPattern = false,
		addStrokePattern = false,
		patternUrl = 'url(#angledCrossLines)',
		strokePatternUrl = 'url(#stroke)',
		showIcon = false,
		customIcon,
		layer,
		onClickLayer,
		onMouseOver,
		onMouseOut,
		content
	} = $props();
	const container = getContext('layerGroup')();
	const featureGroup = getContext('featureGroup')();

	const addLayerTo = addToFeatureGroup && featureGroup ? featureGroup : container;

	let layerPane = pane || getContext('pane');

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
		.on('mouseover', (e) => {
			onMouseOver(e);
		})
		.on('mouseout', (e) => {
			onMouseOut(e);
		})
		.on('click', (e) => {
			// console.log("clicked",e)
			onClickLayer(e);
		})
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

<!-- SVG pattern definition with id -->
<svg style="height: 0; width: 0; position: absolute;">
	<defs>
		<pattern id="angledCrossLines" patternUnits="userSpaceOnUse" width="20" height="20">
			<path d="M0,20 L20,0" stroke="red" stroke-width="2" />
			<path d="M0,0 L20,20" stroke="yellow" stroke-width="2" />
		</pattern>
	</defs>
</svg>
