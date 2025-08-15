import type { ReactNode } from 'react';
import WhatsAppWidget from './components/WhatsAppWidget';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <WhatsAppWidget 
        phoneNumber="+919643274676" // Replace with your actual WhatsApp number
      />
    </>
  );
}
