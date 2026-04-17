import bodyData from '$lib/data/body.json';

export class MuscleInfo {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly exercises: string[];
  readonly exercisesWithoutEquipment: string[];

  constructor(id: string, title: string, description: string, rawExercises: string[]) {
    this.id = id;
    this.title = title;
    this.description = description;

    const withoutIdx = rawExercises.findIndex(e => e.toLowerCase() === 'without equipment');
    this.exercises = rawExercises
      .slice(0, withoutIdx === -1 ? rawExercises.length : withoutIdx)
      .filter(e => e.toLowerCase() !== 'exercises');
    this.exercisesWithoutEquipment = withoutIdx !== -1
      ? rawExercises.slice(withoutIdx + 1)
      : [];
  }

  static fromJson(entry: { Id: string; Title: string; Description: string; Excercises: string[] }): MuscleInfo {
    return new MuscleInfo(entry.Id, entry.Title, entry.Description, entry.Excercises);
  }
}

export const muscles: MuscleInfo[] = bodyData.Body
  .filter((e): e is { Id: string; Title: string; Description: string; Excercises: string[] } => 'Id' in e)
  .map(MuscleInfo.fromJson);
