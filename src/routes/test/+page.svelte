<script>
	import { Leaflet, OSMTilelayer } from '@agsci/leaflet-components';

	let map;
</script>

<Leaflet bind:map height="600px">
	<OSMTilelayer />
</Leaflet>

<style lang="vite_preprocess_ignore">
	@import 'leaflet/dist/leaflet.css';
	@import 'spin.js/spin.css';
</style>
