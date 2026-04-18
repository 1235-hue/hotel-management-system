const app = require('./src/app');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🏨 Hotel Management API running on port ${PORT}`);
  console.log(`📄 Swagger docs: http://localhost:${PORT}/api-docs`);
});
