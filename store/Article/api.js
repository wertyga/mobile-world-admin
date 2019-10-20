import { fetch } from 'shared/utils'

export const fetchArticleList = (upToDate, fields = '', opts) => fetch({
  method: 'get',
  url: '/api/article/list',
  params: {
    upToDate,
    fields,
    ...opts,
  },
})

export const fetchArticle = (id) => fetch({
  method: 'get',
  url: '/api/article',
  params: {
    id,
  }
})