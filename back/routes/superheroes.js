const express = require('express');
const router = express.Router();


let superheroes = [

];

// пагінація
const paginate = (array, page, pageSize) => {
    const offset = (page - 1) * pageSize;
    return array.slice(offset, offset + pageSize);
};

// Створення 
router.post('/', (req, res) => {
    const { nickname, real_name, origin_description, superpowers, catch_phrase, images = [] } = req.body;
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

// Отримання всіх супергероїв з пагінацією
router.get('/', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 5;
    const paginatedSuperheroes = paginate(superheroes, page, pageSize);
    res.json({ heroes: paginatedSuperheroes, currentPage: page, totalPages: Math.ceil(superheroes.length / pageSize) });
});

// Отримання одного супергероя за ID
router.get('/:id', (req, res) => {
    const superhero = superheroes.find(hero => hero.id === parseInt(req.params.id));
    if (!superhero) return res.status(404).send('Superhero not found');
    res.json(superhero);
});

// Оновлення супергероя
router.put('/:id', (req, res) => {
    const superhero = superheroes.find(hero => hero.id === parseInt(req.params.id));
    if (!superhero) return res.status(404).send('Superhero not found');

    const { nickname, real_name, origin_description, superpowers, catch_phrase, images } = req.body;
    superhero.nickname = nickname || superhero.nickname;
    superhero.real_name = real_name || superhero.real_name;
    superhero.origin_description = origin_description || superhero.origin_description;
    superhero.superpowers = superpowers || superhero.superpowers;
    superhero.catch_phrase = catch_phrase || superhero.catch_phrase;
    superhero.images = images || superhero.images;

    res.json(superhero);
});

// Видалення супергероя
router.delete('/:id', (req, res) => {
    const superheroIndex = superheroes.findIndex(hero => hero.id === parseInt(req.params.id));
    if (superheroIndex === -1) return res.status(404).send('Superhero not found');

    superheroes.splice(superheroIndex, 1);
    res.status(204).send();
});

module.exports = router;
