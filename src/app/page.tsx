import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import Products from '@/components/sections/products';
import Origin from '@/components/sections/origin';
import Blog from '@/components/sections/blog';
import Footer from '@/components/sections/footer';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Products />
        <Origin />
        <Blog />
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
}
