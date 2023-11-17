// app.mjs
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getKraj } from '../BackEnd/ConnectToDB.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/search', async (req, res) => {
  try {
    const { kraj } = req.query;
    const query = {$or:[{ krajb: kraj }, { kraja: kraj }]};
    const result = await getKraj(query);

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send(`Niestety nie ma meczu z ${kraj}`);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
