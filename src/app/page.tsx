import Header from '@/components/sections/header';
import Hero from '@/components/sections/hero';
import Services from '@/components/sections/services';
import About from '@/components/sections/about';
import Blog from '@/components/sections/blog';
import Footer from '@/components/sections/footer';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-dvh bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Blog />
      </main>
      <Footer currentYear={currentYear} />
    </div>
  );
}
