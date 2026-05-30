import { Body, Part } from '$lib';
import bodyData from '../../static/body.json';

export async function load() {
	const parts = bodyData.parts.map((p: { id: string; title: string; description: string; exercises: string[]; bodyweightExercises: string[] }) =>
		new Part(p.id, p.title, p.description, p.exercises, p.bodyweightExercises)
	);

	return { body: new Body(parts) };
}