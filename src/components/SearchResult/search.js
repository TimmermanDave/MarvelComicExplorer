import { onDestroy } from 'svelte';
import { firstLevelSearch, secondLevelSearch, secondLevelSearchUpdated, categories, selectedCategory, selectedLabel, currentPath } from '../../stores';
import { fetchMarvelResource, marvelApiDomain, marvelApiPath, getImagePath } from '../../utils'; 

export async function doSearch(item) {
    let currentPathValue;
    const currentPathUnsub = currentPath.subscribe(value => currentPathValue = value);
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

export function parseFirstLevelSearch(data, imageSize) {
    let selectedCategoryValue;
    const selectedCategoryUnsub = selectedCategory.subscribe(value => selectedCategoryValue = value);
    onDestroy(selectedCategoryUnsub);

    const result = {
        title: '', 
        list: [],
        returned: 0, 
        available: 0,
    };

    if (!data) return result;

    result.title = selectedCategoryValue;
    result.list = data.results.map((item) => {
        const fields = {
            characters: 'name',
            creators: 'firstName',
            default: 'title',
        };
        const field = fields[selectedCategoryValue] || fields.default;
        const label = item[field];
        const path = item.resourceURI.replace(marvelApiDomain + marvelApiPath, '');
        const resource = {
            label, 
            path,
            thumbnail: getImagePath(item.thumbnail, imageSize),
        };
        return { ...item, ...resource };
    }, []);
    result.returned = data.offset + data.count;
    result.available = data.total;

    return result;
}

export function parseSecondLevelSearch(data, imageSize) {
    let categoriesValue;
    const categoriesUnsub = categories.subscribe(value => categoriesValue = value);
    onDestroy(categoriesUnsub);

    let secondLevelSearchUpdatedValue;
	const secondLevelSearchUpdatedUnsub = secondLevelSearchUpdated.subscribe(value => secondLevelSearchUpdatedValue = value);
    onDestroy(secondLevelSearchUpdatedUnsub);
    
    let searchResult;

    const getData = async function(path, i, j) {
		const payload = await fetchMarvelResource(path);
        // clone list
		const dataClone = JSON.parse(JSON.stringify(searchResult));
        // find targeted item and add data if available in payload
        const target = dataClone[i] ? dataClone[i].list[j] : false;
        if (target && payload && payload.data && payload.data.count) {
            const results = payload.data.results[0];
            const images = results.images || [results.thumbnail];
            if (images[0]) {
                target.data = payload;
                target.thumbnail = getImagePath(images[0], imageSize);
                // overwrite to trigger render loop
                searchResult = dataClone;
                secondLevelSearchUpdated.update(value => value = dataClone);
            }
        }
    }

    if(!data) return [];

    // grab every result array by category name
    return categoriesValue.reduce((acc, category) => {
        const item = data[category.label];
        if (item && item.available) {
            const title = category.label;
            const list = item.items.map((_item, j) => {
                const label = _item.name;
                const path = _item.resourceURI.replace(marvelApiDomain + marvelApiPath, '');
                const resource = { label, path, imageSize };
                getData(path, acc.length, j);
                // fetch resource in parallel
                return { ..._item, ...resource };
            }, []);
            // add normalized array to accumulator
            acc.push({
                title, 
                list, 
                returned: item.returned, 
                available: item.available,
            });
            searchResult = acc;
        }
        return acc;
    }, []);
}