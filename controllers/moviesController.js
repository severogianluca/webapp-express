const connection = require('../data/conn');

// INDEX
function getList(req, res) {
    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results.map(result => ({
            ...result, imagePath : 'http://127.0.0.1:4000/' + result.image 
        })));
    });
}

// SHOW
function getById(req, res) {
    const { id } = req.params;

    const filmsSql = 'SELECT * FROM movies WHERE id = ?';
    const reviewsSql = `
        SELECT reviews.*
        FROM reviews
        JOIN movies ON movies.id = reviews.movie_id
        WHERE movies.id = ?
    `;

    connection.query(filmsSql, [id], (err, filmsResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (filmsResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        const currentFilm = filmsResults[0];
        const film = {
            ...currentFilm, imagePath : 'http://127.0.0.1:4000/' + currentFilm.image
        }
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            film.reviews = reviewsResults;
            res.json(film);
        });
    });
}

module.exports = { getList, getById };
