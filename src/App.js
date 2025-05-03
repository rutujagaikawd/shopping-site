import React, { useState, createContext, useContext } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Badge,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button as MuiButton,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import makeupKitImg from "./assets/makeup-kit.jpg";
import shoesImg from "./assets/shose.jpeg";
import smartWatchImg from "./assets/smart-watch.jpg";
import tShirtImg from "./assets/t-shirt.jpg";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const theme = createTheme({
  palette: {
    primary: { main: "#000000" },
    secondary: { main: "#FFD700" },
    background: { default: "#FFFFFF" },
  },
});

const productData = [
  {
    id: 1,
    name: "Makeup Kit",
    price: 2999,
    image: makeupKitImg,
    available: 10,
  },
  { 
    id: 2, 
    name: "Shoes",
     price: 1700, 
     image: shoesImg, 
     available: 5
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 1550,
    image: smartWatchImg,
    available: 5,
  },
  { 
    id: 4,
    name: "T-Shirt", 
    price: 599, 
    image: tShirtImg, 
    available: 8 
  },
];

export default function App() {
  // This section defines state for cart and view
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);

  // This function adds item to cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // This function removes item from cart
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  // This function updates item quantity
  const updateQuantity = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  };

  // This section computes totals
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // This function toggles cart view
  const toggleCart = () => setShowCart((s) => !s);

  // This function returns to home view
  const goHome = () => setShowCart(false);

  // This function handles checkout process
  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutAmount(totalPrice);
    setCart([]);
    setShowCart(false);
    setOpenDialog(true);
  };

  // This function closes confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // This section renders app bar and main view
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        handleCheckout,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                SimpleShop
              </Typography>
              <IconButton color="inherit" onClick={goHome}>
                <HomeIcon />
              </IconButton>
              <IconButton color="inherit" onClick={toggleCart}>
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </AppBar>
          <Container sx={{ mt: 4 }}>
            {showCart ? <Cart /> : <ProductList products={productData} />}
          </Container>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Order Placed</DialogTitle>
            <DialogContent dividers>
              <Typography>
                Your order has been placed Thank you for your purchase
              </Typography>
              <Typography sx={{ mt: 1 }}>
                Total ₹{checkoutAmount.toFixed(2)}
              </Typography>
            </DialogContent>
            <DialogActions>
              <MuiButton onClick={handleCloseDialog} autoFocus>
                Close
              </MuiButton>
            </DialogActions>
          </Dialog>
        </Box>
      </ThemeProvider>
    </CartContext.Provider>
  );
}
