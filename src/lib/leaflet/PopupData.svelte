<script>
	import { getContext, onMount } from 'svelte';

	export let field;
	let popup = getContext('popup')();

	onMount(() => {
		popup?.update();
	});
</script>

<div class="popup">
	<strong>{field.name}</strong> <a href="/field/{field.id}">View</a><br />
	<i>{field.originator}</i>
</div>

<style>
	:global(.leaflet-popup-content) {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		margin: 5px 5px 5px 5px;
	}

	.popup {
		flex-grow: 1;
	}
</style>
