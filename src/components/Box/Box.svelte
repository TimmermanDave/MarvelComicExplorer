<script>
	export let elevation = 0;
</script>

<style>
	.box {
		display: flex;
		flex-direction: column;
		/* border: 1px solid #ccc;
		border-radius: 2px;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.1); */
		padding: 1em;
		margin: 0 0 1em 0;
	}
</style>

<div class="box mdc-elevation--z{elevation}">
	<slot>
		<em>no content was provided</em>
	</slot>
</div>