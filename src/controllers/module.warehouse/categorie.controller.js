const { response } = require('express');
const { CategorySchema } = require('../../models');

const getCategories = async (req, res = response) => {

    try {
        const categories = await CategorySchema.find({ state: true })
            .populate('userId', 'name');

        res.json({
            ok: true,
            categories
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const createCategory = async (req, res = response) => {

    const category = new CategorySchema(req.body);

    try {
        category.userId = req.uid;

        const categorySave = await category.save();
        const categoryWithRef = await CategorySchema.findById(categorySave.id)
            .populate('userId', 'name');

        res.json({
            ok: true,
            category: categoryWithRef
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}
const updateCategory = async (req, res = response) => {

    const categoryId = req.params.id;

    try {

        const newCategory = {
            ...req.body
        }

        const categoryUpdate = await CategorySchema.findByIdAndUpdate(categoryId, newCategory, { new: true });

        const categoryWithRef = await CategorySchema.findById(categoryUpdate.id)
            .populate('userId', 'name');
        res.json({
            ok: true,
            category: categoryWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
const deleteCategory = async (req, res = response) => {

    const categoryId = req.params.id;

    try {
        const category = await CategorySchema.findById(categoryId)

        let newCategory = { ...category }
        newCategory._doc.state = false;

        const categoryDelete = await CategorySchema.findByIdAndUpdate(categoryId, newCategory, { new: true });

        const categoryWithRef = await CategorySchema.findById(categoryDelete.id)
            .populate('userId', 'name');
        res.json({
            ok: true,
            category: categoryWithRef
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}
module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}