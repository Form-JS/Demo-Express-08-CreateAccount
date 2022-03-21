const homeController = {

    index: (req, res) => {
        console.log(req.session);

        // res.render('home/index', { title: 'Demo', session: req.session });
        res.renderWithData('home/index');
    }

};

module.exports = homeController;