'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/#productes', label: 'Productes' },
  { href: '/#qui-som', label: 'Qui Som' },
  { href: '/#blog', label: 'Blog' },
  { href: '/tracking', label: 'Seguiment' },
  { href: '/login', label: 'Login' },
  { href: '/#contacte', label: 'Contacte' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use a different root for the links when not on the homepage
  const [isHomePage, setIsHomePage] = React.useState(false);
  useEffect(() => {
    setIsHomePage(window.location.pathname === '/');
  }, []);


  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 print:hidden',
        'bg-transparent',
        isScrolled ? 'shadow-sm' : ''
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Obrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="md:hidden">
                  <div className='flex justify-between items-center mb-8'>
                      <Logo className="h-12" />
                      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                          <X className="h-6 w-6" />
                      </Button>
                  </div>
                <nav className="flex flex-col gap-10">
                  <Link
                      href={isHomePage ? '/#inici' : '/'}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inici
                    </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={isHomePage ? link.href : `/${link.href}`}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link key={link.href} href={isHomePage ? link.href : `/${link.href}`} className="text-base font-medium transition-colors hover:text-primary text-foreground/80">
                {link.label}
              </Link>
            ))}
          </nav>
        <Logo className="h-16 ml-6 flex-shrink-0" />
      </div>
    </header>
  );
}
