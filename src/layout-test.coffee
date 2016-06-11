#= require layout
#= require ResponsivePhotoLayout
$ ->
  images = []
  for i in [0..50]
    images.push {
      id: i
      ratio: 0.2+Math.random()*1.5
      color: Math.round(Math.random()*75) + 25
    }
  $layout = $('.layout-container-wrapper')
  for image in images
    c = image.color
    $image = "<div class=\"i i#{image.id}\" style=\"background-color: rgb(#{c},#{c},#{c});\"></div>"
    $layout.append($image)
  setTimeout(->
    $layout.append('<style>'+(new ResponsivePhotoLayout(line_height: 50, margin: 0)).add(images).css()+'</style>')
  , 200)
