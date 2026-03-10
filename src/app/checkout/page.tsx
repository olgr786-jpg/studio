'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { Logo } from '@/components/logo';
import { Printer, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

// Define UserSession type
type UserSession = {
  usuari: string;
  empresa: string;
  rol: 'Client' | 'Treballador';
};

const API_URL = 'https://sheetdb.io/api/v1/3yz5a4npc7t4c';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState('');
  const [user, setUser] = useState<UserSession | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If cart is empty after hydration, redirect to home.
    if (cartItems.length === 0) {
      router.replace('/');
    }
    setCurrentDate(new Date().toLocaleDateString('ca-ES'));

    // Get user from localStorage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, [cartItems, router]);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="font-sans">La teva cistella és buida. Redirigint...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const taxRate = 0.21;
  const subtotal = cartTotal;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  const handleConfirmPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
        toast({
            variant: "destructive",
            title: "Inici de sessió necessari",
            description: "Per poder generar una factura, has d'iniciar sessió.",
        });
        router.push('/login');
        return;
    }

    setIsSubmitting(true);

    const invoiceNumber = `F-${Date.now()}`;
    const today = new Date().toISOString();

    const invoiceItems = cartItems.map(item => ({
        num_factura: invoiceNumber,
        data: today,
        usuari: user.usuari,
        fpagament: 'Targeta (Simulació)',
        concepte: item.name,
        preu_unitari: item.price.toString(),
        unitats: item.quantity.toString(),
        iva: '21',
        dte: '0',
        albara: `A-${Date.now() + Math.random()}`
    }));
    
    try {
        const response = await fetch(`${API_URL}?sheet=documents`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: invoiceItems })
        });

        if (!response.ok) {
            throw new Error('No s\'ha pogut generar la factura.');
        }

        toast({
            title: "Compra realitzada amb èxit!",
            description: "La teva factura s'ha generat i està disponible a la secció de documents.",
        });
        clearCart();
        router.push('/documents');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Hi ha hagut un error inesperat.';
        toast({
            variant: "destructive",
            title: "Uh oh! Alguna cosa ha anat malament.",
            description: errorMessage,
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="print:hidden">
        <Header />
      </div>
      <main className="py-12 px-4 sm:px-6 lg:px-8 bg-background print:bg-white print:p-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8 print:hidden">
              <Button variant="outline" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tornar
              </Button>
              <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir Tiquet
              </Button>
          </div>

          <div id="zona-tiquet" className="bg-white p-8 rounded-2xl shadow-2xl border print:shadow-none print:border-none print:rounded-none">
            <header className="flex justify-between items-start pb-8 border-b">
              <div className="w-1/2">
                 <Logo className="h-16" />
                 <div className="mt-4 text-xs text-gray-600">
                  <p className="font-bold text-gray-800">Nalu Water</p>
                  <p>Carrer de la Puresa, 123</p>
                  <p>08000 Paradís</p>
                  <p>B12345678</p>
                 </div>
              </div>
              <div className="w-1/2 text-right">
                <h1 className="text-4xl font-bold text-gray-800 font-headline">Resum Compra</h1>
                <p className="text-gray-500 mt-2">Data: <span className="font-semibold text-gray-800">{currentDate}</span></p>
              </div>
            </header>
            
            <section className="my-8">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 print:bg-gray-50">
                    <TableHead className="w-1/2 text-gray-600">Producte</TableHead>
                    <TableHead className="text-right text-gray-600">Preu</TableHead>
                    <TableHead className="text-right text-gray-600">Quantitat</TableHead>
                    <TableHead className="text-right text-gray-600">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id} className="text-gray-800">
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{item.price.toFixed(2)}€</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right font-semibold">{(item.price * item.quantity).toFixed(2)}€</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
            
            <Separator className="my-8" />

            <section className="flex justify-end text-gray-800">
              <div className="w-full max-w-sm space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{subtotal.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IVA (21%):</span>
                  <span className="font-semibold">{taxAmount.toFixed(2)}€</span>
                </div>
                <Separator />
                <div className="flex justify-between text-2xl font-bold">
                  <span>TOTAL:</span>
                  <span>{total.toFixed(2)}€</span>
                </div>
              </div>
            </section>

            <Separator className="my-8 print:hidden" />
            
            <form onSubmit={handleConfirmPurchase} className="print:hidden">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Dades de Lliurament</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-700">Nom i Cognoms</Label>
                        <Input id="name" placeholder="El teu nom" required className="bg-gray-50 border-gray-300 text-gray-900" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-700">Telèfon</Label>
                        <Input id="phone" type="tel" placeholder="El teu telèfon" required className="bg-gray-50 border-gray-300 text-gray-900" />
                    </div>
                     <div className="col-span-1 md:col-span-2 space-y-2">
                        <Label htmlFor="address" className="text-gray-700">Adreça</Label>
                        <Input id="address" placeholder="Carrer, número, pis" required className="bg-gray-50 border-gray-300 text-gray-900" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-700">Ciutat</Label>
                        <Input id="city" placeholder="La teva ciutat" required className="bg-gray-50 border-gray-300 text-gray-900" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="zip" className="text-gray-700">Codi Postal</Label>
                        <Input id="zip" placeholder="08000" required className="bg-gray-50 border-gray-300 text-gray-900" />
                    </div>
                </div>
                 {!user && (
                    <p className="mt-4 text-sm text-amber-600 font-sans">
                        Recorda iniciar sessió per poder guardar i consultar la teva factura més tard.
                    </p>
                )}
                <Button type="submit" size="lg" className="w-full mt-8 font-sans" disabled={isSubmitting}>
                   {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processant...
                    </>
                  ) : (
                    'Confirmar i Pagar'
                  )}
                </Button>
            </form>

             <footer className="mt-12 pt-6 border-t text-center text-xs text-gray-500">
                <p>Gràcies per la teva compra!</p>
             </footer>

          </div>
        </div>
      </main>
      <div className="print:hidden">
          <Footer />
      </div>
    </>
  );
}
