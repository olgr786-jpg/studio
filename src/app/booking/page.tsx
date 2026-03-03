'use client';

import { useState, useEffect, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Loader2, Send, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Define types for user session and booking request
type UserSession = {
  usuari: string;
};

type BookingRequest = {
  id: string;
  data: string;
  usuari: string;
  estat: 'Pendent' | 'Aprovat' | 'Rebutjat';
  detalls: string;
};

const API_URL = 'https://sheetdb.io/api/v1/3yz5a4npc7t4c?sheet=solicituds';

export default function BookingPage() {
  const router = useRouter();
  const { toast } = useToast();

  // User session and data states
  const [user, setUser] = useState<UserSession | null>(null);
  const [requests, setRequests] = useState<BookingRequest[]>([]);

  // Form state
  const [serviceType, setServiceType] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loadDetails, setLoadDetails] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(true); // For initial page load
  const [submitting, setSubmitting] = useState(false); // For form submission
  const [error, setError] = useState<string | null>(null); // For fetching data
  const [formError, setFormError] = useState<string | null>(null); // For form validation/submission

  // Check for user session on mount
  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      setUser(userData);
    } else {
      router.push('/login');
    }
  }, [router]);

  // Fetch user's booking requests
  const fetchRequests = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}&usuari=${username}`);
      if (!response.ok) {
        throw new Error('No s\'han pogut carregar les sol·licituds.');
      }
      const data: BookingRequest[] = await response.json();
      setRequests(data.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconegut.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when user is available
  useEffect(() => {
    if (user?.usuari) {
      fetchRequests(user.usuari);
    }
  }, [user]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!serviceType || !origin || !destination || !loadDetails) {
        setFormError('Si us plau, omple tots els camps del formulari.');
        return;
    }
    setSubmitting(true);
    setFormError(null);

    const newRequest = {
        id: `BK-${Math.floor(Math.random() * 90000) + 10000}`,
        data: new Date().toISOString().split('T')[0], // YYYY-MM-DD
        usuari: user?.usuari,
        estat: 'Pendent' as 'Pendent',
        detalls: `Servei: ${serviceType} | Origen: ${origin} | Destí: ${destination} | Càrrega: ${loadDetails}`
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [newRequest]
            })
        });

        if (!response.ok) {
            throw new Error('No s\'ha pogut enviar la sol·licitud.');
        }

        toast({
            title: "Sol·licitud enviada!",
            description: "La teva sol·licitud s'ha registrat correctament.",
        });

        // Add to list and reset form
        setRequests(prev => [newRequest, ...prev]);
        setServiceType('');
        setOrigin('');
        setDestination('');
        setLoadDetails('');

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ha ocorregut un error inesperat.';
        setFormError(errorMessage);
    } finally {
        setSubmitting(false);
    }
  };

  const getStatusClasses = (status: BookingRequest['estat']) => {
    switch (status) {
      case 'Aprovat':
        return 'bg-green-500/20 text-green-500 border-green-500/50';
      case 'Pendent':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      case 'Rebutjat':
        return 'bg-red-500/20 text-red-500 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-500 border-gray-500/50';
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col min-h-dvh bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 py-24 sm:py-32">
        <div className="container mx-auto max-w-4xl space-y-16">
          
          <section>
             <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl font-headline">
                Nova Sol·licitud de Comanda
              </h1>
              <p className="mt-4 text-lg text-muted-foreground font-sans">
                Omple el formulari per registrar una nova comanda de transport o magatzem.
              </p>
            </div>

            <Card className="shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle>Dades de la Sol·licitud</CardTitle>
                <CardDescription>Especifica els detalls de la teva comanda.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Tipus de Servei</Label>
                    <Select value={serviceType} onValueChange={setServiceType} required>
                      <SelectTrigger id="serviceType" className="h-12 text-lg font-sans">
                        <SelectValue placeholder="Selecciona un servei" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Transport Marítim">Transport Marítim</SelectItem>
                        <SelectItem value="Transport Aeri">Transport Aeri</SelectItem>
                        <SelectItem value="Transport Terrestre">Transport Terrestre</SelectItem>
                        <SelectItem value="Magatzem">Servei de Magatzem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="origin">Origen</Label>
                      <Input id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Ciutat o port d'origen" required className="h-12 text-lg font-sans" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destí</Label>
                      <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Ciutat o port de destí" required className="h-12 text-lg font-sans" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="loadDetails">Detalls de la Càrrega</Label>
                    <Textarea id="loadDetails" value={loadDetails} onChange={(e) => setLoadDetails(e.target.value)} placeholder="Descriu la càrrega, pes, dimensions, etc." rows={4} required className="text-lg font-sans" />
                  </div>

                  {formError && (
                    <div className="font-sans flex items-center gap-x-2 rounded-md border border-red-500/50 bg-red-500/10 p-3 text-sm font-medium text-red-500">
                      <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                      {formError}
                    </div>
                  )}
                  
                  <Button type="submit" size="lg" disabled={submitting} className="w-full font-sans">
                    {submitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="mr-2 h-5 w-5" />}
                    {submitting ? 'Enviant...' : 'Enviar Sol·licitud'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </section>

          <Separator />
          
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Les Meves Sol·licituds
              </h2>
              <p className="mt-4 text-lg text-muted-foreground font-sans">
                Historial de totes les teves comandes registrades.
              </p>
            </div>
            
            {loading ? (
               <div className="flex items-center justify-center gap-2">
                 <Loader2 className="h-6 w-6 animate-spin" />
                 <p className="font-sans text-lg">Carregant historial...</p>
               </div>
            ) : error ? (
                <p className="text-center text-red-500 font-sans">{error}</p>
            ) : requests.length > 0 ? (
              <div className="space-y-6">
                {requests.map(req => (
                  <Card key={req.id} className="shadow-lg rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>Sol·licitud #{req.id}</span>
                        <Badge variant="outline" className={cn("text-sm", getStatusClasses(req.estat))}>
                          {req.estat}
                        </Badge>
                      </CardTitle>
                      <CardDescription>Data: {new Date(req.data).toLocaleDateString('ca-ES')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground font-sans whitespace-pre-wrap">{req.detalls.replace(/ \| /g, '\n')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground font-sans">
                Encara no has registrat cap sol·licitud.
              </p>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
