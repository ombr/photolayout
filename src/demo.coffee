`import $ from 'jquery';`
$ ->
  images = []
  for i in [0..5000]
    images.push {
      id: i
      ratio: 0.2+Math.random()*1.5
      color: Math.round(Math.random()*75) + 50
    }
  $layout = $('body')
  for image in images
    c = image.color
    style = "background-color: rgb(#{c},#{c},#{c});"
    $image = "<div class=\"i i#{image.id}\" style=\"#{style}\"></div>"
    $layout.append($image)
  photolayout = new window.photolayout.default(line_height: 50, margin: 0)
  photolayout.add(images)
  $layout.append('<style>'+photolayout.css()+'</style>')
