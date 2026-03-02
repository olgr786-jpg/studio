'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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
  const [isHomePage, setIsHomePage] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // We can't know the pathname on the server, so we check on the client.
    setIsHomePage(window.location.pathname === '/');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled to true if user has scrolled more than 50px
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Call handler once to set initial state
    handleScroll();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Prevent body scroll when the menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-40 w-full print:hidden transition-all duration-300 ease-in-out',
        (scrolled || !isHomePage) ? 'bg-background/95 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Logo className="h-16 flex-shrink-0" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(true)}
          className={cn(
            'hover:text-primary',
             // On the homepage at the top, the icon is white. Otherwise, it's the default foreground color.
            (!scrolled && isHomePage) ? 'text-white hover:bg-white/10' : 'text-foreground'
          )}
        >
          <Menu className="h-8 w-8" />
          <span className="sr-only">Obrir menú</span>
        </Button>
      </div>

      {/* Fullscreen Overlay Menu */}
      <div
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white',
          'transition-opacity duration-300 ease-in-out',
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-5 right-5 h-12 w-12 text-white hover:bg-white/10 hover:text-primary"
          onClick={() => setIsMenuOpen(false)}
        >
          <X className="h-8 w-8" />
          <span className="sr-only">Tancar menú</span>
        </Button>
        
        <nav className="flex flex-col items-center gap-8 text-center">
          <Link
              href={isHomePage ? '/#inici' : '/'}
              className="text-2xl font-light uppercase tracking-widest transition-colors hover:text-primary md:text-3xl"
              onClick={handleLinkClick}
          >
              Inici
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-light uppercase tracking-widest transition-colors hover:text-primary md:text-3xl"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
