const { log } = require("console");
const Product = require("../models/product");
const fs = require("fs");
const path = require("path");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  console.log("Post add product");
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  console.log("getEditProduct");
  const editMode = req.query.edit;
  // console.log("req" , editMode)
  console.log("editmode", !!editMode);
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  console.log("EDIT");
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updateImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const updatedPrice = req.body.price;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updateImageUrl,
    updatedDesc,
    updatedPrice
  );
  console.log("udpate product", updatedProduct);
  updatedProduct.save();

  // redirect to admin page.
  res.redirect("/admin/products");
};

exports.deleteProduct = (req, res, next) => {
  console.log("deleteProduct");
  const prodId = req.body.productId;
  // console.log("deleting product",prodId)

  const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
  );

 


  fs.readFile(p, (err, products) => {
    console.log("enterd in reddfile");
    if (err) {
      console.log("got an error while reading data");
      return;
    }

    products = JSON.parse(products);
    const deleteItemIndex = products.findIndex((prods) => prodId === prods.id);
    const updatedProductsAfterDeleting = products.filter(
      (prods) => prods.id !== prodId
    );
    fs.writeFile(p, JSON.stringify(updatedProductsAfterDeleting), (err) => {
      if (err) console.log("there is something error while deleting.");
    });

    console.log("deleteItem  ", products[deleteItemIndex]);
  });

  // redirect to admin page.
  res.redirect("/admin/products");

};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
