import { Footer } from "../_components/estructura/Footer";
import { Header } from "../_components/estructura/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
