<script>
	import Leaflet from '$lib/leaflet/Leaflet.svelte';
	import GeoJson from '$lib/leaflet/GeoJSON.svelte';
	import { onMount } from 'svelte';
	import Popup from '$lib/leaflet/Popup.svelte';
	import ToolTip from '$lib/leaflet/ToolTip.svelte';
	import MapBoxTileLayer from '$lib/leaflet/MapBoxTileLayer.svelte';
	import ToolTipData from '$lib/components/ToolTipData.svelte';
	let map;
	let usstates = {
		features: []
	};

	function stateClick(e) {
		map.fitBounds(e.detail.layer.getBounds());
		selectedState = e.detail.layer.feature.properties.NAME;
	}

	let selectedState;

	let counties;

	async function getCounties(state) {
		if (state) {
			counties = await fetch(`/geojsons/${state}.json`).then((r) => r.json());
		} else {
			counties = {
				features: []
			};
		}
	}

	$: getCounties(selectedState);

	onMount(async () => {
		usstates = await fetch('/geojsons/gz_2010_us_040_00_500k.json?url').then((r) => r.json());
	});
</script>

<div class="conus">
	<Leaflet bind:map height={'600px'}>
		<!-- Add mapbox api key in mapboxapikey  -->
		<MapBoxTileLayer mapboxapikey="">
			{#each usstates?.features as feature}
				<GeoJson
					geojson={feature}
					fitBounds={false}
					fillOpacity={parseInt(feature.properties.STATE) / 100}
					on:click={stateClick}
				>
					<ToolTip sticky={true}>
						<ToolTipData />
					</ToolTip>
				</GeoJson>
			{/each}
			{#each counties?.features as county (county.properties.FIPS)}
				<GeoJson
					geojson={county}
					fitBounds={false}
					fillColor={'red'}
					fillOpacity={parseInt(county.properties.CNTY_FIPS) / 200}
					color={'red'}
					weight="1"
				>
					<ToolTip sticky={true}>
						<ToolTipData />
					</ToolTip>
				</GeoJson>
			{/each}
		</MapBoxTileLayer>
	</Leaflet>
</div>
