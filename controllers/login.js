import database from '../database.js';
import bcrypt from 'bcrypt';
import xss from 'xss';


export default (req, res) => {

    const userLog = {
        login: xss(req.body.login),
        mdp: req.body.mdp
    };

    database(
        'SELECT * FROM user WHERE login=? ',
     [userLog.login], (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête :', error);
            return res.status(500).send('Erreur lors de l\'exécution de la requête.');
        }

        if (results.length === 0) {
            res.redirect('/newUser', 201, { message: 'Cree un indentifiant' });
            return;
        }
        
        bcrypt.compare(userLog.mdp, results[0].mdp, (error, result) => {
            if (error) {
                res.send('Erreur serveur');
            }
           
            if (!result) {
                res.render('login.ejs', { message: 'Identifiants incorrects' });
                return;
            } else {
                
            req.session.isLogged = true;
            req.session.idUser = results[0].id;

            console.log(req.session.isLogged)

            res.redirect('/profil');
        }
                       
                
        });
    });
};
  