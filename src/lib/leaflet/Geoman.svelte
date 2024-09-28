<script>
	import { browser } from '$app/environment';
	import { difference, featureCollection } from '@turf/turf';
	import { getContext, onMount } from 'svelte';

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
	onMount(async () => {
		if (browser && container) {
			const { setUpMapForEditEvents, add_map_boundary_draw_controls } = await import('./utils.js');
			add_map_boundary_draw_controls(container, geomanControls, 'topright');
			setUpMapForEditEvents(featureGroup, container);

			featureGroup.on('layerremove layeradd pm:cut pm:edit pm:move pm:remove', (e) => {
				const { layer, shape, source, type, ...rest } = e;

				switch (type) {
					case 'pm:remove':
						if (featureGroup?.hasLayer(layer)) {
							featureGroup.removeLayer(layer);
							console.log('The updated feature group', featureGroup?.toGeoJSON());
						}
						break;
					case 'pm:cut':
						const { originalLayer } = rest;
						if (originalLayer) {
							if (featureGroup?.hasLayer(originalLayer)) {
								let differenceLayer = difference(
									featureCollection([originalLayer?.toGeoJSON(), layer?.toGeoJSON()])
								);
								// Remove the original layer
								featureGroup.removeLayer(originalLayer);
								// Add newly cut layer
								layer.feature.properties = {};
								featureGroup.addLayer(layer);
								console.log('The difference', differenceLayer);
							}
						}
				}
				console.log('The feature group', featureGroup?.toGeoJSON());
			});
		}
	});
</script>
