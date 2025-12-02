'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  return (
    <form
      action="https://formspree.io/f/mrbnkawl"
      method="POST"
      className="space-y-4"
    >
      <Input
        type="text"
        name="name"
        placeholder="El teu nom"
        className="bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400"
        aria-label="Nom"
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="El teu correu electrònic"
        className="bg-gray-800/80 border-gray-600 text-white placeholder:text-gray-400"
        aria-label="Correu electrònic"
        required
      />
      <Textarea
        name="message"
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
