import { ContentMain } from "./@components/estructura/ContentMain";
import { Header } from "./@components/estructura/Header";
import SearchSection from "./@components/inicio/SearchSection";
import InnovativeSlider from "./@components/inicio/Slides";
import CardInmueble from "./@components/inmuebles/CardInmueble";

export default function Home() {
  const sampleProperties = [
    {
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop&crop=center",
      price: "S/ 450,000",
      location: "Madrid",
      propertyType: "Apartamento",
      address: "Calle Gran Vía, 28, 28013 Madrid, España",
      isExclusive: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop&crop=center",
      price: "S/ 320,000",
      location: "Barcelona",
      propertyType: "Piso",
      address: "Passeig de Gràcia, 15, 08007 Barcelona, España",
      isExclusive: false,
    },
    {
      image:
        "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop&crop=center",
      price: "S/ 680,000",
      location: "Valencia",
      propertyType: "Casa",
      address: "Avenida del Puerto, 42, 46023 Valencia, España",
      isExclusive: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=300&fit=crop&crop=center",
      price: "S/ 450,000",
      location: "Madrid",
      propertyType: "Apartamento",
      address: "Calle Gran Vía, 28, 28013 Madrid, España",
      isExclusive: true,
    },
    {
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop&crop=center",
      price: "S/ 320,000",
      location: "Barcelona",
      propertyType: "Piso",
      address: "Passeig de Gràcia, 15, 08007 Barcelona, España",
      isExclusive: false,
    },
  ];
  return (
    <>
      <Header />
      <section className="relative">
        <InnovativeSlider />
        <div className="w-full absolute bottom-0 lg:bottom-8 left-0 z-[100]">
          <ContentMain>
            <SearchSection />
          </ContentMain>
        </div>
      </section>
      <section>
        <ContentMain className="grid sm:grid-cols-2 md:grid-cols-4   lg:grid-cols-5 py-12 gap-3">
          {sampleProperties.map((property, index) => (
            <CardInmueble
              key={index}
              image={property.image}
              price={property.price}
              location={property.location}
              propertyType={property.propertyType}
              address={property.address}
              isExclusive={property.isExclusive}
            />
          ))}
        </ContentMain>
      </section>
    </>
  );
}
