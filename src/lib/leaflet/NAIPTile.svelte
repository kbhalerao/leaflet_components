<script>
	import { getContext, onMount } from 'svelte';

	import { browser } from '$app/environment';
	import { tileLayers } from './stores.js';
	export let defaultTile = false;

	const tile_data = {
		name: 'NAIP',
		representation: 'NAIP',
		value: {
			uri: 'https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/USDA_CONUS_PRIME/ImageServer/tile/{z}/{y}/{x}?blankTile=false',
			options: {
				attribution: 'The National Agricultural Imagery Program',
				maxZoom: 18,
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
		let naipTile = L.tileLayer(tile_data.value.uri, tile_data.value.options);
		if (defaultTile) {
			naipTile.addTo(map);
		}
		layerControl?.addBaseLayer(naipTile, 'NAIP');
		tileLayers.update((value) => {
			return {
				...value,
				['NAIP']: naipTile
			};
		});
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
