`import Layout from './layout.coffee'`
class ResponsiveLayout
  constructor: (@_options = {})->
    @_options.line_height ||= 200
    @_options.margin = 5 unless @_options.margin
    @_photos = []
  add: (photo)->
    if photo instanceof Array
      for p in photo
        @add(p)
      return this
    @_photos.push(photo)
    return this
  css_for_width: (width)->
    layout = new Layout(
      @_options.line_height/width,
      @_options.margin/width*100
    )
    layout.add(@_photos)
    layout.css()
  css: (breakpoints = [200, 500, 800, 1000, 1500])->
    first = breakpoints.splice(0, 1)[0]
    css = @css_for_width(first)
    for breakpoint in breakpoints
      css += "@media (min-width: #{breakpoint}px){\n\
      #{@css_for_width(breakpoint)}\
      }\n"
    css
`export default ResponsiveLayout`
