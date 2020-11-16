const Category = require('../models/category_model');
const slugify =require('slugify');

function makeCategoryList(categories, parentId=null){
    const categoryList = [];

    let array_of_null_or_parenetId_Category;
    if(parentId == null){
        array_of_null_or_parenetId_Category = categories.filter(cat => cat.parentId == null);
    }else{
        array_of_null_or_parenetId_Category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of array_of_null_or_parenetId_Category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            categoryImage: cate.categoryImage,
            children: makeCategoryList(categories, cate._id)
        })
    }

    return categoryList;
}

module.exports.createCategory = function(req,res){
    const cotegoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }

    if(req.file){
        cotegoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if(req.body.parentId){
        cotegoryObj.parentId = req.body.parentId;
    }
    Category.create(cotegoryObj, function(err, category){
        if(err){
            console.log(err);
            return res.status(400).json({ 
                err,
                message: "error in creatring category"});
        }

        return res.status(201).json({
            category
        }) 

    })
}


module.exports.getCategory = (req,res) =>{
    Category.find({}, function(err, categories){
        if(err){
            console.log(err);
            return res.status(400).json({ 
                err,
                message: "error in creatring category"});
        }

        categoryList = makeCategoryList(categories)

        return res.status(201).json({
            categoryList
        })

    })
}