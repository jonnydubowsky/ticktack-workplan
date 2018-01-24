const nest = require('depnest')
const { h, computed, when } = require('mutant')
const get = require('lodash/get')

exports.gives = nest('app.html.topNav')

exports.needs = nest({
  'history.sync.push': 'first',
  'history.sync.back': 'first',
  'translations.sync.strings': 'first',
})

exports.create = (api) => {
  return nest('app.html.topNav', (location) => {
    const strings = api.translations.sync.strings()
    const goTo = (loc) => () => api.history.sync.push(loc)
    const back = () => api.history.sync.back()

    if (!['blogIndex', 'blogSearch'].includes(location.page)) return 

    return h('TopNav -blog', [
      h('div.left', [ 
        h('div', { 
          className: location.page === 'blogIndex' ? '-active' : '',
          'ev-click': goTo({ page: 'blogIndex' }) 
        }, strings.topNav.blogsAll),
        h('div', { 
          className: location.page === 'blogSearch' ? '-active' : '',
          'ev-click': goTo({ page: 'blogSearch' }) 
        }, strings.topNav.blogSearch),
      ]),
      h('div.right', [ 
        h('Button -strong', { 'ev-click': () => api.history.sync.push({ page: 'blogNew' }) }, strings.blogNew.actions.writeBlog),
      ])
    ])

    return h('TopNav -back', [
      h('div.left', [ 
        h('div.-back', { 'ev-click': back }, [ 
          h('i.fa.fa-chevron-left'),
          strings.blogIndex.title
        ]),
      ]),
      h('div.right', [ 
      ])
    ])
  })
}

