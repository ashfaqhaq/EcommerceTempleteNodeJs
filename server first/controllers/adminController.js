const Product = require("../models/product");

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts()
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         path: "/admin/products",
//         PageTitle: "Admin Products",
//       });
//     })
//     .catch((err) => console.log(err));
// };

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    PageTitle: "Add Product",
    path: "/admin/edit-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(title, price, description, imageUrl);

  product.save()
    .then((result) => {
      console.log(result);
      res.redirect("/products");
    })
    .catch((err) => console.log(err));
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } }) //here we will get array always even if it's only 1 product too
//     .then((products) => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect("errorPage");
//       }

//       res.render("admin/edit-product", {
//         PageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((err) => console.log(err));
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.price = updatedPrice;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDesc;
//       return product.save();
//     })
//     .then((result) => {
//       res.redirect("/admin/products");
//       console.log(result);
//     })
//     .catch((err) => console.log(err));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       return product.destroy();
//     })
//     .then((result) => {
//       console.log(result);
//       res.redirect("/admin/products");
//     })
//     .catch((err) => console.log(err));
// };
