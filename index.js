import express from 'express';

// Link naar de api van vini mini
const url = 'https://api.vinimini.fdnd.nl/api/v1';
const data = await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);

// Maak een nieuwe express server
const server = express();

// Stel in hoe we express gebruiken
server.set('view engine', 'ejs');
server.set('views', './views');
server.use(express.static('public'));

// route categorie en notities
server.get('/', (request, response) => {
    let categoriesUrl = url + '/categories';
    let productenUrl = url + '/producten';

    fetchJson(categoriesUrl).then((data1) => {
        const baseUrl = 'https://api.vinimini.fdnd.nl/api/v1/';
        const pepijnId = 'notities?id=clemozv3c3eod0bunahh71sx7';
        const url = `${baseUrl}${pepijnId}`;

        fetchJson(url).then((data2) => {
            response.render('index', { categories: data1.categories, notities: data2.notities });
        });
    });
});

// Maak een route naar de ei.ejs
server.get('/Pinda', async (request, response) => {
    let productenUrl = url + '/producten';

    await fetchJson(productenUrl).then((data) => {
        response.render('Pinda', { producten: data.producten });
    });
});

// Maak een route naar de pinda.ejs
server.get('/Ei', async (request, response) => {
    let productenUrl = url + '/producten';

    await fetchJson(productenUrl).then((data) => {
        response.render('Ei', { producten: data.producten });
    });
});
// allergenen zonder inhoud 
server.get('/Amandel', (request, response) => {
    response.render('Amandel')
  })
  
server.get('/Schelp', (request, response) => {
    response.render('Schelp')
  })
  
 server.get('/Soja', (request, response) => {
    response.render('Soja')
  })
  
  server.get('/Vis', (request, response) => {
    response.render('Vis')
  })
  
server.get('/Hazelnoot', (request, response) => {
    response.render('Hazelnoot')
  })
  
  server.get('/Walnoot', (request, response) => {
    response.render('Walnoot')
  })
  
 server.get('/Cashewnoot', (request, response) => {
    response.render('Cashewnoot')
  })

// FORMULIER NOTITIE
// Stel de afhandeling van formulieren in
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/', function (req, res, next) {
    const baseurl = 'https://api.vinimini.fdnd.nl/api/v1';
    const url = `${baseurl}`;
    req.body.afgerond = false;
    req.body.persoonId = 'clemozv3c3eod0bunahh71sx7';
    req.body.datum = req.body.datum + ':00Z';
    req.body.herinnering = [req.body.herinnering + ':00Z'];
    console.log(req.body);
    postJson(url + '/notities', req.body).then((data) => {
        console.log(JSON.stringify(data));
        let newNotitie = { ...req.body };

    // Post succes or error

        if (data.success) {
            res.redirect('/');
       
        } else {
            const errormessage = `${data.message}: Mogelijk komt dit door de slug die al bestaat.`;
            const newdata = { error: errormessage, values: newData };

            res.render('index', newdata);
        }
    });
});



// Stel het poortnummer in en start express
server.set('port', process.env.PORT || 8000);
server.listen(server.get('port'), function () {
    console.log(`serverlication started on http://localhost:${server.get('port')}`);
});

async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error);
}

export async function postJson(url, body) {
    return await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .catch((error) => error);
}