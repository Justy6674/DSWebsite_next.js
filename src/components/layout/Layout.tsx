import dynamic from 'next/dynamic';
import { Footer } from "./Footer";

// Dynamic import with SSR disabled - Stack Overflow forum solution for dropdown hydration errors
const Header = dynamic(() => import('./Header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}