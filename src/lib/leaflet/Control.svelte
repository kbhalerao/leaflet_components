<script>
	import { getContext } from 'svelte';
	/**
	 * @type {undefined}
	 */
	let classNames = undefined;
	export { classNames as class };

	/**
	 * position: 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
	 * @type {string}
	 */
	export let position;

	/**
	 * The control instance created by this component
	 * @type {{ remove: () => void; } | undefined}
	 */
	export let control = undefined;
	const map = getContext('map')();

	/**
	 * @param {HTMLDivElement} container
	 */
	async function createControl(container) {
		import('./utils.js').then(({ Control }) => {
			control = new Control(container, position).addTo(map);
			return {
				destroy() {
					control?.remove();
					control = undefined;
				}
			};
		});
	}
</script>

<div style="display:hidden">
	<div use:createControl class={classNames}>
		{#if control}
			<slot {control} />
		{/if}
	</div>
</div>
