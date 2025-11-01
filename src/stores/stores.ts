import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

export const selectionStore: Writable<string|null> = writable(null);