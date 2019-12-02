import { onDestroy } from 'svelte';
import { firstLevelSearch, secondLevelSearch, selectedCategory, selectedLabel, currentPath } from '../../stores';
import { fetchMarvelResource } from '../../utils';

export async function doSearch(item) {
    let currentPathValue;
    const currentPathUnsub = currentPath.subscribe(value => {
        currentPathValue = value;
    });
    onDestroy(currentPathUnsub); 
    
    // call api
    currentPath.update(value => value = item.path);
    const payload = await fetchMarvelResource(currentPathValue);
    // update search results
    const parts = currentPathValue.split('/');
    if (parts.length === 1) {
        // fill first result table when category is requested
        firstLevelSearch.set({});
        firstLevelSearch.update(value => value = payload.data);
        selectedCategory.update(value => value = parts[0]);	
    } else {
        if (parts[0] !== selectedCategory) {
            // re-fill first result table when category is changed while requesting resource
            const _payload = await fetchMarvelResource(parts[0]);
            firstLevelSearch.update(value => value = _payload.data);
            selectedCategory.update(value => value = parts[0]);
        }
        if (parts.length === 2) {
            // fill second result table when resource is requested
            secondLevelSearch.update(value => value = payload.data.results[0]);
            selectedLabel.update(value => value = item.label);
        }
    }   
}