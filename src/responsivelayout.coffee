`import Layout from './layout.coffee'`
`import Css from './css.coffee'`
`import Configuration from './configuration.coffee';`
class ResponsiveLayout
  constructor: (config)->
    if config instanceof Configuration
      @_config = config
    else
      @_config = new Configuration(config)
    @_photos = []
    @_layouts = undefined
  getLayouts: ->
    return @_layouts if @_layouts?
    @_layouts = {}
    width = @_config.max_width()
    while width > @_config.min_width()
      console.log @_config.to_hash()
      console.log @_config.derivate(zoom: 100).to_hash()
      layout = new Layout(
        @_config.derivate(
          zoom: @_config.line_height()/width,
          margin: @_config.margin()/width*100
        )
      )
      layout.add(@_photos)
      @_layouts[width] = layout
      [min, max] = layout.min_max_line_ratio()
      tolerance =  width - width * @_config.tolerance()
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
