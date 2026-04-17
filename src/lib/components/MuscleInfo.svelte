<script lang="ts">
  import { muscles } from '$lib/models/MuscleInfo';

  let { muscleId }: { muscleId: string | null } = $props();

  const entry = $derived(muscleId ? muscles.find(m => m.id === muscleId) ?? null : null);
</script>

{#if entry}
  <div class="flex flex-col gap-4">
    <h2 class="text-xl font-bold text-gray-900">{entry.title}</h2>

    {#if entry.description}
      <p class="text-gray-600 text-sm">{entry.description}</p>
    {/if}

    {#if entry.exercises.length > 0}
      <div>
        <h3 class="text-sm font-semibold text-gray-800 mb-1">Exercises</h3>
        <ul class="list-disc list-inside text-sm text-gray-600 space-y-0.5">
          {#each entry.exercises as exercise}
            <li>{exercise}</li>
          {/each}
        </ul>
      </div>
    {/if}

    {#if entry.exercisesWithoutEquipment.length > 0}
      <div>
        <h3 class="text-sm font-semibold text-gray-800 mb-1">Exercises without equipment</h3>
        <ul class="list-disc list-inside text-sm text-gray-600 space-y-0.5">
          {#each entry.exercisesWithoutEquipment as exercise}
            <li>{exercise}</li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
{/if}