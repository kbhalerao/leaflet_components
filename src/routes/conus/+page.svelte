<script>
	import Leaflet from '$lib/leaflet/Leaflet.svelte';
	import GeoJson from '$lib/leaflet/GeoJSON.svelte';
	import { onMount } from 'svelte';
	import Popup from '$lib/leaflet/Popup.svelte';
	import ToolTip from '$lib/leaflet/ToolTip.svelte';
	import OSMTilelayer from '$lib/leaflet/OSMTilelayer.svelte';
	import ToolTipData from '$lib/components/ToolTipData.svelte';
	import Control from '$lib/leaflet/Control.svelte';
	import MapBoxTileLayer from '$lib/leaflet/MapBoxTileLayer.svelte';
	import FeatureGroup from '$lib/leaflet/FeatureGroup.svelte';
	import PopupData from '$lib/leaflet/PopupData.svelte';
	import ListenEdits from '$lib/leaflet/ListenLayerEdits.svelte';
	import { difference, featureCollection } from '@turf/turf';
	import Geoman from '$lib/leaflet/Geoman.svelte';
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

	let defaultFeatureGroup;
	let nationalFeatureGroup;
	let stateFeatureGroup;
	let addToFeatureGroup = true;
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

	function on_layer_edit(e) {
		const { layer, type, ...rest } = e.detail;
		// This way we can edit the properties of the layer we edited
		layer.feature.properties = { ...layer.feature.properties, text: 'Hello' };
		if (layer) {
			console.log('The layer', layer?.toGeoJSON(), type);
		}
	}

	function on_layer_cut(e) {
		const { layer, originalLayer, type, ...rest } = e.detail;

		// This line is to retain the properties of the original layer
		layer.feature.properties = { ...originalLayer.feature.properties };
		let newLayer = layer?.toGeoJSON();
		console.log('The new cut layer', newLayer);
		let original_layer = originalLayer?.toGeoJSON();
		let cut_part = difference(featureCollection([originalLayer?.toGeoJSON(), layer?.toGeoJSON()]));
	}

	function on_save() {
		console.log('The national features', nationalFeatureGroup.toGeoJSON());
		console.log('The state features', stateFeatureGroup.toGeoJSON());
	}
</script>

<div class="conus">
	<Leaflet bind:map height={'600px'}>
		<Geoman />
		<FeatureGroup bind:featureGroup={nationalFeatureGroup}>
			<OSMTilelayer />
			<MapBoxTileLayer mapboxapikey="" />
			{#each usstates?.features?.slice(0, 20) as feature}
				<GeoJson
					geojson={feature}
					fitBounds={false}
					fillOpacity={parseInt(feature.properties.STATE) / 100}
					on:click={() => {}}
					{addToFeatureGroup}
					fitFeatureGroup={false}
				>
					<!-- <ToolTip sticky={true}>
					<ToolTipData />
				</ToolTip> -->
					<ListenEdits on:pm:edit={on_layer_edit} on:pm:cut={on_layer_cut} />
					<!-- <Popup>
						<PopupData />
					</Popup> -->
				</GeoJson>
			{/each}
		</FeatureGroup>
		<FeatureGroup bind:featureGroup={stateFeatureGroup}>
			{#each counties?.features as county (county.properties.FIPS)}
				<GeoJson
					geojson={county}
					fitBounds={false}
					fillColor={'red'}
					fillOpacity={parseInt(county.properties.CNTY_FIPS) / 200}
					color={'red'}
					weight="1"
					{addToFeatureGroup}
				>
					<ToolTip sticky={true}>
						<ToolTipData />
					</ToolTip>
				</GeoJson>
			{/each}
		</FeatureGroup>
		<Control position="topright">
			<button class="btn btn-sm btn-primary" type="button" on:click={on_save}>save</button>
		</Control>
	</Leaflet>
</div>
