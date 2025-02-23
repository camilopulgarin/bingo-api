const { check, validationResult } = require('express-validator');

const validateGameCreation = [
  check('name').notEmpty().withMessage('Game name is required'),
  check('capacity')
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
    check('userIds')
    .isArray()
    .withMessage('User IDs must be an array'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { validateGameCreation };
