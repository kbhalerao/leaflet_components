<script>
	import { getContext } from 'svelte';
	/**
	 * @type {undefined}
	 */
	let {classNames = undefined,position,control=undefined,children}=$props();
	export { classNames as class };

	
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
			{@render children()}
		{/if}
	</div>
</div>
