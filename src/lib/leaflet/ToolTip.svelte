<script>
	import { getContext, setContext } from 'svelte';

	console.log('Inside tooltip element');

	let { classNames, tooltip, sticky } = $props();

	// export { classNames as class };
	/**
	 * @type {{ remove: () => void; } | undefined}
	 */
	// export let tooltip = undefined;
	// export let sticky = false;
	let showContents = false;
	let tooltipOpen = false;
	const layer = getContext('layer')();

	async function createTooltip(tooltipElement) {
		$effect(async () => {
			console.log('The tooltip element', layer);
			let L = await import('leaflet');
			tooltip = L.tooltip({
				sticky
			}).setContent(tooltipElement);
			layer.bindTooltip(tooltip);
			layer.on('tooltipopen', () => {
				tooltipOpen = true;
				showContents = true;
			});
			layer.on('tooltipclose', () => {
				tooltipOpen = false;
				// Wait for the popup to completely fade out before destroying it.
				// Otherwise the fade out looks weird as the contents disappear too early.
				setTimeout(() => {
					if (!tooltipOpen) {
						showContents = false;
					}
				}, 500);
			});

			return () => {
				if (tooltip) {
					layer.unbindTooltip();
					tooltip.remove();
					tooltip = undefined;
				}
			};
		});

		// return {
		// 	destroy() {
		// 		if (tooltip) {
		// 			layer.unbindTooltip();
		// 			tooltip.remove();
		// 			tooltip = undefined;
		// 		}
		// 	}
		// };
	}

	setContext('popup', () => popup);
</script>

<div>
	<div use:createTooltip class={classNames}>
		{#if showContents}
			<!-- <slot /> -->
			 {@render children()}
		{/if}
	</div>
</div>
