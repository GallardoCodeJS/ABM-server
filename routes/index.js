const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

//Login POST page
router.post('/register', (req, res) => {
    console.log(req.body);
    //res.send('Datos recibidos');
    //Session
    req.session.mysession = req.body;
    //Redicte
    res.redirect('/profile');
});

//Profile Page
router.get('/profile', (req, res) => {

    //Guarda los datos de session
    const user = req.session.mysession;
    //Envia los datos a la pagina profile
    res.render('profile', {
        user
    });
});

//Index page default
router.get('/about', (req, res) => {
    const user = req.session.mysession;
    if(user){
        res.render('about',{
            user
        });
    }else{
        console.log("No inició session");
        res.redirect('/');
    }
    
    
});

module.exports = router;