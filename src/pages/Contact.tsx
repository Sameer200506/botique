import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

const Contact = () => {
  const whatsappNumber = "+919247888626"; // Replace with your actual WhatsApp number
  const whatsappMessage = "Hello! I'm interested in your products."; // Pre-filled message

  const handleWhatsAppRedirect = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-foreground mb-4">Get in Touch via WhatsApp</h1>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
        For quick inquiries, styling advice, or any questions about our collection, connect with us directly on WhatsApp!
      </p>
      <Button 
        onClick={handleWhatsAppRedirect}
        className="bg-gradient-hero hover:shadow-glow transition-all duration-300 text-lg px-8 py-6"
      >
        <Phone className="w-6 h-6 mr-3" />
        Chat with us on WhatsApp
      </Button>
      <p className="text-sm text-muted-foreground mt-4">
        We're available during store hours: Mon - Sat: 10:00 AM - 8:00 PM, Sunday: 12:00 PM - 6:00 PM
      </p>
    </div>
  );
};

export default Contact;
