const { averageRating } = require("./Product");

module.exports.Query= {
    hello: () => {
      return ["Hello","World"];
    },
    products: (parent, {filter}, { db}) => {
      let filteredProducts = db.products
        .map(product => ({...product, averageRating: averageRating(product.id, db.reviews)}));
      if(filter && (filter.onSale === true || filter.onSale === false)){
        filteredProducts = filteredProducts
          .filter(product => product.onSale === filter.onSale)
      }
      if(filter && filter.averageRating >=0){
        filteredProducts = filteredProducts
          .filter(product => product.averageRating === filter.averageRating);
      }
      console.log(filteredProducts);
      return filteredProducts;
    },
    product: (parent, {id: productId}, {db}) => db.products
      .find(product => product.id === productId),
    categories: (parent, args, {db}) => db.categories,
    category: (parent, {id: categoryId}, {db}) => db.categories
      .find(category => category.id === categoryId),
    reviews: (parent, args, {db}) => db.reviews
  };