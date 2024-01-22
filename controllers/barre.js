import database from '../database.js';

export default (req, res) => {


    const nomTopic = req.body.nom;

    database(
        'SELECT * FROM topic WHERE nom = ?',

        [nomTopic],

 
        (err, recherche) => {
            if (err) {

                console.error('Erreur lors de la recherche :', err);

                res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche.' });
            }
            else {
                res.json({recherche });
            }
            console.log(recherche)
        });


}