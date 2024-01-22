import { v4 } from 'uuid';
import query from '../database.js';
import formidable from 'formidable';
import fs from 'fs';



export default (req, res) => {
    const formData = formidable();

    formData.parse(req, (error, fields, files) => {
        if (error) {
            console.error(`Erreur lors de la récupération de la photo`);
            res.status(500).send('Erreur serveur');
            return;
        }
        // Récupération du chemin temporaire du fichier
        let oldPath = files.photo[0].filepath;

        // Chemin vers où sera stocké le fichier
        let newPath = 'public/' + files.photo[0].originalFilename;

        // R2cupération du nom du fichier pour le stocker en BDD
        let imageName = files.photo[0].originalFilename;
        
        // Copie le fichier depuis le dossier temporaire vers le dossier de destination
        fs.copyFile(oldPath, newPath, (error) => {
            if (error) {
                console.error(`Erreur lors de la récupération de la photo`);
                res.status(500).send('Erreur serveur');
                return;
            }
            // Insertion des post dans la BDD
            query(
                `INSERT INTO publication(id, titre, text, photo) VALUES (?, ?, ?, ?)`,
                [v4(), fields.titre, fields.text, imageName],
                (error, results) => {
                    if (error) {
                        console.error(`Erreur lors de l'exécution de la requête ${error}`);
                        res.status(500).send('Erreur serveur');
                        return;
                    }
                    
                    res.send('Votre article créé');
                }
            );
        });
    });
};
