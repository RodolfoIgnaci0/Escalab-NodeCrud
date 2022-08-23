const { ArticleModel } = require('../models')

/**
 * @param {Object} article
 * @param {String} article.id
 * @param {String} article.name
 * @param {Integer} article.price
 * @returns saved article
 */ 
 const saveArticle = async article => {
  const savedArticle = new ArticleModel(article)
  await savedArticle.save()
  return savedArticle
}

/**
 * @param {String} id
 * @returns found url
 */
const getOneArticle = async id => {
  const articles = await ArticleModel.find({ id }).populate('userId')

  return articles
}

const getArticles = async () => {
  const articles = await ArticleModel.find()
  return articles
}

module.exports = {
  saveArticle,
  getArticles,
  getOneArticle
}
