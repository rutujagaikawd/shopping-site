import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../App";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, handleCheckout } =
    useCart();

  // This section handles empty cart view
  if (cart.length === 0) {
    return (
      <Paper sx={{ p: 3, backgroundColor: "background.paper" }}>
        <Typography variant="h5">Your Cart is Empty</Typography>
      </Paper>
    );
  }

  // List of cart items
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Shopping Cart
      </Typography>
      <Paper sx={{ p: 2, backgroundColor: "background.paper" }}>
        <List>
          {cart.map((item) => (
            // This section renders each cart item
            <React.Fragment key={item.id}>
              <ListItem alignItems="center" sx={{ py: 1 }}>
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`₹${item.price.toFixed(2)} each`}
                />
                <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value, 10))
                    }
                    size="small"
                    inputProps={{ min: 1, style: { textAlign: "center" } }}
                    sx={{ width: "60px", mr: 2 }}
                  />
                  <Typography sx={{ minWidth: "100px" }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Box
          // Total amount and checkout button
          sx={{
            mt: 2,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Total ₹{totalPrice.toFixed(2)}</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
