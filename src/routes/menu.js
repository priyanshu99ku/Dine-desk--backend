const express = require('express');
const Menu = require('../models/Menu');
const authJwt = require('../middlewares/authJwt');

const router = express.Router();

// Create a menu item
router.post('/', authJwt, async (req, res) => {
  try {
    const { name, description, price, available } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const menuItem = new Menu({
      restaurant: req.restaurantId,
      name,
      description,
      price,
      available,
    });
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all menu items for logged-in restaurant
router.get('/', authJwt, async (req, res) => {
  try {
    const items = await Menu.find({ restaurant: req.restaurantId });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single menu item
router.get('/:id', authJwt, async (req, res) => {
  try {
    const item = await Menu.findOne({ _id: req.params.id, restaurant: req.restaurantId });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a menu item
router.put('/:id', authJwt, async (req, res) => {
  try {
    const updates = req.body;
    const item = await Menu.findOneAndUpdate(
      { _id: req.params.id, restaurant: req.restaurantId },
      updates,
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a menu item
router.delete('/:id', authJwt, async (req, res) => {
  try {
    const item = await Menu.findOneAndDelete({ _id: req.params.id, restaurant: req.restaurantId });
    if (!item) return res.status(404).json({ message: 'Menu item not found' });
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
