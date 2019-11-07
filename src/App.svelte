<script>
	export let name;

	import { onMount } from 'svelte';
	import Box from './Box.svelte';
	import SearchResult from './SearchResult.svelte';

	let docs;
	let endpointList = [];
	let params = {};
	let searches = {};
	let searchList = [];

	const basePath = 'http://localhost:3000/api';
	const version = 'v1';

	async function getDocs() {
		const payload = await fetch(`http://localhost:3000/docs`).then(res => res.json());
		docs = JSON.parse(payload);
		endpointList = docs.apis.reduce((acc, item) => {
			const endpoint = item.path.replace(`/${version}/public/`, '').split('/')[0];
			if (endpoint && acc.indexOf(endpoint) < 0) acc.push(endpoint);
			return acc;
		}, []);
	}

	function parseParams() {
		return Object.keys(params).map((key) => {
			return `/${params[key]}`;
		});
	}

	function updateSearch(results, level) {
		searches[level] = results;
		searchList = Object.keys(searches).map((key) => {
			return searches[key];
		});
	}

	async function doSearch(param, level = 0) {
		updateSearch([], level);
		params[level] = param;

		const uri = `${basePath}/${version}${parseParams()}`;
		const payload = await fetch(uri).then(res => res.json());
		const parsed = JSON.parse(payload);

		updateSearch(parsed.data.results, level);
	}

	onMount(getDocs);
</script>
	
<style>
	button {
		margin: 4px;
	}
</style>

<h1>{name}</h1>
<h2>{parseParams(params)}</h2>

{#if docs}
	<Box>
		<h2>Endpoints</h2>
		{#each endpointList as endpoint, i}
			<button on:click={() => doSearch(endpoint)}>{endpoint}</button>
		{/each}
	</Box>
{/if}

{#each searchList as search, i}
	<Box>
		<SearchResult data={search} category={params[i]} level={i} onClick={doSearch} />
	</Box>
{/each}
	
	<!-- {#if search[1]}
	<ul>
	{#each search[1] as item, i}
		<li><button on:click={() => doSearch(item.id)}>{item.comics}</button></li>
	{/each}
	</ul>
	{/if} -->

	<!-- <h2>Endpoints variants</h2>
	<ul>
	{#each docs.apis as { path }, i}
		<li><a target="_blank" href="{`${docs.basePath}${path}`}">
			{docs.basePath}{path}
		</a></li>
	{/each}
	</ul> -->