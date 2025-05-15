const connection = require('../data/conn');

// INDEX
function getList(req, res) {
    const sql = `
    SELECT 
    movies.*, 
    ROUND(AVG(reviews.vote), 2) AS average_vote
FROM 
    movies 
LEFT JOIN 
    reviews  ON movies.id = reviews.movie_id
GROUP BY 
    movies.id;

    `;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results.map(result => ({
            ...result, imagePath: 'http://127.0.0.1:4000/' + result.image
        })));
    });
}

// SHOW
function getById(req, res) {
    const { id } = req.params;

    const filmsSql = `
    SELECT
    movies.*, ROUND(AVG(reviews.vote), 2) AS average_vote
    FROM
    movies
        LEFT JOIN
    reviews ON movies.id = reviews.movie_id
    WHERE
    movies.id = ?
    `;
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
            ...currentFilm, imagePath: 'http://127.0.0.1:4000/' + currentFilm.image
        }
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });
            film.reviews = reviewsResults;
            res.json(film);
        });
    });

}

//POST x nuovi film
function insertMovie(req, res) {

    const { title, director, abstract } = req.body

    const sql = `
    INSERT INTO movies(title, director, abstract) VALUES (?, ?, ?);
    `
    connection.query(sql, [title, director, abstract],(err, results) => {
        console.log(results)
        if (err) {
            return res.status(500).json({
                errorMessage: err.sqlMessage
            })
        }
        return res.status(201).json({
            messagge: results
            
        })
        
    })
}

//POST x nuove recensioni
function insertReviews(req, res) {

    const { id } = req.params;
    const { name, text, vote } = req.body

    const sql = `
    INSERT INTO reviews(movie_id, name, vote, text) VALUES (?,?, ?, ?);
    `

    connection.query(sql, [id, name, vote, text], (err, results) => {
        if (err) {
            return res.status(500).json({
                errorMessage: err.sqlMessage
            })
        }
        return res.status(201).json({
            messagge: results
        })

    })

}

module.exports = { getList, getById, insertReviews, insertMovie };
