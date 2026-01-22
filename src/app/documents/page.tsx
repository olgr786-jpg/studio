'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Printer, ArrowLeft, Loader2 } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { Logo } from '@/components/logo';

// --- Tipus de dades ---
type UserSession = {
  usuari: string;
  empresa: string;
  rol: 'Client' | 'Treballador';
};

type DocumentData = {
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
};

type UserFiscalData = {
  usuari: string;
  rol: string;
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
};

type InvoiceItem = {
  concept: string;
  unitPrice: number;
  units: number;
  discount: number;
  iva: number;
  netTotal: number;
};

type IvaBreakdown = {
  [rate: string]: {
    base: number;
    amount: number;
  };
};

type Invoice = {
  invoiceNumber: string;
  date: string;
  paymentMethod: string;
  clientData: UserFiscalData;
  items: InvoiceItem[];
  subtotal: number;
  ivaBreakdown: IvaBreakdown;
  total: number;
};

const API_URL = 'https://sheetdb.io/api/v1/3yz5a4npc7t4c';

export default function DocumentsPage() {
  const [user, setUser] = useState<UserSession | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      setUser(userData);
    } else {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [docsRes, usersRes] = await Promise.all([
          fetch(`${API_URL}?sheet=documents`),
          fetch(`${API_URL}?sheet=usuaris`),
        ]);

        if (!docsRes.ok || !usersRes.ok) {
          throw new Error('No s\'han pogut carregar les dades.');
        }

        const allDocs: DocumentData[] = await docsRes.json();
        const allUsers: UserFiscalData[] = await usersRes.json();

        const isWorker = user.rol === 'Treballador';
        const userDocs = isWorker
          ? allDocs
          : allDocs.filter((doc) => doc.usuari === user.usuari);

        // Agrupem els documents per número de factura
        const groupedByInvoiceNumber = userDocs.reduce((acc, doc) => {
          if(doc.num_factura) {
            (acc[doc.num_factura] = acc[doc.num_factura] || []).push(doc);
          }
          return acc;
        }, {} as { [key: string]: DocumentData[] });

        const processedInvoices: Invoice[] = Object.values(groupedByInvoiceNumber).map(
          (docGroup) => {
            const firstDoc = docGroup[0];
            const clientData = allUsers.find(u => u.usuari === firstDoc.usuari) || {} as UserFiscalData;

            let subtotal = 0;
            const ivaBreakdown: IvaBreakdown = {};

            const items: InvoiceItem[] = docGroup.map((doc) => {
              const unitPrice = parseFloat(doc.preu_unitari) || 0;
              const units = parseInt(doc.unitats, 10) || 0;
              const discount = parseFloat(doc.dte) || 0;
              const iva = parseInt(doc.iva, 10) || 0;

              const lineTotal = unitPrice * units;
              const discountAmount = lineTotal * (discount / 100);
              const netTotal = lineTotal - discountAmount;
              subtotal += netTotal;

              const ivaRateStr = iva.toString();
              if (!ivaBreakdown[ivaRateStr]) {
                ivaBreakdown[ivaRateStr] = { base: 0, amount: 0 };
              }
              ivaBreakdown[ivaRateStr].base += netTotal;

              return { concept: doc.concepte, unitPrice, units, discount, iva, netTotal };
            });

            let totalIvaAmount = 0;
            for (const rate in ivaBreakdown) {
              const ivaAmount = ivaBreakdown[rate].base * (parseInt(rate, 10) / 100);
              ivaBreakdown[rate].amount = ivaAmount;
              totalIvaAmount += ivaAmount;
            }

            const total = subtotal + totalIvaAmount;

            return {
              invoiceNumber: firstDoc.num_factura,
              date: firstDoc.data,
              paymentMethod: firstDoc.fpagament,
              clientData,
              items,
              subtotal,
              ivaBreakdown,
              total,
            };
          }
        );
        
        setInvoices(processedInvoices.sort((a, b) => b.invoiceNumber.localeCompare(a.invoiceNumber)));

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconegut.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="font-sans">Redirigint a l'inici de sessió...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <p className="font-sans text-lg">Carregant factures...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-red-500 font-sans">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Vista Detall de la Factura
  if (selectedInvoice) {
    return (
      <>
        {/* Capçalera i controls només visibles en pantalla */}
        <div className="print:hidden bg-background">
            <Header />
        </div>
        <main className="py-12 px-4 sm:px-6 lg:px-8 bg-background print:bg-white print:p-0">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8 print:hidden">
              <Button variant="outline" onClick={() => setSelectedInvoice(null)}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Tornar al llistat
              </Button>
              <Button onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Imprimir PDF
              </Button>
            </div>
            
            {/* --- Contingut Imprimible --- */}
            <div id="zona-factura" className="bg-white p-8 rounded-2xl shadow-2xl border print:shadow-none print:border-none print:rounded-none">
              <header className="flex justify-between items-start pb-8 border-b">
                <div className="w-1/2">
                   <Logo />
                   <div className="mt-4 text-xs text-gray-600">
                    <p className="font-bold">Nalu Water</p>
                    <p>Carrer de la Puresa, 123</p>
                    <p>08000 Paradís</p>
                    <p>B12345678</p>
                   </div>
                </div>
                <div className="w-1/2 text-right">
                  <h1 className="text-4xl font-bold text-primary-foreground font-headline">Factura</h1>
                  <p className="text-gray-500 mt-2">Número: <span className="font-semibold text-gray-800">{selectedInvoice.invoiceNumber}</span></p>
                  <p className="text-gray-500">Data: <span className="font-semibold text-gray-800">{new Date(selectedInvoice.date).toLocaleDateString('ca-ES')}</span></p>
                </div>
              </header>

              <section className="grid grid-cols-2 gap-8 my-8">
                 <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Facturat a:</h2>
                    <p className="font-bold text-lg mt-1">{selectedInvoice.clientData?.empresa}</p>
                    <p className="text-gray-600">{selectedInvoice.clientData?.adreca}</p>
                    <p className="text-gray-600">{selectedInvoice.clientData?.fiscalid}</p>
                    <p className="text-gray-600">{selectedInvoice.clientData?.telefon}</p>
                 </div>
              </section>

              <section>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 print:bg-gray-50">
                      <TableHead className="w-1/2">Concepte</TableHead>
                      <TableHead className="text-right">Preu</TableHead>
                      <TableHead className="text-right">Unitats</TableHead>
                      <TableHead className="text-right">Dte.</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedInvoice.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.concept}</TableCell>
                        <TableCell className="text-right">{item.unitPrice.toFixed(2)}€</TableCell>
                        <TableCell className="text-right">{item.units}</TableCell>
                        <TableCell className="text-right">{item.discount > 0 ? `${item.discount.toFixed(2)}%` : '-'}</TableCell>
                        <TableCell className="text-right font-semibold">{item.netTotal.toFixed(2)}€</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </section>
              
              <Separator className="my-8" />

              <section className="flex justify-end">
                <div className="w-full max-w-sm space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Imposable:</span>
                    <span className="font-semibold">{selectedInvoice.subtotal.toFixed(2)}€</span>
                  </div>
                  {Object.entries(selectedInvoice.ivaBreakdown).map(([rate, values]) => (
                     <div key={rate} className="flex justify-between items-center">
                        <span className="text-gray-600">IVA ({rate}% sobre {values.base.toFixed(2)}€):</span>
                        <span className="font-semibold">{values.amount.toFixed(2)}€</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between text-2xl font-bold text-primary-foreground">
                    <span>TOTAL:</span>
                    <span>{selectedInvoice.total.toFixed(2)}€</span>
                  </div>
                </div>
              </section>

              <Separator className="my-8"/>

              <section className="text-sm text-gray-600 space-y-2">
                 <p><span className='font-semibold'>Forma de Pagament:</span> {selectedInvoice.paymentMethod}</p>
              </section>

              <footer className="mt-12 pt-6 border-t text-center text-xs text-gray-500">
                <p>Nalu Water | Inscrita al Registre Mercantil de Barcelona, Tom 1234, Foli 56, Full B-78901.</p>
                <p>En compliment del RGPD, les seves dades són tractades per a la gestió administrativa i comercial. Pot exercir els seus drets a contacte@naluwater.cat.</p>
              </footer>
            </div>
          </div>
        </main>
        {/* Peu de pàgina només visible en pantalla */}
        <div className="print:hidden">
            <Footer />
        </div>
      </>
    );
  }

  // Vista Llistat de Factures
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
              Les Teves Factures
            </h1>
            <p className="mt-4 text-lg text-muted-foreground font-sans">
              Aquí pots consultar i descarregar totes les teves factures.
            </p>
          </div>
          {invoices.length > 0 ? (
            <div className="space-y-6">
              {invoices.map((invoice) => (
                <Card key={invoice.invoiceNumber} className="shadow-lg rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Factura #{invoice.invoiceNumber}</span>
                      <span className="text-lg font-medium text-primary">{invoice.total.toFixed(2)}€</span>
                    </CardTitle>
                     <CardDescription>Data: {new Date(invoice.date).toLocaleDateString('ca-ES')}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-end">
                    <Button onClick={() => setSelectedInvoice(invoice)}>
                      Veure Detalls i Imprimir
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-sans">No s'han trobat factures.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
