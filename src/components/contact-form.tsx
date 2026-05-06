'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [requestType, setRequestType] = useState('consulta');

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
    }
  };
  
  if (submitted) {
    return (
      <div className="text-center text-primary-foreground p-6 rounded-2xl bg-primary/90 font-sans shadow-lg">
        <h3 className="font-bold text-xl font-headline mb-2">Missatge rebut!</h3>
        <p>Gràcies per contactar amb Nalu Water. Et respondrem el més aviat possible.</p>
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
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-card-foreground/90">Nom Complet</Label>
          <Input
            id="name"
            type="text"
            name="name"
            placeholder="El teu nom"
            required
            className="bg-background/50 placeholder:text-foreground/70 border-border/50"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-card-foreground/90">Correu Electrònic</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="el.teu@correu.com"
            required
            className="bg-background/50 placeholder:text-foreground/70 border-border/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type" className="text-card-foreground/90">Motiu del contacte</Label>
          <Select name="subject" defaultValue="consulta" onValueChange={setRequestType}>
            <SelectTrigger className="bg-background/50 border-border/50">
              <SelectValue placeholder="Selecciona el motiu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consulta">Consulta General</SelectItem>
              <SelectItem value="suggeriment">Suggeriment</SelectItem>
              <SelectItem value="queixa">Queixa</SelectItem>
              <SelectItem value="reclamacio">Reclamació</SelectItem>
              <SelectItem value="comanda">Incidència amb Comanda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-card-foreground/90">Missatge</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Com et podem ajudar?"
            required
            rows={4}
            className="bg-background/50 placeholder:text-foreground/70 border-border/50"
          />
        </div>
      </div>
      
      <Button type="submit" variant="secondary" className="w-full rounded-lg h-12 text-lg font-medium shadow-md hover:shadow-lg transition-all">
        Enviar Petició
      </Button>
      <p className="text-[10px] text-card-foreground/60 text-center">
        En enviar aquest formulari, acceptes la nostra política de privacitat i el tractament de dades per a la gestió de la teva petició.
      </p>
    </form>
  );
}
