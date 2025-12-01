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
    // Here you would typically handle the form submission, e.g., send data to an API
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="El teu correu electrònic"
        className="bg-card/10 border-border/20 text-primary-foreground placeholder:text-accent-foreground/60 focus:ring-primary"
        aria-label="Correu electrònic"
        required
      />
      <Textarea
        placeholder="El teu missatge"
        className="bg-card/10 border-border/20 text-primary-foreground placeholder:text-accent-foreground/60 focus:ring-primary"
        aria-label="Missatge"
        required
      />
      <Button type="submit" variant="secondary" className="w-full">
        Enviar Missatge
      </Button>
    </form>
  );
}
