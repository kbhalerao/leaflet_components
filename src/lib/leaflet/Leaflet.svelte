<script lang="ts">
	import { setContext } from 'svelte';
	import { Spinner } from 'spin.js';
	import Geolocation from 'svelte-geolocation';


	

	

	// Destructuring props with defaults
	let {
		height = '300px',
		bounds = undefined,
		view = [39.8283, -98.5795],
		zoom = 4,
		mapbusy = false,
		geolocate = false,
		zoomToLocation = false,
		scrollWheelZoom=true,
		dragging=true,
		zoomControl=true,
		addScale=true,
		scalePosition = 'bottomright',
		zoomControlPosition='',
		backgroundWhite=false,
		showTileLayerControl = true,
		fullscreenControl=true,
		fullScreenPluginPosition='topright',
		useGeoman = true,
		map = $bindable(),
		children,
	}: {
		height: string;
		bounds: any;
		view: number[];
		zoom: number;
		mapbusy: boolean;
		geolocate: boolean;
		zoomToLocation: boolean;
		scrollWheelZoom:boolean;
		dragging: boolean;
		zoomControl: boolean;
		addScale: boolean;
		scalePosition: string;
		zoomControlPosition: string;
		showTileLayerControl: boolean;
		backgroundWhite:boolean;
		fullscreenControl:boolean,
		fullScreenPluginPosition:string;
		useGeoman: boolean;
		map: any;
		children:any;
	} = $props();

	export const invalidateSize = () => map?.invalidateSize();

	let layerControl;

	/**
	 * @type {Spinner}
	 */
	let spinner;
	/**
	 * @type {any}
	 */
	let coords = $state();

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
		if (useGeoman)
		{
			await import('@geoman-io/leaflet-geoman-free');
		}
		await import('leaflet.fullscreen');

		map = L.map(node, {
			zoomSnap: 0.25,
			zoomDelta: 0.25,
			attributionControl: false,
			scrollWheelZoom,
			dragging,
			zoomControl,
			preferCanvas: false,
			fullscreenControl,
			fullscreenControlOptions: {
				position: fullScreenPluginPosition
			}
		});

		if (zoomControlPosition) {
			L.control
				.zoom({
					position: zoomControlPosition
				})
				.addTo(map);
		}

		if (addScale) L.control.scale({ position: scalePosition, imperial: true }).addTo(map);

		if (bounds) {
			map.fitBounds(bounds);
		} else {
			map.setView(view, zoom);
		}
		if (showTileLayerControl) {
			layerControl = L.control.layers().addTo(map);
		}

		spinner = new Spinner().spin(node);
		return {
			destroy() {
				map.remove();
				map = undefined;
			}
		};
	}

	$effect(() => {
		if (map) {
			if (bounds) {
				map.fitBounds(bounds);
			} else {
				map.setView(view, zoom);
			}
		}
	});

	$effect(() => {
		if (map && spinner) {
			if (mapbusy) {
				spinner.spin();
			} else {
				spinner.stop();
			}
		}
	});

	$effect(async () => {
		if (map && geolocate && coords) {
			let { showLocation } = await import('./utils.js');
			showLocation(coords, map, zoom);
			if (zoomToLocation) {
				map.flyTo([coords.latitude, coords.longitude]);
			}
		}
	});
</script>

<svelte:head>

	<link
		rel="stylesheet"
		href="https://unpkg.com/@geoman-io/leaflet-geoman-free@latest/dist/leaflet-geoman.css"
	/>
</svelte:head>

<div style="height: {height};" use:createLeaflet class:background-border={backgroundWhite}>
	{#if map}
		{@render children()}
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
	@import 'leaflet.fullscreen/Control.FullScreen.css';

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

	.background-border {
		background-color: white;
	}
</style>
