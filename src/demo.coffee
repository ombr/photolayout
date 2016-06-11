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
    $image = "<div class=\"i i#{image.id}\" style=\"background-color: rgb(#{c},#{c},#{c});\"></div>"
    $layout.append($image)
  console.log 'ICI ? '
  $layout.append('<style>'+(new photolayout.default(line_height: 50, margin: 0)).add(images).css()+'</style>')
