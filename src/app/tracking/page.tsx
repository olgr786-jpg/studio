'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { PackageSearch, Warehouse, Truck, CheckCircle } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

type ShipmentData = {
  code: string;
  origin: string;
  destination: string;
  eta: string;
  current_location: string;
  status: 'En magatzem' | 'En trànsit' | 'Lliurat';
};

const statusConfig = {
  'En magatzem': { progress: 10, color: 'bg-yellow-500', icon: Warehouse },
  'En trànsit': { progress: 50, color: 'bg-blue-500', icon: Truck },
  'Lliurat': { progress: 100, color: 'bg-green-500', icon: CheckCircle },
};

const API_URL = 'https://sheetdb.io/api/v1/3yz5a4npc7t4c';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!trackingCode.trim()) {
      setError('Si us plau, introdueix un codi de seguiment.');
      return;
    }
    setLoading(true);
    setError(null);
    setShipment(null);

    console.log("Cercant codi:", trackingCode);

    try {
      const response = await fetch(`${API_URL}/search?code=${trackingCode}`);
      if (!response.ok) {
        throw new Error('Error connectant amb el servidor');
      }
      
      const data: ShipmentData[] = await response.json();
      console.log("Dades rebudes:", data);
      
      if (data.length > 0) {
        setShipment(data[0]);
      } else {
        setError('No hem trobat cap enviament amb aquest codi');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Hi ha hagut un problema amb la teva sol·licitud.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentStatus = shipment ? statusConfig[shipment.status] : null;

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                Localitza el teu enviament
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Introdueix el teu codi de seguiment per veure l'estat actual de la teva comanda.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Input
                  type="text"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  placeholder="Ex: NALU123456"
                  className="h-12 text-lg text-center sm:text-left"
                  onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button size="lg" onClick={handleSearch} disabled={loading} className="w-full sm:w-auto">
                  <PackageSearch className="mr-2 h-5 w-5" />
                  {loading ? 'Cercant...' : 'Cercar'}
                </Button>
              </div>
              {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}
            </div>

            {shipment && currentStatus && (
              <div className="mt-16 max-w-4xl mx-auto">
                <Card className="shadow-2xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl sm:text-3xl flex items-center justify-between">
                      <span>Resultats per: {shipment.code}</span>
                       <span className={`flex items-center text-lg font-medium px-3 py-1 rounded-full text-white ${currentStatus.color}`}>
                          <currentStatus.icon className="h-5 w-5 mr-2" />
                          {shipment.status}
                       </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                      <div>
                        <p className="text-sm text-muted-foreground">Origen</p>
                        <p className="font-semibold text-lg">{shipment.origin}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Destí</p>
                        <p className="font-semibold text-lg">{shipment.destination}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data prevista (ETA)</p>
                        <p className="font-semibold text-lg">{shipment.eta}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-3 text-center">Línia de temps de l'enviament</p>
                      <div className="relative pt-8">
                          <Progress value={currentStatus.progress} className={`h-2 ${currentStatus.color}`} />
                          <div className="absolute -top-1 -left-2 w-full flex justify-between px-2">
                              <div className="flex flex-col items-center text-center">
                                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${statusConfig['En magatzem'].progress <= currentStatus.progress ? statusConfig['En magatzem'].color : 'bg-muted'}`}>
                                      <Warehouse className="h-4 w-4 text-white"/>
                                  </div>
                                  <p className="text-xs mt-2">En magatzem</p>
                              </div>
                               <div className="flex flex-col items-center text-center">
                                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${statusConfig['En trànsit'].progress <= currentStatus.progress ? statusConfig['En trànsit'].color : 'bg-muted'}`}>
                                      <Truck className="h-4 w-4 text-white"/>
                                  </div>
                                  <p className="text-xs mt-2">En trànsit</p>
                              </div>
                               <div className="flex flex-col items-center text-center">
                                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${statusConfig['Lliurat'].progress <= currentStatus.progress ? statusConfig['Lliurat'].color : 'bg-muted'}`}>
                                      <CheckCircle className="h-4 w-4 text-white"/>
                                  </div>
                                  <p className="text-xs mt-2">Lliurat</p>
                              </div>
                          </div>
                      </div>
                       <p className="text-center mt-8 text-lg">
                          <span className="text-muted-foreground">Ubicació actual:</span>
                          <strong className="ml-2 font-semibold">{shipment.current_location}</strong>
                      </p>
                    </div>

                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
