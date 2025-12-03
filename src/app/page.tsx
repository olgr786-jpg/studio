import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import WhoWeAre from '@/components/sections/who-we-are';
import Origin from '@/components/sections/origin';
import Blog from '@/components/sections/blog';
import Footer from '@/components/sections/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1 space-y-24 sm:space-y-32">
        <Hero />
        <Products />
        <WhoWeAre />
        <Origin />
        <Blog />
      </main>
      <Footer />
    </div>
  );
}
