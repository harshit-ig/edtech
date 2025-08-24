
import { Toaster } from 'react-hot-toast';
import useRevealOnScroll from "./hooks/useRevealOnScroll";
import HomePage from "./pages/Home";

export default function App() {
  useRevealOnScroll();
  return (
    <>
      <HomePage />
      <Toaster
        position="top-center"
        containerStyle={{
          top: 20,
          zIndex: 9999,
        }}
        gutter={12}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            zIndex: 9999,
            fontSize: '14px',
            maxWidth: '500px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
            style: {
              background: '#059669',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
            style: {
              background: '#dc2626',
              color: '#fff',
            },
          },
        }}
      />
    </>
  );
}
