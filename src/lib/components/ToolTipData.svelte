<script>
</script>

<div class="main-wrapper">
	<div class="state">
		<span>State </span>
	</div>
	<div class="row">
		<div class="data-wrapper">
			<div class="average-current-div">Average</div>
			<span>Return:</span><br />
			<span>13.5%</span>
		</div>
		<div class="data-wrapper">
			<div class="average-current-div">Current</div>
			<span>Return:</span><br />
			<span>13.5%</span>
		</div>
	</div>
</div>

<style>
	.main-wrapper {
		text-align: center;
	}
	.state {
		margin-bottom: 1rem;
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.data-wrapper {
		background-color: rgb(155, 167, 176);
		padding: 1rem;
		margin: 0.1rem;
		position: relative;
	}
	.average-current-div {
		position: absolute;
		top: -0.5rem;
		border-style: solid;
		border-color: rgb(233, 241, 238);
		color: chartreuse;
		font-size: xx-small;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		left: 50%; /* Move the left edge to the horizontal center */
		transform: translate(-50%, 0%);
	}
</style>
