`import Layout from './layout.coffee'`
`import Css from './css.coffee'`
class ResponsiveLayout
  constructor: (@_options = {})->
    @_options.line_height ||= 200
    @_options.margin = 5 unless @_options.margin?
    @_options.max_width = 2500 unless @_options.max_width?
    @_options.min_width = 200 unless @_options.min_width?
    @_options.tolerance = 0.3 unless @_options.tolerance?
    @_photos = []
    @_layouts = undefined
  getLayouts: ->
    return @_layouts if @_layouts?
    @_layouts = {}
    width = @_options.max_width
    while width > @_options.min_width
      layout = new Layout(
        @_options.line_height/width,
        @_options.margin/width*100
      )
      layout.add(@_photos)
      @_layouts[width] = layout
      [min, max] = layout.min_max_line_ratio()
      tolerance =  width - width * @_options.tolerance
      width -= Math.round(tolerance / min)
    @_layouts
  add: (photo)->
    if photo instanceof Array
      for p in photo
        @add(p)
      return this
    @_photos.push(photo)
    @_layouts = undefined
    return this
  layout_for: (width)->
    layout
  breakpoints: ->
    Object.keys(@getLayouts()).sort((a,b)->
      b-a
    )
  css: ->
    css = new Css
    for width in @breakpoints()
      css.add_block(@_layouts[width].css(), "@media (max-width: #{width}px)")
    css.css()
`export default ResponsiveLayout`
