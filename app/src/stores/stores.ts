import type { Part } from '$lib';
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

export const selectionStore: Writable<string|null> = writable(null);
export const selectedPartStore: Writable<Part|null> = writable(null);