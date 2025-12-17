'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { User, Building, LogOut, PackageSearch, Truck, CheckCircle, Warehouse } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

type UserData = {
  usuari: string;
  empresa: string;
  rol: 'Client' | 'Treballador';
};

type ShipmentData = {
  'tracking code': string;
  origen: string;
  destinacio: string;
  'data d\'arribada': string;
  localització: string;
  estat: 'En magatzem' | 'En transit' | 'Lliurat';
};

const statusConfig = {
  'En magatzem': { color: 'text-yellow-500', icon: Warehouse },
  'En transit': { color: 'text-blue-500', icon: Truck },
  'Lliurat': { color: 'text-green-500', icon: CheckCircle },
};

const API_URL = 'https://sheetdb.io/api/v1/3yz5a4npc7t4c';

// Client Dashboard Components
const ClientShipments = ({ empresa }: { empresa: string }) => {
  const [shipments, setShipments] = useState<ShipmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await fetch(`${API_URL}/search?destinacio=${empresa}`);
        if (!response.ok) {
          throw new Error('No s\'han pogut carregar els enviaments.');
        }
        const data = await response.json();
        setShipments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconegut.');
      } finally {
        setLoading(false);
      }
    };
    fetchShipments();
  }, [empresa]);

  return (
    <Card className="shadow-2xl rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl">Els Teus Enviaments</CardTitle>
        <CardDescription>Aquí pots veure l'estat de les teves comandes.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading && <p>Carregant enviaments...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && shipments.length === 0 && <p>No hi ha cap enviament registrat per a la teva empresa.</p>}
        {shipments.length > 0 && (
          <div className="space-y-4">
            {shipments.map((shipment) => {
              const StatusIcon = statusConfig[shipment.estat].icon;
              const statusColor = statusConfig[shipment.estat].color;
              return (
                <div key={shipment['tracking code']} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg">{shipment['tracking code']}</p>
                    <p className="text-sm text-muted-foreground">
                      {shipment.origen} → {shipment.destinacio}
                    </p>
                    <p className="text-sm text-muted-foreground">Arribada: {shipment['data d\'arribada']}</p>
                  </div>
                  <div className={`flex items-center gap-2 font-semibold ${statusColor}`}>
                    <StatusIcon className="h-5 w-5" />
                    <span>{shipment.estat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Worker Dashboard Components
const WorkerPanel = () => (
  <Card className="shadow-2xl rounded-2xl">
    <CardHeader>
      <CardTitle className="text-2xl sm:text-3xl">Panell de Control per a Treballadors</CardTitle>
      <CardDescription>Accedeix a les eines de gestió.</CardDescription>
    </CardHeader>
    <CardContent className="flex flex-col gap-4">
       <p className="text-muted-foreground">
          Com a treballador, tens accés a la visualització de tots els enviaments de l'empresa.
       </p>
      <Button asChild variant="outline">
        <Link href="/tracking">
          <PackageSearch className="mr-2 h-5 w-5" />
          Anar a Seguiment d'Enviaments
        </Link>
      </Button>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUser(JSON.parse(storedData));
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    router.push('/login');
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Carregant...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-12 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
              Benvingut a la teva zona privada, {user.usuari}!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Aquest és el teu panell de control personal.
            </p>
          </div>

          <Card className="shadow-2xl rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl">El Teu Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-lg">
              <div className="flex items-center gap-4">
                <User className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Nom d'usuari</p>
                  <p className="font-semibold">{user.usuari}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Building className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Empresa</p>
                  <p className="font-semibold">{user.empresa}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {user.rol === 'Client' && <ClientShipments empresa={user.empresa} />}
          {user.rol === 'Treballador' && <WorkerPanel />}

          <div className="border-t pt-8 text-center">
            <Button onClick={handleLogout} variant="outline" size="lg">
              <LogOut className="mr-2 h-5 w-5" />
              Sortir
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
