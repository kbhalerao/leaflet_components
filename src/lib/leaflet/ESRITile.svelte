<script>
	import { browser } from '$app/environment';
	import { getContext, onMount } from 'svelte';
	import { tileLayers } from './stores.js';

	export let defaultTile = false;

	const tile_data = {
		name: 'ESRI',
		representation: 'ESRI WorldImagery',
		value: {
			uri: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
			options: {
				attribution:
					'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
				maxZoom: 19,
				pmIgnore: true
			}
		}
	};
	const map = getContext('map')();
	const layerControl = getContext('layerControl')();

	const addTileLayer = async () => {
		if (browser) {
			L = await import('leaflet');
		}
		let esriTile = L.tileLayer(tile_data.value.uri, tile_data.value.options);
		layerControl?.addBaseLayer(esriTile, 'ESRI');
		if (defaultTile) {
			esriTile.addTo(map);
		}
		tileLayers.update((value) => {
			return {
				...value,
				['ESRI']: esriTile
			};
		});
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
