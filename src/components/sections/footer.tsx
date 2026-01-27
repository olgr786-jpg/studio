'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ContactForm } from '@/components/contact-form';

export default function Footer() {

  return (
    <footer id="contacte" className="bg-card text-card-foreground print:hidden">
      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-3 font-headline">Dades de Contacte</h3>
              <address className="not-italic text-card-foreground/80 space-y-2 font-sans">
                <p>Carrer de la Puresa, 123, 08000 Paradís</p>
                <p>Email: <a href="mailto:contacte@naluwater.cat" className="hover:text-primary">contacte@naluwater.cat</a></p>
                <p>Telèfon: <a href="tel:+34930123456" className="hover:text-primary">+34 930 123 456</a></p>
              </address>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground font-headline">Contacta amb Nosaltres</h3>
            <p className="text-card-foreground/80 font-sans">Tens alguna pregunta o vols fer una comanda especial?</p>
            <ContactForm />
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground font-headline">Navegació</h3>
            <nav className="flex flex-col space-y-2 font-sans">
              <Link href="#inici" className="text-card-foreground/80 hover:text-primary transition-colors">Inici</Link>
              <Link href="#productes" className="text-card-foreground/80 hover:text-primary transition-colors">Productes</Link>
              <Link href="#qui-som" className="text-card-foreground/80 hover:text-primary transition-colors">Qui Som</Link>
              <Link href="#blog" className="text-card-foreground/80 hover:text-primary transition-colors">Blog</Link>
              <div className="pt-2 space-y-2">
                <Link href="/tracking" className="block text-card-foreground/80 hover:text-primary transition-colors">Seguiment</Link>
                <Link href="/documents" className="block text-card-foreground/80 hover:text-primary transition-colors">Factures</Link>
                <Link href="/login" className="block text-card-foreground/80 hover:text-primary transition-colors">Login</Link>
              </div>
              <Link href="#contacte" className="text-card-foreground/80 hover:text-primary transition-colors">Contacte</Link>
            </nav>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Logo />
            <p className="text-card-foreground/80 font-sans">Aigua pura amb essència d’illa.</p>
          </div>

        </div>
        <div className="mt-16 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-card-foreground/60 font-sans">
          <p>&copy; 2024 NaluWater.cat. Tots els drets reservats.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Avís Legal</Link>
            <Link href="#" className="hover:text-primary transition-colors">Política de Privacitat</Link>
            <Link href="#" className="hover:text-primary transition-colors">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
