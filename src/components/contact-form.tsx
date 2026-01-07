'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    
    try {
      await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally, show an error message to the user
    }
  };
  
  if (!isClient) {
    return null; // Don't render on the server
  }

  if (submitted) {
    return (
      <div className="text-center text-green-100 p-4 rounded-lg bg-green-900/50 font-sans">
        <h3 className="font-bold text-lg font-headline text-white">Gràcies!</h3>
        <p>El teu missatge s'ha enviat correctament.</p>
      </div>
    );
  }

  return (
    <form
      action="https://formspree.io/f/mrbnkawl"
      method="POST"
      onSubmit={handleSubmit}
      className="space-y-4 font-sans"
    >
      <Input
        type="text"
        name="name"
        placeholder="El teu nom"
        className="bg-background/20 border-white/40 text-white placeholder:text-gray-200"
        aria-label="Nom"
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="El teu correu electrònic"
        className="bg-background/20 border-white/40 text-white placeholder:text-gray-200"
        aria-label="Correu electrònic"
        required
      />
      <Textarea
        name="message"
        placeholder="El teu missatge"
        className="bg-background/20 border-white/40 text-white placeholder:text-gray-200"
        aria-label="Missatge"
        required
        rows={5}
      />
      <Button type="submit" variant="secondary" className="w-full rounded-lg">
        Enviar Missatge
      </Button>
    </form>
  );
}
