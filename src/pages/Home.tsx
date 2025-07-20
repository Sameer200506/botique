import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, ShoppingBag, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '@/components/ui/loading-spinner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  inStock: boolean;
  featured: boolean;
  trending: boolean;
  rating?: number;
}

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [api, setApi] = useState<CarouselApi>();

  const categories = [
    {
      title: 'Traditional Suits',
      description: 'Elegant ethnic wear for special occasions',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400&h=300&fit=crop'
    },
    {
      title: 'Designer Dresses',
      description: 'Contemporary fashion with traditional touch',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop'
    },
    {
      title: 'Wedding Collection',
      description: 'Special occasion wear for your big day',
      icon: Star,
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=300&fit=crop'
    }
  ];

  const features = [
    'Premium Quality Fabrics',
    'Expert Craftsmanship',
    'Custom Tailoring Available',
    'Fast & Secure Delivery'
  ];

  const getHomeDemoProducts = (): Product[] => {
    const demoProducts: Product[] = [];
    const productNames = [
      "Elegant Silk Saree", "Modern Chiffon Gown", "Classic Cotton Kurta", "Embroidered Velvet Lehenga",
      "Chic Georgette Dress", "Handloom Linen Saree", "Designer Anarkali Suit", "Contemporary Palazzo Set",
      "Bridal Net Lehenga", "Simple Rayon Kurti", "Party Wear Gown", "Traditional Kanjeevaram Saree",
      "Fusion Indo-Western Dress", "Comfortable Daily Kurta", "Grand Wedding Saree", "Stylish Crop Top Skirt",
      "Printed Crepe Saree", "Sophisticated Evening Gown", "Casual Denim Kurta", "Heavy Work Bridal Lehenga",
      "Flowy Maxi Dress", "Art Silk Saree", "Brocade Anarkali", "Trendy Sharara Suit",
      "Engagement Lehenga", "Everyday Cotton Dress", "Glamorous Sequin Gown", "Pure Silk Saree",
      "Contemporary Dhoti Pants", "Festive Salwar Kameez", "Reception Gown", "Boho Chic Dress",
      "Patola Silk Saree", "Velvet Kurta Set", "Designer Cocktail Dress", "Traditional Banarasi Saree",
      "Modern Jumpsuit", "Casual Tunic Top", "Bridal Kanchipuram Saree", "Fashionable Co-ord Set",
      "Lightweight Chiffon Saree", "Elegant A-line Dress", "Comfortable Lounge Wear", "Statement Blouse Saree",
      "Minimalist Kurta", "Vibrant Printed Dress", "Classic Black Saree", "Contemporary White Gown"
    ];
    const productDescriptions = [
      "A timeless piece crafted with exquisite detail.", "Perfect blend of modern style and comfort.",
      "Effortlessly elegant for any occasion.", "Luxurious fabric with intricate handwork.",
      "Designed to make a statement.", "Breathable and stylish for daily wear.",
      "A masterpiece of traditional artistry.", "Versatile and chic for various events.",
      "Your dream outfit for the big day.", "Simple yet sophisticated.",
      "Shine bright at any party.", "Rich heritage woven into every thread.",
      "Embrace the best of both worlds.", "Comfort meets style for your everyday.",
      "Make your wedding unforgettable.", "Trendy and comfortable for a modern look.",
      "Vibrant prints for a lively appeal.", "Sophistication redefined.",
      "Casual comfort with a touch of style.", "Dazzle on your special day.",
      "Light and airy for a graceful look.", "Traditional charm with a modern twist.",
      "Regal and elegant for grand events.", "Fashion-forward and comfortable.",
      "Perfect for your engagement ceremony.", "Easy-to-wear and stylish.",
      "Sparkle and shine all night long.", "Pure luxury and timeless beauty.",
      "Modern twist on traditional wear.", "Celebrate in style.",
      "Stunning for your reception.", "Free-spirited and fashionable.",
      "A true work of art.", "Rich and opulent for special occasions.",
      "Make a lasting impression.", "A symbol of grace and tradition.",
      "Sleek and stylish for a contemporary look.", "Effortless style for your daily routine.",
      "Exquisite craftsmanship for your bridal trousseau.", "Chic and coordinated for a complete look.",
      "Light as air, perfect for any season.", "Flattering silhouette for every body type.",
      "Relax in style.", "Elevate your saree game.",
      "Understated elegance.", "Bold and beautiful prints.",
      "A wardrobe essential.", "Modern elegance for any formal event."
    ];
    const productCategories = [
      'Traditional Suits', 'Designer Dresses', 'Wedding Collection', 'Casual Wear'
    ];

    for (let i = 1; i <= 48; i++) {
      const id = i.toString();
      const name = productNames[i - 1] || `Product ${i}`;
      const description = productDescriptions[i - 1] || `Description for product ${i}.`;
      const category = productCategories[(i - 1) % productCategories.length];
      const price = i <= 26 ? 1399 : 1699;
      const inStock = Math.random() > 0.2;
      const featured = Math.random() > 0.7;
      const trending = Math.random() > 0.7;
      const rating = parseFloat((Math.random() * (5 - 3) + 3).toFixed(1));

      demoProducts.push({
        id,
        name,
        price,
        category,
        description,
        imageUrl: `/products/${i}.jpeg`,
        inStock,
        featured,
        trending,
        rating
      });
    }
    return demoProducts;
  };

  useEffect(() => {
    const allProducts = getHomeDemoProducts();
    const trending = allProducts.filter(p => p.trending).sort(() => 0.5 - Math.random()).slice(0, 10);
    const featured = allProducts.filter(p => p.featured).sort(() => 0.5 - Math.random()).slice(0, 5);
    
    setTrendingProducts(trending);
    setFeaturedProducts(featured);
    setLoadingTrending(false);
    setLoadingFeatured(false);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    // Optional: Add event listeners for carousel events
    api.on('select', () => {
      // Handle carousel selection if needed
    });
  }, [api]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop)',
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 animate-in fade-in duration-1000">
              Discover Elegance in
              <span className="block text-yellow-400">
                Every Thread
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-in fade-in duration-1000 delay-200">
              Step into a world of timeless fashion where tradition meets contemporary style. 
              Each piece is crafted with love and attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in duration-1000 delay-400">
              <Button asChild size="lg" className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
                <Link to="/products" className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
                <Link to="/custom-tailoring" className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Custom Tailoring</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover:bg-gradient-card hover:shadow-soft transition-all duration-300">
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest collection of stunning fashion pieces that are trending right now.
            </p>
          </div>
          
          {loadingTrending ? (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-muted-foreground">Loading trending products...</p>
            </div>
          ) : (
            <Carousel 
              className="w-full max-w-6xl mx-auto"
              setApi={setApi}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {trendingProducts.map((product) => (
                  <CarouselItem key={product.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden">
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <div className="absolute top-2 left-2">
                          {product.trending && (
                            <Badge className="bg-gradient-gold text-secondary-foreground">Trending</Badge>
                          )}
                        </div>
                        
                        {product.rating && (
                          <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                          {!product.inStock && (
                            <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-1">
                          {product.name}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-primary">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <Button asChild size="sm" className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
                            <Link to="/products">View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          )}
        </div>
      </section>


      {/* Featured Products Section */}
      <section className="py-16 lg:py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our hand-picked selection of the finest pieces in our collection.
            </p>
          </div>
          
          {loadingFeatured ? (
            <div className="text-center py-12">
              <LoadingSpinner size="lg" className="mx-auto mb-4" />
              <p className="text-muted-foreground">Loading featured products...</p>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No featured products yet</h3>
              <p className="text-muted-foreground">Check back soon for our latest featured items.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 bg-gradient-card border-0 overflow-hidden">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-gradient-gold text-secondary-foreground">Featured</Badge>
                    </div>
                    
                    {product.rating && (
                      <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-medium">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      {!product.inStock && (
                        <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <Button asChild size="sm" className="bg-gradient-hero hover:shadow-glow transition-all duration-300">
                        <Link to="/products">View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Tailoring CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Custom Tailoring Delivered to Your Doorstep
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Experience the ultimate in personalized fashion with our exclusive custom tailoring service that brings the tailor directly to your home.
          </p>
          <Button asChild size="lg" variant="secondary" className="hover:shadow-glow transition-all duration-300">
            <Link to="/custom-tailoring" className="flex items-center space-x-2">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Choose GlitzGlam?</h2>
            <p className="text-lg text-muted-foreground">We're committed to delivering excellence in every aspect</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={feature} className="text-center group">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft group-hover:shadow-glow transition-all duration-300">
                  <Star className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Find Your Perfect Style?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Join thousands of satisfied customers who trust us for their fashion needs.
          </p>
          <Button asChild size="lg" variant="secondary" className="hover:shadow-glow transition-all duration-300">
            <Link to="/products" className="flex items-center space-x-2">
              <span>Start Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
