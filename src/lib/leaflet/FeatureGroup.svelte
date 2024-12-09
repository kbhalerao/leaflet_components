<script>
	import { getContext, onMount, setContext } from 'svelte';

	const container = getContext('layerGroup')();
	let { contextName = 'featureGroup', featureGroup = $bindable(),children } = $props();

	onMount(() => {
		featureGroup = L.featureGroup().addTo(container);
	});
	featureGroup = L.featureGroup().addTo(container);
	export const get_feature_group = () => featureGroup;
	setContext(contextName, get_feature_group);
</script>



{@render children()}

<style>
</style>
