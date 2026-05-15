const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const port = 3000;
dotenv.config();



app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {

    res.sendFile('public/home.html', {
        root: __dirname
    });

});

app.get('/api/search', async (req, res) => {

    const query = req.query.q;

    if (!query) {

        return res.status(400).json({
            error: 'Search query required'
        });

    }

    try {

        const response = await fetch(
            `https://api.europeana.eu/record/v2/search.json?wskey=${process.env.EUROPEANA_KEY}&query=${query}`
        );

        const data = await response.json();

        res.json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Failed to fetch Europeana data'
        });

    }

});

app.get('/search-history', async (req, res) => {

    const { data, error } = await supabase
        .from('search_history')
        .select()
        .order('created_at', {
            ascending: false
        });

    if (error) {

        console.log(error);

        return res.status(500).json(error);

    }

    res.json(data);

});

  app.post('/search-history', async (req, res) => {

    const { search_term } = req.body;
  
    if (!search_term) {
  
      return res.status(400).json({
        error: 'Search term required'
      });
  
    }
  
    const { data, error } = await supabase
      .from('search_history')
      .insert([
        {
          search_term: search_term
        }
      ])
      .select();
  
    if (error) {
  
      console.log(error);
  
      return res.status(500).json(error);
  
    }
  
    res.json(data);
  
  });

  app.listen(port, () => {

    console.log(`Server running on port ${port}`);

});

