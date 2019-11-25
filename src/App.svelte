<script>
	export let name;

	import { onMount } from 'svelte';
	import Box from './components/Box';
	import CategorieResult from './components/CategorieResult';
	import SearchResult from './components/SearchResult';

	let categories = [];
	let selectedCategory = '';
	let selectedLabel = '';
	let path = '';
	let searches = {};

	const basePath = 'http://localhost:3000/api';

	async function fetchCategories() {
		// call api
		const payload = await fetch(`${basePath}/docs/v1`).then(res => res.json());
		categories = payload.apis.reduce((acc, item) => {
			// set path and label
			const path = item.path.replace(`/v1/public/`, '');
			const label = path.split('/')[0];
			// dedupe and add to accumulator
			if (label && acc.every(_item => _item.resource.label.indexOf(label) < 0)) {
				const resource = { path, label };
				acc.push({ ...item, resource });
			}
			return acc;
		}, []);
	}

	async function doSearch(item) {
		// call api
		path = item.resource.path;
		const uri = `${basePath}/marvel/v1/${path}`;
		const payload = await fetch(uri).then(res => res.json());
		// update search results
		const parts = path.split('/');
		if (parts.length === 1) {
			searches = {};
			searches[parts.length] = payload.data;
			selectedCategory = parts[0];
		} else {
			searches[parts.length] = payload.data.results[0];
			selectedLabel = item.resource.label;
		}
	}

	async function fetchResource(path) {
		const uri = `${basePath}/marvel/v1/${path}`;
		return await fetch(uri);
	}
	
	onMount(fetchCategories);
</script>
	
<style>
	:global(h1, h2, h3, h4, h5) {
        text-transform: capitalize;
	}
	:global(i) {
        font-size: 10px;
	}
</style>

<h1>{name}</h1>
<h4>/{path}</h4>

<Box>
	<CategorieResult 
		categories={categories}
		doSearch={doSearch}
	/>
	<SearchResult 
		searches={searches}
		categories={categories}
		category={selectedCategory}
		label={selectedLabel}
		doSearch={doSearch}
		fetchResource={fetchResource}
	/>
</Box>