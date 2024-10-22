const Cat = require('../models/cat');

const index = async (req, res) => {
    const allCats = await Cat.find();
    res.render("cats/index.ejs", { cats: allCats });
}

const newCat = (req, res) => {
    res.render("cats/new.ejs");
}

const getCat = async (req, res) => {
    const foundCat = await Cat.findById(req.params.catId);
    res.render("cats/show.ejs", { cat: foundCat });
}

const showCat = async (req, res) => {
    await Cat.create(req.body);
    res.redirect("/cats"); 
}

const editCat = async (req, res) => {
    const foundCat = await Cat.findById(req.params.catId);
    res.render('cats/edit.ejs', {
        cat: foundCat
    });
}

const updateCat = async (req, res) => {
    const formData = req.body;
    
    await Cat.findByIdAndUpdate(req.params.catId, formData)

    res.redirect(`/cats/${req.params.catId}`)
}

const deleteCat = async (req, res) => {
    await Cat.findByIdAndDelete(req.params.catId);
    res.redirect("/cats");
}

module.exports = {
    index,
    new: newCat,
    get: getCat,
    show: showCat,
    edit: editCat,
    update: updateCat,
    delete: deleteCat,
}