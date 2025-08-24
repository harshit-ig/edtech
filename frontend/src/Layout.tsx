import type { ReactNode } from 'react';
import WhatsAppWidget from './components/WhatsAppWidget';
import ContactModal from './components/ContactModal';
import CourseEnrollmentModal from './components/CourseEnrollmentModal';
import ScrollToTop from './components/ScrollToTop';
import { ContactModalProvider, useContactModal } from './contexts/ContactModalContext';
import { CourseEnrollmentModalProvider, useCourseEnrollmentModal } from './contexts/CourseEnrollmentModalContext';
import { PaymentModalProvider } from './contexts/PaymentModalContext';

interface LayoutProps {
  children: ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isOpen, closeModal, title, subtitle } = useContactModal();
  const { 
    isOpen: isEnrollmentOpen, 
    closeModal: closeEnrollmentModal, 
    courseId, 
    courseName, 
    courseCategory, 
    source 
  } = useCourseEnrollmentModal();

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
      <CourseEnrollmentModal 
        isOpen={isEnrollmentOpen}
        onClose={closeEnrollmentModal}
        courseId={courseId}
        courseName={courseName}
        courseCategory={courseCategory}
        source={source}
      />
    </>
  );
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ContactModalProvider>
      <CourseEnrollmentModalProvider>
        <PaymentModalProvider>
          <LayoutContent>{children}</LayoutContent>
        </PaymentModalProvider>
      </CourseEnrollmentModalProvider>
    </ContactModalProvider>
  );
}
