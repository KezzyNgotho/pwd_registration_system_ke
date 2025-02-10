const express = require('express');
const cors = require('cors');
const pwdRoutes = require('./routes/pwdRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', pwdRoutes);

const PORT = 4000;
// Listen on all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://172.17.80.1:${PORT}/api`);
});

