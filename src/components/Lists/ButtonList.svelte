<script>
    import Card, { Content, PrimaryAction, Media, MediaContent, Actions, ActionButtons, ActionIcons } from '@smui/card';
	import Button, {Label} from '@smui/button';
	import IconButton, {Icon} from '@smui/icon-button';
    import List, {Item, Text} from '@smui/list';
    
    export let data;
	export let onSubmit;
    
    const imageSize = 'portrait_incredible';
</script>

<style>
    .list {
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        padding: 0;
    }
    
    .list-item {
        margin: 4px;
    }

    /* Ladda
    button {
        width: 100%;
        height: 100%;
        color: grey;
    }
    .ladda-button {
        background-color: transparent;
    }

    /* Material UI */

	/* * :global(.card-media-16x9) {
		background-image: url(https://via.placeholder.com/320x180.png?text=16x9);
	}
	* :global(.card-media-square) {
		background-image: url(https://via.placeholder.com/320x320.png?text=square);
	} */

    /* Image api sizes: */
	.portrait_small { width: 50px; height: 75px; }
	.portrait_medium { width: 100px; height: 150px; }
	.portrait_xlarge { width: 150px; height: 225px; }
	.portrait_fantastic { width: 168px; height: 252px; }
	.portrait_uncanny { width: 300px; height: 450px; }
	.portrait_incredible { width: 216px; height: 324px; }
	.standard_small	{ width: 65px; height: 45px; }
	.standard_medium { width: 100px; height: 100px; }
	.standard_large	{ width: 140px; height: 140px; }
	.standard_xlarge { width: 200px; height: 200px; }
	.standard_fantastic	{ width: 250px; height: 250px; }
	.standard_amazing { width: 180px; height: 180px; }
	.landscape_small { width: 120px; height: 90px; }
	.landscape_medium { width: 175px; height: 130px; }
	.landscape_large { width: 190px; height: 140px; }
	.landscape_xlarge { width: 270px; height: 200px; }
	.landscape_amazing { width: 250px; height: 156px; }
	.landscape_incredible { width: 464px; height: 261px; }
	.detail	{} /* constrained to 500px wide */
	.full-size {} /* no variant descriptor */

    /*
    Ladda styles:
    data-style: one of the button styles, full list in demo [required]
    data-color: green/red/blue/purple/mint
    data-size: xs/s/l/xl, defaults to medium
    data-spinner-size: pixel dimensions of spinner, defaults to dynamic size based on the button height
    data-spinner-color: a hex code or any named CSS color
    data-spinner-lines: the number of lines the for the spinner, defaults to 12
    */
</style>

{#if data && data.length}
<ul class="list">
    {#each data as item, i}
    <li class="list-item">

        {#if !item.thumbnail}
        <Card>
			<PrimaryAction on:click={() => onSubmit(item)} padded>{item.label}</PrimaryAction>
		</Card>
        {/if}

        {#if item.thumbnail}
        <div class="{item.imageSize || imageSize}" style="height: auto;">
            <Card>
                <div style="padding: 1rem;">
                    <h2 class="mdc-typography--headline6" style="margin: 0;">{item.label}</h2>
                    <h3 class="mdc-typography--subtitle2" style="margin: 0; color: #888;"></h3>
                </div>
                <PrimaryAction on:click={() => onSubmit(item)}>
                <div style="background-image: url({item.thumbnail});" class="{item.imageSize || imageSize}" />
                {#if item.data && item.data.description}
                    <Content class="mdc-typography--body2">
                        {@html item.data.description}
                    </Content>
                {/if}
                </PrimaryAction>
            </Card>
        </div>
        {/if}

    </li>
    {/each}
</ul>
{/if}
