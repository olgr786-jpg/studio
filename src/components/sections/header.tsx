'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#inici', label: 'Inici' },
  { href: '#productes', label: 'Productes' },
  { href: '#origen', label: 'Origen' },
  { href: '#subscripcions', label: 'Subscripcions' },
  { href: '#sobre-nosaltres', label: 'Sobre Nosaltres' },
  { href: '#contacte', label: 'Contacte' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-background/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-6">
        <Logo className="mr-6" />
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative rounded-full transition-colors hover:bg-primary/10">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Obrir carretó</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>El Teu Carretó</SheetTitle>
              </SheetHeader>
              <div className="mt-8">
                <p className="text-center text-muted-foreground">El teu carretó està buit.</p>
              </div>
            </SheetContent>
          </Sheet>
          <Button className="hidden md:inline-flex shadow-sm hover:shadow-lg transition-shadow">Comprar Ara</Button>
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Obrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="md:hidden">
                <div className='flex justify-between items-center mb-8'>
                    <Logo />
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button className="mt-4 shadow-sm">Comprar Ara</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
