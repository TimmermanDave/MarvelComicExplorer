<script>
	import { onMount } from 'svelte';
	import { secondLevelSearch, selectedLabel, categories } from '../../stores';
	import { doSearch } from './search';
	import { fetchMarvelResource, marvelApiDomain, marvelApiPath, getImagePath } from '../../utils';

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	let secondLevelSearchValue;
	secondLevelSearch.subscribe(value => secondLevelSearchValue = value);
	let categoriesValue;
	categories.subscribe(value => categoriesValue = value);
	let selectedLabelValue;
	selectedLabel.subscribe(value => selectedLabelValue = value);

	const imageSize = 'landscape_xlarge';

	async function getData(path, i, j) {
		const payload = await fetchMarvelResource(path);
		// clone list
		const resultClone = JSON.parse(JSON.stringify(searchResult));
		// find targeted item and add data if available in payload
		const target = resultClone[i].list[j];
		if (target && payload && payload.data && payload.data.count) {
			const results = payload.data.results[0];
			const images = results.images || [results.thumbnail];
			if (images[0]) {
				target.data = payload;
				target.thumbnail = getImagePath(images[0], imageSize);
				// overwrite to trigger render loop
				searchResult = resultClone;
			}
		}
	}

	function parseResults(_data) {
		if(!_data) return [];
		// grab every result array by category name
		return categoriesValue.reduce((acc, category, i) => {
			const item = _data[category.label];
			if (item && item.available) {
				const title = category.label;
				const list = item.items.map((_item, j) => {
					const label = _item.name;
					const path = _item.resourceURI.replace(marvelApiDomain + marvelApiPath, '');
					const resource = { label, path, imageSize };
					// fetch resource in parallel
					getData(path, acc.length, j);
					return { ..._item, ...resource };
				}, []);
				// add normalized array to accumulator
				acc.push({
					title, 
					list, 
					returned: item.returned, 
					available: item.available,
				});
			}
			return acc;
		}, []);
	}

	$: searchResult = parseResults(secondLevelSearchValue);
</script>

<style>
	
</style>

{#if searchResult.length}
<Box class="search-result__level--2">
	<h2>{selectedLabelValue}</h2>
	{#each searchResult as search, i}
	<Box>
		<h3>{search.title}</h3>
		<i>{search.returned}/{search.available}</i>
		<ButtonList data={search.list} onSubmit={doSearch} isRow={search.title === 'stories'} size={imageSize} />
	</Box>
	{/each}
</Box>
{/if}