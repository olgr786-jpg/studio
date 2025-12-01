'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export function ContactForm() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: 'Missatge enviat!',
      description: "Gràcies per contactar amb nosaltres. Et respondrem aviat.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="El teu nom"
        className="bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400"
        aria-label="Nom"
        required
      />
      <Input
        type="email"
        placeholder="El teu correu electrònic"
        className="bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400"
        aria-label="Correu electrònic"
        required
      />
      <Textarea
        placeholder="El teu missatge"
        className="bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400"
        aria-label="Missatge"
        required
      />
      <Button type="submit" variant="secondary" className="w-full rounded-lg">
        Enviar Missatge
      </Button>
    </form>
  );
}
