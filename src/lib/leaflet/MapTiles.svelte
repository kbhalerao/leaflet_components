<script>
	import EsriTile from './ESRITile.svelte';
	import GoogleTile from './GoogleTile.svelte';
	import MapBoxTileLayer from './MapBoxTileLayer.svelte';
	import NaipTile from './NAIPTile.svelte';
	import OsmTileLayer from './OSMTileLayer.svelte';
	import UsgsTile from './USGSTile.svelte';

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
		<svelte:component this={TileComponents[tile]} {defaultTile} />
	{/if}
{/each}
