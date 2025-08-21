import type { ReactNode } from 'react';
import WhatsAppWidget from './components/WhatsAppWidget';
import ContactModal from './components/ContactModal';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isOpen, closeModal, title, subtitle } = useContactModal();

  return (
    <>
      {children}
      <WhatsAppWidget 
        phoneNumber="+919643274676" // Replace with your actual WhatsApp number
      />
      <ContactModal 
        isOpen={isOpen}
        onClose={closeModal}
        title={title}
        subtitle={subtitle}
      />
    </>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ContactModalProvider>
      <LayoutContent>{children}</LayoutContent>
    </ContactModalProvider>
  );
}
