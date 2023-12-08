const {averageRating } = require('./Product');
module.exports.Category = {
    products: ({id: categoryId}, {filter}, { db}) => {
      const filteredProducts = db.products
        .filter(product => product.categoryId === categoryId)
        .map(product => ({...product, averageRating: averageRating(product.id, db.reviews)}));
      
      if(filter && (filter.onSale === true || filter.onSale === false)){
        filteredProducts = filteredProducts
          .filter(product => product.onSale === filter.onSale)
      }
      if(filter && filter.averageRating >=0){
        filteredProducts = filteredProducts
          .filter(product => product.averageRating === filter.averageRating);
      }
      return filteredProducts
    }
  };