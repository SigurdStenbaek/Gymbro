import { Body, Part } from '$lib';

export async function load({ fetch }) {
	const res = await fetch('/body.json');
	const json = await res.json();

	const parts = json.parts.map((p: { id: string; title: string; description: string; exercises: string[]; bodyweightExercises: string[] }) =>
		new Part(p.id, p.title, p.description, p.exercises, p.bodyweightExercises)
	);

	return { body: new Body(parts) };
}