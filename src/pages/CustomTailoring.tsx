import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CustomTailoring = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Custom Tailoring Delivered to Your Doorstep</h1>

      <section className="mb-12">
        <p className="text-lg leading-relaxed mb-4">
          Experience the ultimate in personalized fashion with our exclusive custom tailoring service that brings the tailor directly to your home. Say goodbye to the hassle of fitting appointments and boutique visits—our expert tailor visits you with fabric samples and style suggestions, making styling and fittings effortless and comfortable.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">How It Works:</h2>
        <ol className="list-decimal list-inside text-lg leading-relaxed space-y-2">
          <li>Book an appointment at your convenience.</li>
          <li>Our skilled tailor visits your home to take precise measurements and discuss your design preferences in person.</li>
          <li>Choose from an exquisite range of fabrics and styles with the tailor's expert guidance.</li>
          <li>Once your custom design is finalized, our artisans craft your outfit with impeccable detail and craftsmanship.</li>
          <li>Your impeccably tailored garment is delivered to your doorstep, perfectly fitted and ready to wear.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Our Doorstep Tailoring?</h2>
        <ul className="list-disc list-inside text-lg leading-relaxed space-y-2">
          <li><strong>Convenience & Comfort:</strong> Enjoy a boutique-quality fitting in the privacy and comfort of your own home, ideal for busy schedules or those who prefer a relaxed, personalized experience.</li>
          <li><strong>Expert Craftsmanship:</strong> Our highly skilled tailors bring their expertise to you, ensuring every stitch and detail reflects perfection.</li>
          <li><strong>Perfect Fit Guaranteed:</strong> With professional measurement and multiple fittings done at your home, your outfit will fit you flawlessly.</li>
          <li><strong>Time-Saving:</strong> No need to travel or wait—our service fits into your lifestyle, saving you valuable time.</li>
          <li><strong>Personalized Service:</strong> One-on-one consultation ensures that your outfit is a true reflection of your style and personality.</li>
        </ul>
      </section>

      <section className="text-center">
        <p className="text-lg leading-relaxed mb-8">
          Discover the ease and luxury of custom fashion tailored just for you, without ever leaving your home. Book your home visit today and transform your wardrobe with our bespoke tailoring experience.
        </p>
        <Button asChild size="lg" className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
          <Link to="/contact">Order Now</Link>
        </Button>
      </section>
    </div>
  );
};

export default CustomTailoring;
