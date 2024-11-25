<script>
	import { getContext } from 'svelte';

	import { browser } from '$app/environment';
	import { tileLayers } from './stores.js';
	export let defaultTile = false;

	const tile_data = {
		name: 'USGS',
		representation: 'USGS Imagery',
		value: {
			uri: 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}?blankTile=false',
			options: {
				attribution: 'USGS National Map',
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
		let usgsTile = L.tileLayer(tile_data.value.uri, tile_data.value.options);
		if (defaultTile) {
			usgsTile.addTo(map);
		}
		layerControl?.addBaseLayer(usgsTile, 'USGS');
		tileLayers.update((value) => {
			return {
				...value,
				['USGS']: usgsTile
			};
		});
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
