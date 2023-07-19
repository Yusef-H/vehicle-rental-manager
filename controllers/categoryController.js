const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

exports.category_list = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find()
        .exec();
    
    res.render('category_list', {title: 'Category List', category_list: allCategories});
})

exports.create_category_get = asyncHandler(async (req, res, next) => {
    res.render("category_create", { title: "Create Category" });
});

exports.create_category_post = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    // Create new category
    const newCategory = new Category({ name });

    // Save the new category to the database
    const savedCategory = await newCategory.save();
    res.redirect("/catalog/categories");
    
});
  
  