
//importo lista posts da posts.js
const listaPosts = require('../data/postsList')

function index(req, res) {

    let filteredList = listaPosts;

    if (req.query.tags) {
        filteredList = listaPosts.filter(
            post => post.tags.includes(req.query.tags)
        );
    }

    res.json({ numeroPosts: filteredList.length, filteredList });
}

function show(req, res) {
    const id = parseInt(req.params.id)

    const postId = listaPosts.find((post) => post.id === id)

    if (!postId) {
        return res.status(404).json({
            error: 'not found - errore 404',
            message: 'prodotto non trovato'
        });
    }
    res.json(postId);
}

function store(req, res) {
    //creo id con metodo date
    const newId = Date.now();
    // Creiamo un nuovo oggetto post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags,
    }
    // Aggiungiamo il nuovo post alla lista
    listaPosts.push(newPost);

    // controlliamo in console che stampa array oggetti aggiornato
    console.log(listaPosts);

    // Restituiamo lo status corretto e il post
    res.status(201);

    res.json(newPost);

}

function update(req, res) {
    // trasformo l id in un numero 
    const id = parseInt(req.params.id)

    const myPost = listaPosts.find((post) => post.id === id)
    if (!myPost) { //SE  myPost non esiste l operatore logico NOT ritorna lo status error
        return res.status(404).json({
            error: 'not found - errore 404',
            message: 'prodotto non trovato'
        });
    }
    //aggiorno il post
    myPost.title = req.body.title;
    myPost.content = req.body.content
    myPost.image = req.body.image
    myPost.tags = req.body.tags
    //controllo
    console.log(listaPosts);

    //restitrusco post appena aggiornato
    res.json(myPost)

}

function modify(req, res) {
    // trasformo l id in un numero 
    const id = parseInt(req.params.id)

    // Metodo find per trovare il post da modificare 
    const myPost = listaPosts.find((post) => post.id === id)
    if (!myPost) {
        return res.status(404).json({
            error: 'not found - errore 404',
            message: 'prodotto non trovato'
        });
    }
    //aggiurno il post riassegnando valori delle proprita all'interno dell'oggetto
    // operatore terniaro per individuare le propetà da modificare
    req.body.title ? myPost.title = req.body.title : myPost.title = myPost.title
    req.body.content ? myPost.content = req.body.content : myPost.content = myPost.content
    req.body.tags ? myPost.tags = req.body.tags : myPost.tags = myPost.tags
    req.body.image ? myPost.image = req.body.image : myPost.image = myPost.image
    //controllo
    console.log(listaPosts);
    //restitrusco json aggiornato
    res.json(myPost)

}

function destroy(req, res) {
    //recupero l'id dall'URL e lo trasformo in un numero con parse int
    const id = parseInt(req.params.id)
    //metodo find per trovare il post usando id
    const post = listaPosts.find((pst) => pst.id === id)
    //valido che il post esista
    if (!post) {
        return res.status(404).json({
            error: 'not found - errore 404',
            message: 'prodotto non trovato'
        });
    }
    //rimuovo post con metodo splice 
    listaPosts.splice(listaPosts.indexOf(post), 1);
    // forziamo status secondo convenzioni REST che chiude anche function
    res.sendStatus(204)
}

// esportiamo tutto
module.exports = { index, show, store, update, destroy, modify }