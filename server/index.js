import dotenv from 'dotenv';
import dns from 'dns';
import app from './app.js';
import { connectToDatabase } from './lib/mongodb.js';

dns.setServers([
  '1.1.1.1',
  '8.8.8.8'
])

dotenv.config();
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));
