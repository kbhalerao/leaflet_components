<script>
	import { createEventDispatcher, getContext, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	let popup = getContext('popup')();
	const layer = getContext('layer')();

	onMount(() => {
		popup?.update();
	});

	let layerEditEnabled = false;

	let enabledEdit = {
		draggable: true,
		allowCutting: true,
		allowRemoval: true,
		allowRotation: true,
		allowEditing: true
	};

	let disableEdit = {
		draggable: false,
		allowCutting: false,
		allowRemoval: false,
		allowRotation: false,
		allowEditing: false
	};
	const enableEdit = () => {
		layerEditEnabled = layer.pm.enabled();
		if (layerEditEnabled) {
			layer.pm.enable(disableEdit);
		} else {
			layer.pm.enable(enabledEdit);
		}
		popup.close();
	};
</script>

<div class="popup">
	<button class="btn btn-primary btn-sm" on:click={enableEdit}>Edit</button>
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
