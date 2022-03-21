const customRenderMiddleware = (title) => {

    return (req, res, next) => {
        /**
         * Methode de rendu ajouter par le "Custom Render Middleware"
         * @param {string} template 
         * @param {object} data 
         */
        res.renderWithData = (template, data = {}) => {

            res.render(template, {
                title: title,
                session: req.session,
                ...data
            });
        };

        next();
    };
};

module.exports = customRenderMiddleware;