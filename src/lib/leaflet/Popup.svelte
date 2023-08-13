<script>
	import { getContext, setContext } from 'svelte';
	/**
	 * @type {string}
	 */
	let classNames = '';
	export { classNames as class };
	/**
	 * @type {{ remove: () => void; } | undefined}
	 */
	export let popup = undefined;
	let showContents = false;
	let popupOpen = false;
	const layer = getContext('layer')();

	/**
	 * @param {HTMLDivElement} popupElement
	 */
	async function createPopup(popupElement) {
		let L = await import('leaflet');
		popup = L.popup().setContent(popupElement);
		layer.bindPopup(popup);
		layer.on('popupopen', () => {
			popupOpen = true;
			showContents = true;
		});
		layer.on('popupclose', () => {
			popupOpen = false;
			// Wait for the popup to completely fade out before destroying it.
			// Otherwise the fade out looks weird as the contents disappear too early.
			setTimeout(() => {
				if (!popupOpen) {
					showContents = false;
				}
			}, 500);
		});
		return {
			destroy() {
				if (popup) {
					layer.unbindPopup();
					popup.remove();
					popup = undefined;
				}
			}
		};
	}

	setContext('popup', () => popup);
</script>

<div class="hidden">
	<div use:createPopup class={classNames}>
		{#if showContents}
			<slot />
		{/if}
	</div>
</div>
