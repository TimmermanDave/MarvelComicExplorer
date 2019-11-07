<script>
    export let data;
    export let category;
    export let level;
	export let onClick;

	import { afterUpdate } from 'svelte';

	let list = [];

	function parseList() {
		list = data.map((item) => {
			const fields = {
				characters: 'name',
				creators: 'firstName',
				default: 'title',
			};
			const field = fields[category] || fields.default;
			return { ...item, label: item[field] };
		}, []);
	}

	afterUpdate(parseList);
</script>

<style>
	button {
		margin: 4px;
	}
</style>

<div class="search">
	<h2>Search level {level}</h2>
	{#each list as item, i}
		<button on:click={() => onClick(item.id, level)}>{item.label}</button>
	{/each}
</div>