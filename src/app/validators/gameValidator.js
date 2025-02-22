const { check, validationResult } = require('express-validator');

const validateGameCreation = [
  check('name').notEmpty().withMessage('Game name is required'),
  check('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { validateGameCreation };
