require('dotenv').config();

const { createApp } = require('./app');
const { userTable } = require('./db');

const startServer = async () => {
  const app = createApp();
  const PORT = 8000;

  userTable();
  /**
   * 서버 통신 테스트
   */
  app.get('/test', (req, res) => {
    res.status(200).json({ message: 'SUCCESS!' });
  });

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
