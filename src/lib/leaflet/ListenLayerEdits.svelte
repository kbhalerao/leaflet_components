<script>
	import { createEventDispatcher, getContext } from "svelte";
    const dispatch = createEventDispatcher()

    const layer = getContext("layer")();

    layer.on('pm:edit',(e)=>{
            dispatch('pm:edit',e)
        })
</script>