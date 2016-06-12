`import $ from 'jquery';`
`import _ from 'lodash';`
`import css from './demo.sass';`
`export default {};`
$ ->
  $style = $('<style></style>')
  $body = $('body')
  $body.append($style)
  images = []

  processing_images = false
  reload_images = ->
    return if processing_images
    processing_images = true
    $('.i').remove()
    images.length = 0
    for i in [0..Math.min(1000, $('#images').val()-1)]
      images.push {
        id: i
        ratio: 0.2+Math.random()*1.5
      }
      c = Math.round(Math.random()*75) + 50
      style = "background-color: rgb(#{c},#{c},#{c});"
      $body.append("<div class=\"i i#{i}\" style=\"#{style}\"></div>")
    reload_layout()
    processing_images = false

  processing_layout = false
  reload_layout = ->
    return if processing_layout
    processing = true
    $layout = $('body')
    photolayout = new window.photolayout.default(
      line_height: Math.max(25, $('#line_height').val()),
      margin: Math.max(0, Math.min(100, $('#margin').val())),
    )
    photolayout.add(images)
    css = photolayout.css()
    $style.html(css)
    $('#css_length').html(css.length)
    $('#breakpoints').html(photolayout.breakpoints().join(', '))
    processing_layout = false
    reload_stats()

  reload_stats = _.throttle(->
    max = 0
    sum = 0
    $items = $('.i')
    $items.each (i, e)->
      height = $(e).outerHeight()
      max = Math.max(height, max)
      sum += height
    $('#height_max').html(Math.round(max, 2))
    $('#height_avg').html(Math.round(sum/$items.length, 2))
  , 200)
  $(window).on 'resize', reload_stats

  on_change = (selector, callback)->
    $body.on 'change', selector, callback
    $body.on 'keyup', selector, callback
  on_change('#images', reload_images)
  reload_images()
  on_change('#line_height', reload_layout)
  on_change('#margin', reload_layout)
