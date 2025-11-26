// @/app/actions/story.ts
'use server';
import { generateOriginStory } from '@/ai/flows/generate-origin-story';

export async function getOriginStory() {
  try {
    const result = await generateOriginStory({
      brandValues: 'salut, sostenibilitat, transparència, puresa, natura tropical, frescor',
    });
    return { story: result.originStory, error: null };
  } catch (e) {
    console.error(e);
    return { story: null, error: 'No s’ha pogut generar la història. Si us plau, torna-ho a provar.' };
  }
}
