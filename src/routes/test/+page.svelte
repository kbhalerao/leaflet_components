<script>
	import MapComponents from '$lib/components/MapComponents.svelte';
	let Leaflet;
	let map;
</script>

<MapComponents bind:Leaflet />
<span>Hello</span>
<svelte:component this={Leaflet} bind:map height="600px" />
