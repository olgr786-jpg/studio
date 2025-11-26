import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import Origin from '@/components/sections/origin';
import Benefits from '@/components/sections/benefits';
import Subscriptions from '@/components/sections/subscriptions';
import About from '@/components/sections/about';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Products />
        <Origin />
        <Benefits />
        <Subscriptions />
        <About />
      </main>
      <Footer />
    </div>
  );
}
