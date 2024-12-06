<script>
	import { getContext } from 'svelte';

	let { on_layer_edit, on_layer_cut } = $props();

	const layer = getContext('layer')();

	layer.on('pm:edit', (e) => {
		on_layer_edit(e);
	});
	layer.on('pm:cut', (e) => {
		on_layer_cut(e);
	});
</script>
