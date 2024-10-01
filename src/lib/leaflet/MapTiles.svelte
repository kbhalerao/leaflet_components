<script>
	import EsriTile from './ESRITile.svelte';
	import GoogleTile from './GoogleTile.svelte';
	import MapBoxTileLayer from './MapBoxTileLayer.svelte';
	import NaipTile from './NAIPTile.svelte';
	import OsmTileLayer from './OSMTileLayer.svelte';
	import UsgsTile from './USGSTile.svelte';

	export let PUBLIC_MAPBOX_API_KEY = '';

	export let mapTileList = {
		google: false,
		mapbox: false,
		osm: true,
		esri: false,
		naip: false,
		usgs: false
	};
	export let defaultTile = 'osm';

	const TileComponents = {
		google: GoogleTile,
		mapbox: MapBoxTileLayer,
		osm: OsmTileLayer,
		esri: EsriTile,
		naip: NaipTile,
		usgs: UsgsTile
	};
</script>

{#each Object.keys(mapTileList) as tile}
	{#if mapTileList[tile]}
		{@const defaultTile = defaultTile == tile ? true : false}
		{@const mapbox_api_key = PUBLIC_MAPBOX_API_KEY ? PUBLIC_MAPBOX_API_KEY : ''}
		<svelte:component this={TileComponents[tile]} {defaultTile} {mapbox_api_key} />
	{/if}
{/each}
