import database from '../database.js';

export default (req, res) => {


    const titreAll = req.params.titre;
    

    database(
        'SELECT * FROM publication WHERE titre = ?',

        [titreAll],

 
        (err, articles) => {

            
            if (err) {
                console.err('Erreur lors de l\'exécution de la requête :', err);
                return res.status(500).send('Erreur lors de l\'exécution de la requête.');
            }
    
            if (articles.length === 0) {
                
                res.redirect('/add');
            } else {
                
    
                res.render('article.ejs', {articles});
            }
        });
    };