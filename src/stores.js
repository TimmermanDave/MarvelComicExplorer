import { writable } from 'svelte/store';

export const firstLevelSearch = writable();
export const secondLevelSearch = writable();
export const secondLevelSearchUpdated = writable([]);
export const categories = writable([]);
export const selectedCategory = writable('');
export const selectedLabel = writable('');
export const currentPath = writable('');
