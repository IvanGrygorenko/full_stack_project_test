const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;


app.get('/', (req, res) => {
    res.send('Welcome to the Superhero API!');
});

// Масив для зберігання даних
let superheroes = [
    {
        id: 1,
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'Born on Krypton...',
        superpowers: 'Super strength, flight, heat vision',
        catch_phrase: 'Look, up in the sky, it\'s a bird...',
        images: ['image1.jpg'],
    },
    {
        id: 2,
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'After witnessing his parents\' murder...',
        superpowers: 'Genius intellect, martial artist, gadgets',
        catch_phrase: 'I am vengeance, I am the night...',
        images: ['image1.jpg'],
    },

];

app.use(cors());
app.use(express.json());

// Отримати список супергероїв
app.get('/api/superheroes', (req, res) => {
    res.json(superheroes);
});

// Отримати деталі одного супергероя
app.get('/api/superheroes/:id', (req, res) => {
    const superhero = superheroes.find(hero => hero.id === parseInt(req.params.id));
    if (!superhero) return res.status(404).send('Супергерой не знайдений');
    res.json(superhero);
});

// Додати нового супергероя
app.post('/api/superheroes', (req, res) => {
    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = req.body;
    const newSuperhero = {
        id: superheroes.length + 1,
        nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images,
    };
    superheroes.push(newSuperhero);
    res.status(201).json(newSuperhero);
});

// Оновити супергероя
app.put('/api/superheroes/:id', (req, res) => {
    const superhero = superheroes.find(hero => hero.id === parseInt(req.params.id));
    if (!superhero) return res.status(404).send('Супергерой не знайдений');

    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = req.body;
    superhero.nickname = nickname || superhero.nickname;
    superhero.real_name = real_name || superhero.real_name;
    superhero.origin_description = origin_description || superhero.origin_description;
    superhero.superpowers = superpowers || superhero.superpowers;
    superhero.catch_phrase = catch_phrase || superhero.catch_phrase;
    superhero.images = images || superhero.images;

    res.json(superhero);
});

// Видалити супергероя
app.delete('/api/superheroes/:id', (req, res) => {
    const superheroIndex = superheroes.findIndex(hero => hero.id === parseInt(req.params.id));
    if (superheroIndex === -1) return res.status(404).send('Супергерой не знайдений');

    superheroes.splice(superheroIndex, 1);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
});
