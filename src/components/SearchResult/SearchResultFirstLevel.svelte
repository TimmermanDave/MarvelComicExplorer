<script>	
	import { onDestroy } from 'svelte';
	import { firstLevelSearch } from '../../stores';
	import { doSearch, parseFirstLevelSearch } from './search';

	import Box from '../Box';
	import { ButtonList } from '../Lists'; 

	let firstLevelSearchValue;
	const firstLevelSearchUnsub = firstLevelSearch.subscribe(value => firstLevelSearchValue = value);
	onDestroy(firstLevelSearchUnsub);

	$: searchResult = parseFirstLevelSearch(firstLevelSearchValue);
</script>

<style>
	
</style>

{#if searchResult.list.length}
<Box class="search-result__level--1">
	<h2>{searchResult.title}</h2>
	<i>{searchResult.returned}/{searchResult.available}</i>
	<ButtonList data={searchResult.list} onSubmit={doSearch} />
</Box>
{/if}