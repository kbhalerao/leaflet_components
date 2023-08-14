<script>
	import { getContext } from 'svelte';
	import { map_tiles } from './base_tilesets.js';

	export const tile_name = 'osm';
	export const key = '';
	const map = getContext('map')();
	let tile_data = map_tiles.filter((tile) => tile.name == tile_name);
	const addTileLayer = async () => {
		let L = await import('leaflet');
		L.tileLayer(tile_data[0].value.uri, tile_data[0].value.options).addTo(map);
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
