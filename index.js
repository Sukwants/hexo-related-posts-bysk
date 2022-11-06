/******** Hexo Plugin: hexo-related-posts-bysk ******** 
 *    _____       _                         _         * 
 *   / ____|     | |                       | |        * 
 *  | (___  _   _| | ____      ____ _ _ __ | |_ ___   * 
 *   \___ \| | | | |/ /\ \ /\ / / _` | '_ \| __/ __|  * 
 *   ____) | |_| |   <  \ V  V / (_| | | | | |_\__ \  * 
 *  |_____/ \__,_|_|\_\  \_/\_/ \__,_|_| |_|\__|___/  * 
 *                                                    * 
 ****************** Made By Sukwants ******************/

var assign = require('lodash.assign');

function addCount(array, searchProperty, newProperty) {
  return array.reduce(function(newArray, item) {
    var i = objectArrayIndexOf(newArray, item[searchProperty], searchProperty);
    if(i === -1){
      item[newProperty]  = 1;
      newArray.push(item);
    }else{
      newArray[i][newProperty]  = newArray[i][newProperty] + 1;
    }
    return newArray;
  }, []);
}

function objectArrayIndexOf(array, searchTerm, property) {
  for(var i = 0; i < array.length; i++){
    if (array[i][property] === searchTerm) return i;
  }
  return -1;
}

function dynamicSort(property, order) {
  var sortOrder = 1;
  if(order == 'negative') sortOrder = -1;
  return function (a, b) {
    var result = (a[property] < b[property]) ? -1 :
                 (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  };
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function truncate(array, expectedLength) {
  var ansArray = [];
  for (var i = 0; i < array.length && i < expectedLength; i++) {
    ansArray.push(array[i]);
  }
  return ansArray;
}

function relatedPostsBySk(_post, options, _hexo) {
  if (!options) {
    options = {};
  }

  options = assign({
    maxCount: 5,
    orderBy: 'date',
    order: 'negative',
    excludeTags: [],
    excludeCategories: []
  }, options);

  if(options.maxCount === undefined || options.maxCount === null){
    options.maxCount = 5;
  }
  var orderbyOption = ['date', 'updated', 'title', 'random'];
  if(options.orderBy === undefined || options.orderBy === null || orderbyOption.indexOf(options.orderBy) === -1){
    options.orderBy = 'date';
  }
  var orderOption = ['positive', 'negative'];
  if(options.order === undefined || options.order === null || orderOption.indexOf(options.order) === -1){
    options.order = 'negative';
  }
  if(options.excludeTags === undefined || options.excludeTags === null){
    options.excludeTags = [];
  }
  if(options.excludeCategories === undefined || options.excludeCategories === null){
    options.excludeCategories = [];
  }

  var postList = [];
  _post.tags.each(function(tag){
    if(options.excludeTags.indexOf(tag.name) === -1){
      tag.posts.each(function(post){
        postList.push(post);
      });
    }
  });
  _post.categories.each(function(category){
    if(options.excludeCategories.indexOf(category.name) === -1){
      category.posts.each(function(post){
        postList.push(post);
      });
    }
  });

  postList = addCount(postList, '_id', 'count');

  var thisPostPosition = objectArrayIndexOf(postList, _post._id, '_id');
  postList.splice(thisPostPosition, 1);

  if(options.orderBy === 'random'){
    shuffle(postList);
  }else{
    postList.sort(dynamicSort(options.orderBy, options.order));
  }
  postList.sort(dynamicSort('count', 'negative'));

  postList = truncate(postList, options.maxCount);

  return postList;
}

hexo.extend.helper.register('related_posts_bysk', function(post, options, hexo) {

   return  relatedPostsBySk(post, options, hexo);
});
