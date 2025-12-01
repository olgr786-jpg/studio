'use server';

/**
 * @fileOverview Generates an origin story for Nalu Water based on the brand's values.
 *
 * - generateOriginStory - A function that generates the origin story.
 * - GenerateOriginStoryInput - The input type for the generateOriginStory function.
 * - GenerateOriginStoryOutput - The return type for the generateOriginStory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOriginStoryInputSchema = z.object({
  brandValues: z
    .string()
    .describe(
      'The core values of Nalu Water, such as health, sustainability, and transparency.'
    ),
});
export type GenerateOriginStoryInput = z.infer<typeof GenerateOriginStoryInputSchema>;

const GenerateOriginStoryOutputSchema = z.object({
  originStory: z.string().describe('The generated origin story of Nalu Water.'),
});
export type GenerateOriginStoryOutput = z.infer<typeof GenerateOriginStoryOutputSchema>;

export async function generateOriginStory(
  input: GenerateOriginStoryInput
): Promise<GenerateOriginStoryOutput> {
  return generateOriginStoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOriginStoryPrompt',
  input: {schema: GenerateOriginStoryInputSchema},
  output: {schema: GenerateOriginStoryOutputSchema},
  prompt: `You are a creative storyteller crafting a captivating, albeit fictional, origin story of Nalu Water, a new water brand, to connect visitors to the brand's values.

  Based on the brand values provided, create a compelling and engaging origin story that resonates with consumers.
  The story should evoke a sense of purity and nature, emphasizing the brand's commitment to quality, sustainability, and the health of its consumers.

  Brand Values: {{{brandValues}}}

  Origin Story:`,
});

const generateOriginStoryFlow = ai.defineFlow(
  {
    name: 'generateOriginStoryFlow',
    inputSchema: GenerateOriginStoryInputSchema,
    outputSchema: GenerateOriginStoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
