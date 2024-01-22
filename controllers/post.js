import { v4 } from 'uuid';
import database from '../database.js';
import xss from 'xss';

export default (req, res) => {
    
    const newId = v4();
    const idTopic = req.params.idTopic;
    const idUser = req.session.idUser;
    const dateActuelle = new Date();
    const dateISO = dateActuelle.toISOString();

    const newMessage = {
        post: xss(req.body.post),
    };
    console.log(idTopic,idUser)
    database(
        'INSERT INTO messages (id, date, post, idUser, idTopic) VALUES (?, ?, ?, ?, ?)',
        [newId, dateISO, newMessage.post, idUser, idTopic],
        (error, result) => {
           
            if (error) {
                console.error(error);
                return res.status(500).send({
                    error: 'Erreur serveur',
                });
               
            }
            console.log(result)
            res.redirect(`/message/${idTopic}`);
        }
    );
};