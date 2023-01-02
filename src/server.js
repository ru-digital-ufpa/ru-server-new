require('dotenv');
const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5500;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
