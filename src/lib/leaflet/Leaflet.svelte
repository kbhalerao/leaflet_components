<script>
	import { setContext } from 'svelte';
	import { Spinner } from 'spin.js';
	import Geolocation from 'svelte-geolocation';
	import { add_basetilelayers } from './basetileset_helpers.js';

	export let height = '300px';
	// Must set either bounds, or view and zoom.
	/**
	 * @type {undefined}
	 */
	export let bounds = undefined;
	export let view = [39.8283, -98.5795];
	export let zoom = 4;
	export let mapbusy = false;
	export let geolocate = false;
	export let zoomToLocation = false;
	export let showTileLayerControl = true;

	let mapProp = undefined;
	export { mapProp as map };

	export const invalidateSize = () => map?.invalidateSize();

	/**
	 * @type {{ invalidateSize: any; fitBounds: any; setView: any; remove: any; } | undefined}
	 */
	let map;
	let layerControl;
	$: mapProp = map;

	/**
	 * @type {Spinner}
	 */
	let spinner;
	/**
	 * @type {any}
	 */
	let coords;

	export const getMap = () => map;

	export const getLayerControl = () => layerControl;

	setContext('layerGroup', getMap);
	setContext('layer', getMap);
	setContext('map', getMap);
	setContext('layerControl', getLayerControl);

	/**
	 * @param {{ detail: { coords: any; }; }} loc
	 */
	function updateLocation(loc) {
		coords = loc.detail.coords;
	}

	/**
	 * @param {any} err
	 */
	function errorLocation(err) {
		console.warn(err);
	}
	/**
	 * @param {HTMLDivElement} node
	 */
	async function createLeaflet(node) {
		let L = await import('leaflet');
		map = L.map(node, {
			attributionControl: false
		});
		if (bounds) {
			map.fitBounds(bounds);
		} else {
			map.setView(view, zoom);
		}
		// add_basetilelayers({ osm: null }, map);
		if (showTileLayerControl) {
			layerControl = L.control.layers().addTo(map);
		}

		// layerControl.remove(map);

		spinner = new Spinner().spin(node);
		return {
			destroy() {
				map.remove();
				map = undefined;
			}
		};
	}

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else {
			map.setView(view, zoom);
		}
	}

	$: if (map && spinner) {
		if (mapbusy) {
			spinner.spin();
		} else {
			spinner.stop();
		}
	}

	$: (async (m, loc) => {
		if (m && geolocate && loc) {
			let { showLocation } = await import('./utils');
			showLocation(coords, m, zoom);
			if (zoomToLocation) {
				m.flyTo([coords.latitude, coords.longitude]);
			}
		}
	})(map, coords);
</script>

<div style="height: {height};" use:createLeaflet>
	{#if map}
		<slot {map} />
	{/if}
	{#if geolocate}
		<Geolocation
			watch={true}
			getPosition={true}
			on:position={updateLocation}
			on:error={errorLocation}
		/>
	{/if}
</div>

<style>
	@import 'leaflet/dist/leaflet.css';
	@import 'spin.js/spin.css';
	:global(.leaflet-control-container) {
		position: static;
	}

	:global(.pulse) {
		display: block;
		border-radius: 100%;
		cursor: pointer;
		animation: pulse 2s infinite;
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 0 0;
		}
		70% {
			box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
		}
	}
</style>
