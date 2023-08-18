<script>
	import { getContext } from 'svelte';

	export let mapboxapikey = '';

	const tile_data = {
		name: 'mapbox',
		representation: 'MapBox',
		value: {
			uri: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${mapboxapikey}`,
			options: {
				attribution: 'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/satellite-streets-v9', // replace with your preferred Mapbox style ID
				tileSize: 512,
				zoomOffset: -1,
				accessToken: mapboxapikey,
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
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
