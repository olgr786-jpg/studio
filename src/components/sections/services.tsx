'use client'

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Truck, Ship, Plane } from 'lucide-react';

const services = [
  { 
    id: 's1', 
    name: 'Transport Terrestre', 
    description: 'Solucions de càrrega completa (FTL) i grupaje (LTL) a tota Europa amb seguiment en temps real.', 
    imageId: 'service-trucks',
    icon: Truck,
  },
  { 
    id: 's2', 
    name: 'Transport Marítim', 
    description: 'Gestionem els teus contenidors FCL i LCL a nivell mundial amb les principals navilieres.', 
    imageId: 'hero-container-ship',
    icon: Ship,
  },
  { 
    id: 's3', 
    name: 'Transport Aeri', 
    description: 'La solució més ràpida per a les teves mercaderies urgents i de gran valor.', 
    imageId: 'service-air-cargo',
    icon: Plane,
  },
];

export default function Services() {

  return (
    <section id="serveis" className="bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2>Els Nostres Serveis Logístics</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Oferim una gamma completa de serveis per cobrir totes les teves necessitats de transport i logística.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const serviceImage = PlaceHolderImages.find(img => img.id === service.imageId);
            return (
              <Card key={service.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl bg-card">
                <CardHeader className="p-0">
                  {serviceImage && (
                    <div className="aspect-video relative">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    </div>
                  )}
                </CardHeader>
                <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center gap-4 mb-4">
                        <service.icon className="h-8 w-8 text-primary" />
                        <CardTitle className="m-0">{service.name}</CardTitle>
                    </div>
                    <p className="text-muted-foreground mt-2 flex-grow">{service.description}</p>
                </div>
                <CardFooter>
                  <Button variant="link" className="px-0 group">
                    Saber-ne més <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
