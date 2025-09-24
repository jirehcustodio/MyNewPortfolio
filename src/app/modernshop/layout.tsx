import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

export default function ModernShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
      </WishlistProvider>
    </CartProvider>
  );
}