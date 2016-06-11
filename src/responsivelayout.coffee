`import Layout from './layout.coffee'`
class ResponsiveLayout
  constructor: (@_options = {})->
    @_options.line_height ||= 200
    @_options.margin = 5 unless @_options.margin
    @_options.max_width = 2000 unless @_options.max_width
    @_options.min_width = 100 unless @_options.min_width
    @_options.tolerance = 50 unless @_options.tolerance
    @_photos = []
  add: (photo)->
    if photo instanceof Array
      for p in photo
        @add(p)
      return this
    @_photos.push(photo)
    return this
  layout_for: (width)->
    layout = new Layout(
      @_options.line_height/width,
      @_options.margin/width*100
    )
    layout.add(@_photos)
    layout
  breakpoints: ->
    return @_breakpoints if @_breakpoints?
    @css()
    @_breakpoints
  css: ->
    width = @_options.max_width
    css = ''
    i = 0
    @_breakpoints = []
    while width > @_options.min_width
      @_breakpoints.push(width)
      layout = @layout_for(width)
      css += "@media (max-width: #{width}px){\n\
      #{layout.css()}\
      }\n"
      i+=1
      break if i > 50 #!TODO Add error message
      width -= @_options.tolerance * layout.min_line_ratio()
    css
`export default ResponsiveLayout`
