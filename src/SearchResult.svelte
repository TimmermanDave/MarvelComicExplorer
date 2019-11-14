<script>
    export let data;
    export let category;
    export let level;
	export let onClick;

	import { afterUpdate } from 'svelte';

	let list = [];

	function parseLevel0() {
		return data.map((item) => {
			const fields = {
				characters: 'name',
				creators: 'firstName',
				default: 'title',
			};
			const field = fields[category] || fields.default;
			return { ...item, label: item[field] };
		}, []);
	}

	function parseLevel1() {
		return data.map((item) => {
			return { 
				comics: item.comics.items,
				events: item.events.items,
				series: item.series.items,
				stories: item.stories.items,
			};
		}, []);
	}

	function parseList() {
		const parseList = {
			0: parseLevel0,
			1: parseLevel1,
		}
		list = parseList[level]();
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
	{#if level === 0}
		{#each list as item, i}
			<button on:click={() => onClick(item.id, level+1)}>{item.label}</button>
		{/each}
	{/if}
	{#if level === 1}
		{#each list as item, i}
			<button on:click={() => onClick(item.id, level+1)}>{item.label}</button>
		{/each}
	{/if}
</div>