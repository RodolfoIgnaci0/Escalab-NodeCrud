const { Router } = require('express')
const { ArticleService } = require('../../services')

const { mongo: { queries } } = require('../../database')
const { article: { getArticles } } = queries

const ArticleRouter = Router()
const response = require('./response')


// todos los articulos guardados
ArticleRouter.route('/article')
    .get(async (req,res) => {
      try {
        const articles = await getArticles()
        response({ error: false, message: articles, res, status: 200 })
      } catch (error) {
        console.error(error)
        response({ message: 'Internal server error', res })
      }
      
    })

// un articulo especifico
ArticleRouter.route('/article/:id')
    .get(async (req,res) => {
      const {params: { id } } = req

      try {  
        const articleService = new ArticleService({ id })
        const article = await articleService.getArticle()

        response({ error: false, message: article, res, status: 200 })
      } catch (error) {
        console.error(error)
        response({ message: 'Internal server error', res })
      }
    })
    .post(async (req, res) => {
        const {
          body: { name, price },
          params: { userId }
        } = req
        const articleService = new ArticleService({ name, price, userId })
        
        try {
          const result = await articleService.saveArticle()
          response({
            error: false,
            message: result,
            res,
            status: 201
          })
        } catch (error) {
          console.error(error)
        }
      })
      .delete(async (req,res) => {
        const {params: {id} } = req

        try {
          const articleService = new ArticleService({ id })
          const article = await articleService.deleteArticle()
          response({ error: false, message: article, res, status: 200 })
        } catch (error) {
          console.log(error)
        }
      })


module.exports = ArticleRouter