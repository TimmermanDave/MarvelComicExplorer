<script>
	export let appName;

	import { categories, currentPath } from './stores';

	import Box from './components/Box';
	import CategorieResult from './components/CategorieResult';
	import { SearchResultFirstLevel, SearchResultSecondLevel } from './components/SearchResult';
</script>
	
<style>
	:global(h1, h2, h3, h4, h5) {
        text-transform: capitalize;
	}
	:global(i) {
        font-size: 10px;
	}
</style>

<h1>{appName}</h1>
<h4>/{$currentPath}</h4>
<CategorieResult />
<div class="search-result">
	<SearchResultFirstLevel />
	<SearchResultSecondLevel />
</div>