const express = require('express');
const QRCode = require('qrcode');
const Table = require('../models/Table');
const authJwt = require('../middlewares/authJwt');

const router = express.Router();

// Helper to build menu URL for QR
function buildMenuUrl(restaurantId, tableNumber) {
  // In production replace localhost with your domain
  return `https://your-domain.com/menu/${restaurantId}/${tableNumber}`;
}

// Bulk-generate tables with QR
router.post('/generate', authJwt, async (req, res) => {
  try {
    const { count } = req.body;
    if (!count || count <= 0) {
      return res.status(400).json({ message: 'count must be > 0' });
    }

    const tables = [];
    for (let i = 1; i <= count; i++) {
      const existing = await Table.findOne({ restaurant: req.restaurantId, number: i });
      if (existing) continue; // skip existing table numbers

      const menuUrl = buildMenuUrl(req.restaurantId, i);
      const qrUrl = await QRCode.toDataURL(menuUrl);
      const table = new Table({ restaurant: req.restaurantId, number: i, qrUrl });
      await table.save();
      tables.push(table);
    }
    res.status(201).json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List tables for restaurant
router.get('/', authJwt, async (req, res) => {
  try {
    const tables = await Table.find({ restaurant: req.restaurantId });
    res.json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
