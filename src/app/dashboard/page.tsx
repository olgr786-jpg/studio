'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Building, LogOut } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

type UserData = {
  usuari: string;
  empresa: string;
};

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
      <main className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8">
            <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                    Benvingut, {user.usuari}!
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
               <div className="border-t pt-6">
                <Button onClick={handleLogout} variant="outline" className="w-full">
                  <LogOut className="mr-2 h-5 w-5" />
                  Tancar Sessió
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
