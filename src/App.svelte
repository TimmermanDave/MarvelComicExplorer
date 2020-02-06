<script>
	import Textfield, {Input, Textarea} from '@smui/textfield';
    import Icon from '@smui/textfield/icon/index';
	import HelperText from '@smui/textfield/helper-text/index';
	import Button, {Group, GroupItem, Label} from '@smui/button';
	import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
	import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
	import H6 from '@smui/common/H6.svelte';
	
	import { categories, currentPath } from './stores';

	import Box from './components/Box';
	import CategorieResult from './components/CategorieResult';
	import { SearchResultFirstLevel, SearchResultSecondLevel } from './components/SearchResult';

	export let appName;

	// search
	let searchValue = '';

	// drawer
	let myDrawer;
	let myDrawerOpen = false;
	let active = 'Gray Kittens';

	function setActive(value) {
		active = value;
		myDrawerOpen = false;
	}


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
			<Button on:click={() => {}} variant="outlined"><Label>One</Label></Button>
			<Button on:click={() => {}} variant="outlined"><Label>Two</Label></Button>
			<Button on:click={() => {}} variant="outlined"><Label>Three</Label></Button>
		</Group>

		<div>
			<Textfield class="shaped-outlined" variant="outlined" withTrailingIcon bind:value={searchValue} label="Search" input$aria-controls="helper-text-search" input$aria-describedby="helper-text-search">
				<Icon class="material-icons">search</Icon>
			</Textfield>
			<HelperText id="helper-text-search">Search the Marvel database</HelperText>
		</div>
	</Box>
</section>

<section class="drawer-container">
	<Drawer variant="dismissible" bind:this={myDrawer} bind:open={myDrawerOpen}>
	<Header>
		<Title>Super Drawer</Title>
		<Subtitle>It's the best drawer.</Subtitle>
	</Header>
	<Content>
		<List>
		<Item href="javascript:void(0)" on:click={() => setActive('Gray Kittens')} activated={active === 'Gray Kittens'}>
			<Text>Gray Kittens</Text>
		</Item>
		<Item href="javascript:void(0)" on:click={() => setActive('A Space Rocket')} activated={active === 'A Space Rocket'}>
			<Text>A Space Rocket</Text>
		</Item>
		<Item href="javascript:void(0)" on:click={() => setActive('100 Pounds of Gravel')} activated={active === '100 Pounds of Gravel'}>
			<Text>100 Pounds of Gravel</Text>
		</Item>
		<Item href="javascript:void(0)" on:click={() => setActive('All of the Shrimp')} activated={active === 'All of the Shrimp'}>
			<Text>All of the Shrimp</Text>
		</Item>
		<Item href="javascript:void(0)" on:click={() => setActive('A Planet with a Mall')} activated={active === 'A Planet with a Mall'}>
			<Text>A Planet with a Mall</Text>
		</Item>
		</List>
	</Content>
	</Drawer>

	<AppContent class="app-content">
	<main class="main-content">
		<Button on:click={() => myDrawerOpen = !myDrawerOpen}><Label>Toggle Drawer</Label></Button>
		<br />
		<pre class="status">Active: {active}</pre>
	</main>
	</AppContent>
</section>

<section class="main">
	<CategorieResult />
	<div class="search-result">
		<SearchResultFirstLevel />
		<SearchResultSecondLevel />
	</div>
</section>