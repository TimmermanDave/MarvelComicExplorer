<script>
	import Textfield, {Input, Textarea} from '@smui/textfield';
    import Icon from '@smui/textfield/icon/index';
	import HelperText from '@smui/textfield/helper-text/index';
	import Button, {Group, GroupItem, Label} from '@smui/button';
	import { categories, currentPath } from './stores';

	import Box from './components/Box';
	import CategorieResult from './components/CategorieResult';
	import { SearchResultFirstLevel, SearchResultSecondLevel } from './components/SearchResult';

	export let appName;

	let searchValue = '';
</script>
	
<style>
	:global(.shaped) {
		border-radius: 16px 16px 0 0;
	}
	:global(.shaped-outlined .mdc-text-field__input) {
		padding-left: 32px;
		padding-right: 32px;
	}
	:global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__leading) {
		border-radius: 28px 0 0 28px;
		width: 28px;
	}
	:global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__trailing) {
		border-radius: 0 28px 28px 0;
	}
	:global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
		max-width: calc(100% - 28px * 2);
	}
	:global(.shaped-outlined + .mdc-text-field-helper-line) {
		padding-left: 32px;
		padding-right: 28px;
	}
</style>

<svelte:head>
  <title>Home</title>
</svelte:head>

<section class="heading">
	<Box elevation="5">
		<h1>{appName}</h1>
		<h4>/{$currentPath}</h4>
		<Group variant="outlined">
			<Button on:click={() => clicked++} variant="outlined"><Label>One</Label></Button>
			<Button on:click={() => clicked++} variant="outlined"><Label>Two</Label></Button>
			<Button on:click={() => clicked++} variant="outlined"><Label>Three</Label></Button>
		</Group>

		<div>
			<Textfield fullwidth class="shaped-outlined" variant="outlined" withTrailingIcon bind:value={searchValue} label="Search" input$aria-controls="helper-text-search" input$aria-describedby="helper-text-search">
				<Icon class="material-icons">search</Icon>
			</Textfield>
			<HelperText id="helper-text-search">Search the Marvel database</HelperText>
		</div>
	</Box>
</section>

<section class="menu">
	<Box>
	</Box>
</section>

<section class="main">
	<CategorieResult />
	<div class="search-result">
		<SearchResultFirstLevel />
		<SearchResultSecondLevel />
	</div>
</section>