import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, ShoppingBag, Filter, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  rating?: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  const categories = ['All', 'Traditional Suits', 'Designer Dresses', 'Wedding Collection', 'Casual Wear'];

  useEffect(() => {
    setProducts(getDemoProducts());
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const getDemoProducts = (): Product[] => {
    const demoProducts: Product[] = [];
    const productNames = [];
    const productDescriptions = [];

    for (let i = 1; i <= 26; i++) {
      productNames.push("ALL MIX CATALOGUE DESIGN DUPPTA cutwork Work Collection 2025");
      productDescriptions.push("•Cotton Digital Printed Heavy Embroidered Lawn Shirts\n•Cotton Lawn Two Side Cut Work Embroidered Dupattas\n•Dyed Cotton Trousers price 1399/");
    }

    for (let i = 27; i <= 48; i++) {
      productNames.push("SIRENE LUXURY Lawn-25-2 by DEEPSY SUITS");
      productDescriptions.push("Top -Pure cotton with heavy self embroidery\nBot - cotton solid\nDup- Cotton Net with embroidery / cotton print");
    }
    const productCategories = [
      'Traditional Suits', 'Designer Dresses', 'Wedding Collection', 'Casual Wear'
    ];

    for (let i = 1; i <= 48; i++) {
      const id = i.toString();
      const name = productNames[i - 1] || `Product ${i}`;
      const description = productDescriptions[i - 1] || `Description for product ${i}.`;
      const category = productCategories[(i - 1) % productCategories.length];
      const price = i <= 26 ? 1399 : 1699;
      const featured = Math.random() > 0.7; // 30% chance of being featured
      const rating = parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)); // Rating between 3.0 and 5.0

      demoProducts.push({
        id,
        name,
        price,
        category,
        description,
        imageUrl: `/products/${i}.jpeg`,
        featured,
        rating
      });
    }
    return demoProducts;
  };

  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' || product.category === selectedCategory
  );

  const toggleFavorite = (productId: string) => {
    const newFavorites = favorites.includes(productId)
      ? favorites.filter(id => id !== productId)
      : [...favorites, productId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    
    toast({
      title: favorites.includes(productId) ? "Removed from favorites" : "Added to favorites",
      description: "Your favorites have been updated."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-12 bg-gradient-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Our Collection</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated selection of elegant fashion pieces, each designed to make you feel confident and beautiful.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try selecting a different category or check back later.</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <Link to="/contact" key={product.id} className="block">
                <Card className={`group hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 bg-gradient-card border-0 overflow-hidden ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}>
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[3/4]'
                  }`}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Overlay with actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                          className="bg-white/90 hover:bg-white"
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.featured && (
                        <Badge className="bg-gradient-gold text-secondary-foreground">Featured</Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className={`p-4 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {product.name}
                        </h3>
                        {product.rating && (
                          <div className="flex items-center gap-1 ml-2">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">{product.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      
                      <Badge variant="outline" className="mb-3">
                        {product.category}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
