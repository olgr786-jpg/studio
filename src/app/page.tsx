import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import WhoWeAre from '@/components/sections/who-we-are';
import Blog from '@/components/sections/blog';
import Footer from '@/components/sections/footer';
import { Toaster } from '@/components/ui/toaster';


export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 space-y-40 sm:space-y-48">
        <Hero />
        <Products />
        <WhoWeAre />
        <Blog />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
