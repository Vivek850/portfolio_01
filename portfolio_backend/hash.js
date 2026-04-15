const bcrypt = require('bcryptjs');

(async () => {
  const hashedPassword = await bcrypt.hash("admin$@123", 10);
  console.log("Hashed password:", hashedPassword);
})();
