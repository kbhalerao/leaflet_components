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

	let nationalFeatureGroup;
	let stateFeatureGroup;
	let addToFeatureGroup=true;
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

	 function on_layer_edit(e){
		// let layer = e.detail;
		const {layer,type,...rest} = e.detail;
		if(layer){
			console.log("The layer",layer?.toGeoJSON(),type)
		}
		
	}

	
</script>

<div class="conus">
	<Leaflet bind:map height={'600px'}>
		<FeatureGroup bind:featureGroup={nationalFeatureGroup}>
		<OSMTilelayer />
		<MapBoxTileLayer mapboxapikey="" />
		{#each usstates?.features as feature}
			<GeoJson
				geojson={feature}
				fitBounds={false}
				fillOpacity={parseInt(feature.properties.STATE) / 100}
				on:click={()=>{}}
				addToFeatureGroup={addToFeatureGroup}
			>
				<!-- <ToolTip sticky={true}>
					<ToolTipData />
				</ToolTip> -->
				<ListenEdits on:pm:edit={on_layer_edit}></ListenEdits>
				<Popup>
					<PopupData >

					</PopupData>
				</Popup>
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
				addToFeatureGroup={addToFeatureGroup}
				
			>
				<ToolTip sticky={true}>
					<ToolTipData />
				</ToolTip>
			</GeoJson>
		{/each}
	</FeatureGroup>
	<Control position="topright">
		<button class="btn btn-sm btn-primary" type="button">save</button>
	</Control>
	</Leaflet>
</div>
