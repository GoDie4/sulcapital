import { ContentSistema } from "./_components/ContentSistema";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContentSistema>{children}</ContentSistema>
    </>
  );
}
