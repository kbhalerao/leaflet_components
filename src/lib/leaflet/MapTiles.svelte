<script>
	import EsriTile from './ESRITile.svelte';
	import GoogleTile from './GoogleTile.svelte';
	import MapBoxTileLayer from './MapBoxTileLayer.svelte';
	import NaipTile from './NAIPTile.svelte';
	import OsmTileLayer from './OSMTileLayer.svelte';
	import UsgsTile from './USGSTile.svelte';

	let {
		PUBLIC_MAPBOX_API_KEY = '',
		mapTileList = {
			google: false,
			mapbox: false,
			osm: true,
			esri: false,
			naip: false,
			usgs: false
		},
		defaultTile = 'osm'
	} = $props();


	
	const TileComponents = {
		google: google,
		mapbox: mapbox,
		osm: osm,
		esri: esri,
		naip: naip,
		usgs: usgs
	};
</script>

{#snippet google(defaultTile)}
	<GoogleTile {defaultTile}/>
{/snippet}

{#snippet mapbox(defaultTile,mapbox_api_key)}
	<MapBoxTileLayer {defaultTile} {mapbox_api_key}/>
{/snippet}

{#snippet osm(defaultTile)}
	<OsmTileLayer {defaultTile}/>
{/snippet}

{#snippet esri(defaultTile)}
	<EsriTile {defaultTile}/>
{/snippet}
{#snippet naip(defaultTile)}
	<NaipTile {defaultTile}/>
{/snippet}

{#snippet usgs(defaultTile)}
	<UsgsTile {defaultTile}/>
{/snippet}
{#each Object.keys(mapTileList) as tile}
	{#if mapTileList[tile]}
		{@const defaultTileLayer = defaultTile == tile ? true : false}
		{@const mapbox_api_key = PUBLIC_MAPBOX_API_KEY ? PUBLIC_MAPBOX_API_KEY : ''}
		 {@render TileComponents?.[tile](defaultTileLayer,mapbox_api_key)}
	{/if}
{/each}
