import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';

export default function Footer() {
  return (
    <footer id="contacte" className="bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <Logo className="text-primary-foreground hover:text-primary" />
            <p className="text-accent">Frescor natural per al teu dia a dia.</p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="text-accent hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-accent hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Facebook" className="text-accent hover:text-primary transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground">Contacta amb Nosaltres</h3>
            <p className="text-accent text-sm">Tens alguna pregunta o suggeriment? Ens encantaria escoltar-te.</p>
            <ContactForm />
          </div>
          
          <div className="lg:col-span-2 lg:col-start-11 space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground">Enllaços</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#inici" className="text-accent hover:text-primary transition-colors">Inici</Link>
              <Link href="#productes" className="text-accent hover:text-primary transition-colors">Productes</Link>
              <Link href="#origen" className="text-accent hover:text-primary transition-colors">Origen</Link>
              <Link href="#subscripcions" className="text-accent hover:text-primary transition-colors">Subscripcions</Link>
              <Link href="#sobre-nosaltres" className="text-accent hover:text-primary transition-colors">Sobre Nosaltres</Link>
            </nav>
          </div>

        </div>
        <div className="mt-12 border-t border-border/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-accent">
          <p>&copy; {new Date().getFullYear()} Nalu Water. Tots els drets reservats.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-primary transition-colors">Política de Privacitat</Link>
            <Link href="#" className="hover:text-primary transition-colors">Termes i Condicions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
