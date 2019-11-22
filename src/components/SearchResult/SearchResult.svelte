<script>
    export let searches;
    export let categories;
    export let category;
    export let label;
	export let doSearch;

	import Box from '../Box';
	import SearchResultFirstLevel from './SearchResultFirstLevel.svelte';
	import SearchResultSecondLevel from './SearchResultSecondLevel.svelte';
	
	$: resultFirstLevel = searches[1];
	$: resultSecondLevel = searches[2];
</script>

<style>
	
</style>

<div class="search-result">
	<SearchResultFirstLevel 
		category={category}
		data={resultFirstLevel} 
		doSearch={doSearch}
	/>
	<SearchResultSecondLevel 
		categories={categories} 
		label={label}
		data={resultSecondLevel} 
		doSearch={doSearch} 
	/>
</div>