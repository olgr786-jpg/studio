'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getOriginStory } from '@/app/actions/story';
import { Loader2, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function OriginStoryGenerator() {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setStory('');
    const result = await getOriginStory();
    if (result.error) {
      setError(result.error);
    } else if (result.story) {
      setStory(result.story);
    }
    setLoading(false);
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-6">
      <Button onClick={handleGenerate} disabled={loading} size="lg" variant="secondary">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generant...
          </>
        ) : (
          'Descobreix La Nostra Història'
        )}
      </Button>

      {error && (
        <Alert variant="destructive" className="max-w-2xl">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {story && (
        <div className="max-w-2xl text-center p-6 bg-accent/50 rounded-lg shadow-inner">
          <p className="text-lg leading-relaxed text-foreground/80 whitespace-pre-wrap">{story}</p>
        </div>
      )}
    </div>
  );
}
