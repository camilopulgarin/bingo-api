const users = [
    { id: 1, email: 'prueba@prueba.com', password: '$2b$10$jHQQ7ybn0Wz1hCWummQvg.RGdXgu4aEd53C8KQosYywPK5SKXUHfi' }, // Password: Password123
  ];
  
  const findByEmail = async (email) => {
    return users.find((user) => user.email === email) || null;
  };
  
  module.exports = { findByEmail };