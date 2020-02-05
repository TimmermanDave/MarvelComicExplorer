<script>
	import { onDestroy } from 'svelte';
	import { secondLevelSearch, secondLevelEnrichedSearch, selectedLabel } from '../../stores';
	import { doSearch, parseSecondLevelSearch } from './search';
	import { fetchMarvelResource, getImagePath } from '../../utils'; 

	import Box from '../Box';
	import { ButtonList } from '../Lists';

	$: parseSecondLevelSearch($secondLevelSearch);
</script>

<style>
	
</style>

{#if $secondLevelEnrichedSearch.length}
<Box class="search-result__level-2">
	<h2>{$selectedLabel}</h2>
	{#each $secondLevelEnrichedSearch as search, i}
	<Box>
		<h3>{search.title}</h3>
		<i>{search.returned}/{search.available}</i>
		<ButtonList data={search.list} onSubmit={doSearch} />
	</Box>
	{/each}
</Box>
{/if}