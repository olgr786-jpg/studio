'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ContactForm } from '@/components/contact-form';

export default function Footer() {

  return (
    <footer id="contacte" className="bg-card text-card-foreground print:hidden">
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground font-headline">Navegació</h3>
            <nav className="flex flex-col space-y-4 font-sans">
              <Link href="/#inici" className="text-card-foreground/80 hover:text-primary transition-colors">Inici</Link>
              <Link href="/#productes" className="text-card-foreground/80 hover:text-primary transition-colors">Productes</Link>
              <Link href="/#qui-som" className="text-card-foreground/80 hover:text-primary transition-colors">Qui Som</Link>
              <Link href="/#blog" className="text-card-foreground/80 hover:text-primary transition-colors">Blog</Link>
              <div className="pt-2 flex flex-col space-y-4 border-t border-border/30">
                <Link href="/tracking" className="text-card-foreground/80 hover:text-primary transition-colors">Seguiment d'Enviaments</Link>
                <Link href="/booking" className="text-card-foreground/80 hover:text-primary transition-colors">Reserva de Serveis</Link>
                <Link href="/documents" className="text-card-foreground/80 hover:text-primary transition-colors">Àrea de Clients</Link>
              </div>
            </nav>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4 font-headline uppercase tracking-wider">Atenció al Client</h3>
              <p className="text-card-foreground/80 font-sans mb-6">
                El nostre equip d'atenció està a la teva disposició per a qualsevol dubte, suggeriment o incidència.
              </p>
              <address className="not-italic text-card-foreground/80 space-y-3 font-sans">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase text-primary mb-1">Direcció</span>
                  <p>Carrer de la Puresa, 123, 08000 Paradís</p>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="text-xs font-bold uppercase text-primary mb-1">Email</span>
                  <p><a href="mailto:contacte@naluwater.cat" className="hover:text-primary">contacte@naluwater.cat</a></p>
                </div>
                <div className="flex flex-col pt-2">
                  <span className="text-xs font-bold uppercase text-primary mb-1">Telèfon Directe</span>
                  <p><a href="tel:+34930123456" className="hover:text-primary">+34 930 123 456</a></p>
                </div>
              </address>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4 bg-background/20 p-6 rounded-2xl border border-border/30">
            <h3 className="text-xl font-semibold text-card-foreground font-headline">Suggeriments i Reclamacions</h3>
            <p className="text-card-foreground/80 font-sans text-sm">
              Fes-nos arribar la teva opinió. El teu feedback ens ajuda a millorar la puresa del nostre servei.
            </p>
            <ContactForm />
          </div>
          
        </div>
        <div className="mt-16 border-t border-border pt-8 text-sm text-card-foreground/60 font-sans">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                 <p className="text-center">&copy; 2024 NaluWater.cat. Tots els drets reservats.</p>
                <div className="flex space-x-6">
                    <Link href="#" className="hover:text-primary transition-colors">Avís Legal</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Privacitat</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Cookies</Link>
                </div>
            </div>
        </div>
        <div className="flex justify-center pt-12">
            <Logo className="h-14 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"/>
        </div>
      </div>
    </footer>
  );
}
