import { CartItemModel as Cart } from "../models/cart_item.js";

const addToCart = async (req, res) => {
  try {
    const { userid, product, quantity } = req.body;

    let existingCart = await Cart.findOne({ userid });

    if (existingCart) {
      const existingProductIndex = existingCart.items.findIndex(
        (item) => item.product.toString() === product.toString()
      );

      if (existingProductIndex !== -1) {
        existingCart.items[existingProductIndex].quantity += quantity;

      } else {
        existingCart.items.push({ product, quantity });
      }

      existingCart = await existingCart.save();
      res.status(200).json(existingCart);
    } else {
      const newCartItem = new Cart({
        userid,
        items: [{ product, quantity }],
      });

      const savedCartItem = await newCartItem.save();
      res.status(201).json(savedCartItem);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send("Internal Server Error");
  }
};
const getcart = async (req, res) => {
  try {
    const { userid } = req.query;
    const userCart = await Cart.findOne({ userid });

    if (userCart) {
      res.status(200).json(userCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).send("Internal Server Error");
  }
};
const add1tocart = async (req, res) => {
  try {
    const { userid, product } = req.body;

    let existingCart = await Cart.findOne({ userid });

    if (existingCart) {
      const existingProductIndex = existingCart.items.findIndex(
        (item) => item.product.toString() === product.toString()
      );

      if (existingProductIndex !== -1) {
        existingCart.items[existingProductIndex].quantity += 1;

        existingCart = await existingCart.save();
        res.status(200).json(existingCart);
      } else {
        res.status(404).json({ message: "Product not found in the cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).send("Internal Server Error");
  }
};

const delete1fromcart = async (req, res) => {
  try {
    const { userid, product } = req.body;

    let existingCart = await Cart.findOne({ userid });

    if (existingCart) {
      const existingProductIndex = existingCart.items.findIndex(
        (item) => item.product.toString() === product.toString()
      );

      if (existingProductIndex !== -1) {
        if (existingCart.items[existingProductIndex].quantity > 1) {
          existingCart.items[existingProductIndex].quantity -= 1;
          existingCart = await existingCart.save();
          res.status(200).json(existingCart);
        } else {
          existingCart.items.splice(existingProductIndex, 1);
          existingCart = await existingCart.save();
          res.status(200).json(existingCart);
        }
      } else {
        res.status(404).json({ message: "Product not found in the cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error deleting from cart:", error);
    res.status(500).send("Internal Server Error");
  }
};

export { add1tocart, delete1fromcart, addToCart, getcart };