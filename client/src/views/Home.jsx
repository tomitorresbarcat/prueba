import PromoBar from "../components/PromoBar";
import HeroCarousel from "../components/HeroCarousel";
import BrandsStrip from "../components/BrandsStrip";

function Home() {
  const slides = [
    { src: "/img/hero1.jpg", alt: "Promo 1" },
    { src: "/img/hero2.jpg", alt: "Promo 2" },
    { src: "/img/hero3.jpg", alt: "Promo 3" },
  ];

  const brands = [
    { src: "/img/brand-bonafide.png", alt: "Bonafide" },
    { src: "/img/brand-cachafaz.png", alt: "Cachafaz" },
    { src: "/img/brand-rasta.png", alt: "Rasta" },
    { src: "/img/brand-vauquita.png", alt: "Vauquita" },
  ];

  return (
    <>
      <main className="container" style={{ paddingTop: 16 }}>
        <HeroCarousel slides={slides} height={380} />

        <BrandsStrip title="Nuestras marcas" items={brands} />
      </main>
    </>
  );
}
export default Home;