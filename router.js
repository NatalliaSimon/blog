import express from "express";
import { renderListPage, addPost, profil, newUserGet,loginGet, topic,postAll} from "./controllers/routesGet.js";
import addNew from "./controllers/addNew.js";
import Delete from "./controllers/delete.js";
import login from "./controllers/login.js";
import logout from "./controllers/logout.js";
import newUser from "./controllers/newUser.js";
import newTopic from "./controllers/newTopic.js";
import Post from "./controllers/post.js";
import barre from "./controllers/barre.js";
import allsaerch from "./controllers/allsaerch.js";
import article from "./controllers/article.js";
const router = express.Router();

const checkAuthentication = (req, res, next) => {
    
    if(!req.session.isLogged) {
        res.redirect('/login');
        return;
    }
   
    next();
};

router.use((req, res, next) => {
    res.locals.isLogged = req.session.isLogged;
   // console.log(res.locals.isLogged)
    next();
});


router.get('/newUser',newUserGet);
router.post('/newUser',newUser);
router.get('/login',loginGet);
router.post('/login', login);
router.get('/logout',logout); 
router.get('/profil',profil); 
router.get('/delete',checkAuthentication, Delete); 
router.get('/',renderListPage);
router.get('/add',addPost);
router.post('/add',addNew);
router.get('/forum',topic);
router.post('/forum',newTopic);
router.get('/message/:idTopic',postAll);
router.post('/message/:idTopic',Post);
router.post('/forum1',barre);
router.get('/homesearch',allsaerch);
router.get('/article/:titre',article);

export default router;
