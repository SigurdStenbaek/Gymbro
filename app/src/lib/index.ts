// place files you want to import through the `$lib` alias in this folder.
export class Body {
	parts: Part[];

	constructor(parts: Part[]) {
		this.parts = parts;
	}
}

export class Part {
	id: string;
	title: string;
	description: string;
	exercises: string[];
	bodyweightExercises: string[];

	constructor(id: string, title: string, description: string, exercises: string[] = [], bodyweightExercises: string[] = []) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.exercises = exercises;
		this.bodyweightExercises = bodyweightExercises;
	}
}