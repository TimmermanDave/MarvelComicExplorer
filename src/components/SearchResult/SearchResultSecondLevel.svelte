<script>
	import { onDestroy } from 'svelte';
	import { secondLevelSearch, secondLevelSearchUpdated, selectedLabel } from '../../stores';
	import { doSearch, parseSecondLevelSearch } from './search';
	import { fetchMarvelResource, getImagePath } from '../../utils'; 

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	let selectedLabelValue;
	const selectedLabelUnsub = selectedLabel.subscribe(value => selectedLabelValue = value);
	onDestroy(selectedLabelUnsub);

	let secondLevelSearchValue;
	const secondLevelSearchUnsub = secondLevelSearch.subscribe(value => secondLevelSearchValue = value);
	onDestroy(secondLevelSearchUnsub);

	let secondLevelSearchUpdatedValue;
	const secondLevelSearchUpdatedUnsub = secondLevelSearchUpdated.subscribe(value => secondLevelSearchUpdatedValue = value);
	onDestroy(secondLevelSearchUpdatedUnsub);

	$: searchResult = parseSecondLevelSearch(secondLevelSearchValue);
</script>

<style>
	
</style>

{#if secondLevelSearchUpdatedValue.length}
<Box class="search-result__level--2">
	<h2>{selectedLabelValue}</h2>
	{#each secondLevelSearchUpdatedValue as search, i}
	<Box>
		<h3>{search.title}</h3>
		<i>{search.returned}/{search.available}</i>
		<ButtonList data={search.list} onSubmit={doSearch} />
	</Box>
	{/each}
</Box>
{/if}