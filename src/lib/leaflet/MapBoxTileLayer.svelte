<script>
	import { getContext } from 'svelte';
	import { tileLayers } from './stores.js';
	import { PUBLIC_MAPBOX_API_KEY } from '$env/static/public';

	export let defaultTile = false;
	export let mapboxStyleID = 'mapbox/satellite-streets-v9';

	const tile_data = {
		name: 'mapbox',
		representation: 'MapBox',
		value: {
			uri: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${PUBLIC_MAPBOX_API_KEY}`,
			options: {
				attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: mapboxStyleID, // replace with your preferred Mapbox style ID
				tileSize: 512,
				zoomOffset: -1,
				accessToken: PUBLIC_MAPBOX_API_KEY,
				pmIgnore: true
			}
		}
	};
	const map = getContext('map')();
	const layerControl = getContext('layerControl')();

	const addTileLayer = async () => {
		let L = await import('leaflet');
		let mapboxTile = L.tileLayer(tile_data.value.uri, tile_data.value.options).addTo(map);
		layerControl?.addBaseLayer(mapboxTile, 'mapbox');
		if (defaultTile) {
			mapboxTile.addTo(map);
		}
		tileLayers.update((value) => {
			return {
				...value,
				['mapbox']: mapboxTile
			};
		});
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
