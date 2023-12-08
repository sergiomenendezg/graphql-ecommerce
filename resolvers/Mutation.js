const { v4 } = require("uuid")

module.exports.Mutation = {
  createCategory: (parent, {categoryName}, {db}) => {
    const category = {name: categoryName, id: v4()};
    db.categories.push(category);
    return category;
  },

   createProduct: (parent, {input}, {db}) => {
    const product = {...input, id: v4()};
    db.products.push(product);
    return product;
  },

  createReview: (parent, {input}, {db}) => {
    const review = {...input, id: v4()};
    db.reviews.push(review);
    return review;
  },
  deleteCategory: (parent, {id}, {db}) => {
    db.categories = db.categories.filter(category => 
      category.id !== id
    );
    db.products = db.products.map(product => ({
      ...product,
      categoryId: product.categoryId === id ? null: product.categoryId
    }))
    return true
  },
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter(product => product.id !== id);
    db.reviews = db.reviews.filter(review => review.productId !== id);
    return true;
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter(review => review.id !== id);
    return true;
  },
  updateCategory: (parent, { id, categoryName }, { db}) => {
    let update = null;
    db.categories = db.categories.map(category => {
      if(category.id !== id){
        return category;
      }
      update = {
        ...category,
        name: categoryName
      }
      return update;
    })
    
    return update;
  },
  updateProduct: (parent, { id, input }, { db}) => {
    let update = null;
    db.products = db.products.map(product => {
      if(product.id !== id){
        return product;
      }
      update = {
        ...product,
        ...input
      }
      return update;
    })
    
    return update;
  },

  updateReview: (parent, { id, input }, { db}) => {
    let update = null;
    db.reviews = db.reviews.map(review => {
      if(review.id !== id){
        return review;
      }
      update = {
        ...review,
        ...input
      }
      return update;
    })
    
    return update;
  }


}