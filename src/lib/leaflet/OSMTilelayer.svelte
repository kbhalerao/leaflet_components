<script>
	import { getContext } from 'svelte';
	import { map_tiles } from './base_tilesets.js';

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
	const addTileLayer = async () => {
		let L = await import('leaflet');
		L.tileLayer(tile_data.value.uri, tile_data.value.options).addTo(map);
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
