import { query } from "express";
import database from "../database.js";
import xss from 'xss';




export const addPost = (req, res) => {
    res.render("add.ejs");
};

export const renderListPage = (req, res) => {
    database('SELECT * FROM publication', (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête :', error);
            return res.status(500).send('Erreur lors de l\'exécution de la requête.');
        }

        if (results.length === 0) {
            
            res.redirect('/add');
        } else {
            const data = results;

            res.render('home.ejs', { data });
        }
    });
};

export const profil = (req, res) => {
    const userId = req.session.idUser;

    database('SELECT pseudo FROM user WHERE user.id = ?',
        [userId], (error, profils) => {
            if (error) {
                console.error('Erreur lors de l\'exécution de la requête :', error);
                return res.status(500).send('Erreur lors de l\'exécution de la requête.');
            }

            if (profils.length === 0) {
                // Si la requête ne retourne aucun résultat, vous pouvez rediriger vers une autre page.
                res.redirect('/newUser');
            } else {
                // Nettoyez les données pour éviter les attaques XSS
                const cleanedProfils = profils.map((profil) => ({
                    pseudo: xss(profil.pseudo),
                }));

                res.render('profil.ejs', { profils: cleanedProfils });
            }
        });
};

export const newUserGet = (req, res) => {
    res.render("newUser.ejs");
};

export const loginGet = (req, res) => {
    res.render("login.ejs");
};



export const topic = (req, res) => {
    database('SELECT * FROM topic', (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête :', error);
            return res.status(500).send('Erreur lors de l\'exécution de la requête.');
        }

        if (results.length === 0 && !req.session.isLogged) {
            
            return res.render('forum.ejs', { messages: 'Il n\'y a pas de nouvelles discussions.' });
        } else if (results.length === 0 && req.session.isLogged) {
            
            return res.redirect('/forum');
        } else {
            
            const listeTopic = results;
            return res.render('forum.ejs', { listeTopic });
        }
    });
};
export const postAll = (req, res) => {

    const topicId = req.params.idTopic;
console.log(topicId)

    database('SELECT * FROM messages WHERE idTopic =?', [topicId], (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'exécution de la requête :', error);
            return res.status(500).send('Erreur lors de l\'exécution de la requête.');
        }

        if (results.length === 0 && !req.session.isLogged) {
            
            return res.render('message.ejs', { messages: 'Il n\'y a pas de nouvelles discussions.' });
        } else if (results.length === 0 && req.session.isLogged) {
            
            return res.render('message.ejs', { messages: 'Il n\'y a pas de nouvelles discussions.' });;
        } else {
            
            const reponse = results;
           // console.log(reponse)
            return res.render('message.ejs',{reponse});
        }
    });
};