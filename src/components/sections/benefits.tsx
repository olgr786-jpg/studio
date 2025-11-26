import { Droplets, ShieldCheck, Recycle, Users } from 'lucide-react';

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Minerals Naturals Equilibrats',
    description: 'La nostra aigua conté una barreja perfecta de minerals que contribueixen al teu benestar.',
  },
  {
    icon: Droplets,
    title: 'Gust Suau i Refrescant',
    description: 'Experimenta una puresa excepcional i un sabor lleuger que satisfà la teva set.',
  },
  {
    icon: Recycle,
    title: 'Envàs 100% Reciclable',
    description: 'Compromesos amb el planeta, tots els nostres envasos són completament reciclables.',
  },
  {
    icon: Users,
    title: 'Ideal per a Tota la Família',
    description: 'Una aigua saludable i segura per a totes les edats, des dels més petits fins als més grans.',
  },
];

export default function Benefits() {
  return (
    <section id="beneficis" className="bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pura, Fresca i Saludable</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Descobreix per què AiguaPura és l'elecció perfecta per a tu i els teus.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 bg-background rounded-lg shadow-sm transition-shadow hover:shadow-lg">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
