const users = [
    { id: 1, email: 'john@example.com', password: '$2b$10$Q.pAezKxeP4uIRSCy9mKCujs5z3orKEMHnzwpXyJ18UhgToMORP7O' }, // Password: Password123
  ];
  
  const findByEmail = async (email) => {
    return users.find((user) => user.email === email) || null;
  };
  
  module.exports = { findByEmail };