
module.exports.averageRating = (productId, reviews) => {
  const filteredRatings = reviews
        .filter(review => review.productId === productId);
  if(filteredRatings.length === 0){
    return [];
  }
      return Math.round(filteredRatings
        .map(review => review.rating)
        .reduce((previous, current) => previous + current)/filteredRatings.length)
}

module.exports.Product ={
    category: ({categoryId}, args, {db}) => db.categories
      .find(category => categoryId === category.id),
    reviews: ({id: productId}, args, {db}) => db.reviews
      .filter(review => review.productId === productId),
    averageRating: ({id: productId}, args, {db}) => this.averageRating(productId, db.reviews)
  };
