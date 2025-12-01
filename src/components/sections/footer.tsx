'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ContactForm } from '@/components/contact-form';

export default function Footer({ currentYear }: { currentYear: number }) {
  return (
    <footer id="contacte" className="bg-slate-900 text-gray-200">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-4 space-y-4">
            <Logo className="text-primary-foreground hover:text-primary" />
            <p className="text-gray-400">Aigua pura, fresca i amb essència paradisíaca.</p>
            <div>
              <h3 className="text-lg font-semibold text-primary-foreground mb-2">Dades de Contacte</h3>
              <address className="not-italic text-gray-400 space-y-1">
                <p>Avinguda Tropical, 123, 08000 Paradís</p>
                <p>Email: <a href="mailto:contacte@naluwater.cat" className="hover:text-secondary">contacte@naluwater.cat</a></p>
                <p>Telèfon: <a href="tel:+34930123456" className="hover:text-secondary">+34 930 123 456</a></p>
              </address>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground">Contacta amb Nosaltres</h3>
            <p className="text-gray-400 text-sm">Tens alguna pregunta o vols fer una comanda?</p>
            <ContactForm />
          </div>
          
          <div className="lg:col-span-2 lg:col-start-10 space-y-4">
            <h3 className="text-lg font-semibold text-primary-foreground">Navegació</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#inici" className="text-gray-400 hover:text-secondary transition-colors">Inici</Link>
              <Link href="#productes" className="text-gray-400 hover:text-secondary transition-colors">Productes</Link>
              <Link href="#origen" className="text-gray-400 hover:text-secondary transition-colors">Testimonis</Link>
              <Link href="#blog" className="text-gray-400 hover:text-secondary transition-colors">Blog</Link>
              <Link href="#contacte" className="text-gray-400 hover:text-secondary transition-colors">Contacte</Link>
            </nav>
          </div>

        </div>
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Nalu Water. Tots els drets reservats.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-secondary transition-colors">Avís Legal</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Política de Privacitat</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Política de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
