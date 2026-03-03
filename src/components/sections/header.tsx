'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { CartDrawer } from '@/components/cart-drawer';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/#productes', label: 'Productes' },
  { href: '/#qui-som', label: 'Qui Som' },
  { href: '/tracking', label: 'Seguiment' },
  { href: '/booking', label: 'Booking' },
  { href: '/login', label: 'Login' },
  { href: '/#contacte', label: 'Contacte' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 z-40 w-full print:hidden transition-colors duration-300 ease-in-out',
          isHomePage ? 'bg-transparent' : 'bg-black shadow-md'
        )}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Logo className="h-14 flex-shrink-0" />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:bg-white/10 hover:text-primary"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Obrir cistella</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className={cn(
                'text-white hover:bg-white/10 hover:text-primary'
              )}
            >
              <Menu className="h-8 w-8" />
              <span className="sr-only">Obrir menú</span>
            </Button>
          </div>
        </div>
      </header>
      
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
              className="text-xl font-light uppercase tracking-widest transition-colors hover:text-primary"
              onClick={handleLinkClick}
          >
              Inici
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xl font-light uppercase tracking-widest transition-colors hover:text-primary"
              onClick={handleLinkClick}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </nav>
      </div>

      <CartDrawer />
    </>
  );
}
