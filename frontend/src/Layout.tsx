import type { ReactNode } from 'react';
import WhatsAppWidget from './components/WhatsAppWidget';
import ContactModal from './components/ContactModal';
import ScrollToTop from './components/ScrollToTop';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isOpen, closeModal, title, subtitle } = useContactModal();

  return (
    <>
      <ScrollToTop />
      {children}
      <WhatsAppWidget
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
