import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, User, Users, Bike } from 'lucide-react';
import { cn } from '@/lib/utils';

const subscriptionPlans = [
  {
    icon: User,
    title: 'Pla Bàsic',
    price: '19.99€/mes',
    description: 'Ideal per a una persona o parelles. Rep setmanalment la teva dosi de frescor.',
    features: [
      '4 packs de 6 ampolles de 0.5L al mes',
      'Lliurament setmanal flexible',
      'Accés a ofertes especials',
    ],
  },
  {
    icon: Users,
    title: 'Pla Familiar',
    price: '39.99€/mes',
    description: 'La solució perfecta per a tota la família. No us quedeu mai sense aigua de qualitat.',
    features: [
      '4 garrafes de 8L al mes',
      'Lliurament mensual programat',
      'Cancel·lació flexible',
      '10% de descompte en compres addicionals',
    ],
    highlighted: true,
  },
  {
    icon: Bike,
    title: 'Pla Actiu',
    price: '24.99€/mes',
    description: 'Per als que no paren quiets. Hidratació sempre a mà per al teu estil de vida.',
    features: [
      '2 packs de 6 ampolles de 0.5L',
      '2 packs de 6 ampolles de 1L',
      'Lliurament quinzenal',
    ],
  },
];

export default function Subscriptions() {
  return (
    <section id="subscripcions" className="bg-transparent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Subscripcions a la teva mida</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Rep Nalu Water a casa teva, sense complicacions. Tria el pla que millor s'adapti a tu i oblida't de carregar ampolles.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {subscriptionPlans.map((plan, index) => (
            <Card key={index} className={cn('flex flex-col transition-transform duration-300 bg-card', plan.highlighted ? 'border-primary shadow-2xl scale-105' : 'shadow-lg hover:scale-105')}>
              <CardHeader className="text-center pt-8">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-max mb-4">
                    <plan.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription className="px-4">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between">
                <div>
                  <div className="text-center mb-6">
                    <span className="text-4xl font-bold">{plan.price.split('/')[0]}</span>
                    <span className="text-muted-foreground">/{plan.price.split('/')[1]}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="p-6">
                <Button className="w-full" variant={plan.highlighted ? 'default' : 'outline'}>
                  Subscriu-te Ara
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
