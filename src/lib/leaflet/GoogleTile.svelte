<script>
	import { getContext } from 'svelte';
	import { tileLayers } from './stores.js';

	export let defaultTile = false;

	let L;

	const map = getContext('map')();
	const layerControl = getContext('layerControl')();

	const addTileLayer = async () => {
		if (window) {
			L = await import('leaflet');
			await import('leaflet.gridlayer.googlemutant');
			let googleLayer = L.gridLayer.googleMutant({
				type: 'hybrid', // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'

				styles: [{ featureType: 'poi', stylers: [{ visibility: 'off' }] }]
			});
			if (defaultTile) {
				googleLayer.addTo(map);
			}
			tileLayers.update((value) => {
				return {
					...value,
					['google']: googleLayer
				};
			});
			layerControl?.addBaseLayer(googleLayer, 'google');
		}
	};
</script>

<div use:addTileLayer>
	<slot />
</div>
