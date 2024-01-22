import { v4 } from 'uuid';
import database from '../database.js';
import xss from 'xss';

export default (req, res) => {
    
    const newId = v4();   
    const idUser = req.session.idUser;
    

    const newTopic = {
        nom: xss(req.body.nom),
    };
    
    database(
        'INSERT INTO topic (id, nom, idUser) VALUES (?, ?, ? )',
        [newId, newTopic.nom, idUser],
        (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).send({
                    error: 'Erreur serveur',
                });
            }

            res.redirect("/message");
        }
    );
    
};