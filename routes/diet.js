const express = require('express');
const router = express.Router();
const database = require('../config/database').getDB();
const { requireAdmin } = require('../middleware/auth');

// ============================================
// SQL QUERIES ORGANIZED AT TOP
// ============================================

const sql = {
    // GET queries
    getAll: `
        SELECT diet_id, name
        FROM DietaryInformation
        ORDER BY name ASC
    `,

};

// ============================================
// PUBLIC ROUTES (No authentication required)
// ============================================

/**
 * Get all diets
 * GET /api/diets
 */
router.get('/', (req, res) => {
    database.all(sql.getAll, [], (err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Database error',
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    });
});

module.exports = router;
