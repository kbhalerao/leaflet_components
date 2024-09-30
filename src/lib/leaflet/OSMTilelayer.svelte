<script>
	import { getContext } from 'svelte';
	import { tileLayers } from './stores.js';
	export let defaultTile = true;

	const tile_data = {
		name: 'osm',
		representation: 'OSM',
		value: {
			uri: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			options: {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
				pmIgnore: true
			}
		}
	};
	const map = getContext('map')();
	const layerControl = getContext('layerControl')();
	const addTileLayer = async () => {
		let L = await import('leaflet');
		let osmTile = L.tileLayer(tile_data.value.uri, tile_data.value.options).addTo(map);
		layerControl?.addBaseLayer(osmTile, 'osm');
		if (defaultTile) {
			osmTile.addTo(map);
		}
		tileLayers.update((value) => {
			return {
				...value,
				['osm']: osmTile
			};
		});
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
