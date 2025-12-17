'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LogIn, AlertTriangle } from 'lucide-react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

const API_URL = 'https://sheetdb.io/api/v1/3yz5a4npc7t4c';

export default function LoginPage() {
  const [usuari, setUsuari] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuari || !password) {
      setError('Si us plau, omple tots els camps.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/search?usuari=${usuari}&password=${password}&sheet=usuaris`);

      if (!response.ok) {
        throw new Error('Error connectant amb el servidor. Intenta-ho més tard.');
      }

      const data = await response.json();

      if (data.length > 0) {
        const userData = data[0];
        localStorage.setItem('userData', JSON.stringify({ 
          usuari: userData.usuari, 
          empresa: userData.empresa,
          rol: userData.rol 
        }));
        router.push('/dashboard');
      } else {
        setError('Dades incorrectes. Comprova el teu usuari i contrasenya.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ha ocorregut un error inesperat.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <Card className="shadow-2xl rounded-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold tracking-tight font-headline">Accés d'Usuaris</CardTitle>
              <CardDescription>Introdueix les teves credencials per continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Input
                    id="usuari"
                    name="usuari"
                    type="text"
                    autoComplete="username"
                    required
                    value={usuari}
                    onChange={(e) => setUsuari(e.target.value)}
                    placeholder="El teu usuari"
                    className="h-12 text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="La teva contrasenya"
                    className="h-12 text-lg"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-x-2 rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm font-medium text-red-500">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    {error}
                  </div>
                )}

                <div>
                  <Button type="submit" size="lg" disabled={loading} className="w-full">
                    <LogIn className="mr-2 h-5 w-5" />
                    {loading ? 'Entrant...' : 'Entrar'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
