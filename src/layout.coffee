`import Line from './line.coffee';`
`import Css from './css.coffee'`
class Layout
  #! TODO options !
  constructor: (@_zoom, @_margin = 0.0, @_selector = '.i')->
    @_margin =  @_margin * 1.0
    @_current_line = new Line(this)
    @_lines = [@_current_line]

  add: (object)->
    if object instanceof Array
      for o in object
        @add(o)
      return this
    if @_current_line.accept(object)
      @_current_line.add(object)
    else
      @_current_line = new Line(this)
      @_lines.push(@_current_line)
      @_current_line.add(object)
    this
  getItems: (start=0, end)->
    items = []
    offset_y = 0
    if start == 0 and not end?
      for line in @_lines
        for item in line.getItems(offset_y)
          items.push(item)
        offset_y += item.h + @_margin
      return items
    raise 'ERROR '
    for line in @_lines
      height = line.height()
      if offset_y < start
        offset_y += height + @_margin
        continue
      for item in  line.getItems(offset_y)
        items.push(item)
      offset_y += height + @_margin
      if end? and offset_y >= end
        break
    items
  height: ->
    height = 0
    for line in @_lines
      height += line.height()
    height += (@_lines.length - 1) * @_margin
    height
  min_max_line_ratio: ->
    min = max = @_lines[0].ratio()
    for line in @_lines
      min = Math.min(line.ratio(), min)
      max = Math.max(line.ratio(), max)
    return [min, max]
  css: ->
    (new Css)
      .add_rules(@_selector, {
        float: 'left',
        margin: "0 #{@_margin}% #{@_margin}% 0"
      })
      .add_block(@css_for_items())
      .css()
    # .layout-container{ padding-bottom: #{@height()}% }"
    # css.add_rule(@_selector, 'position', 'absolute')
  css_for_items: ->
    css = new Css
    end_of_line_selectors = []
    for line in @_lines
      line_selectors = []
      for item in line.getItems()
        selector = @_selector+item.o.id
        css.add_rules(selector, { width: item.w+'%' })
        line_selectors.push(selector)
      css.add_rules(line_selectors.join(','), { 'padding-top': line.height()+'%' })
      end_of_line_selectors.push(selector)
    if @_margin > 0
      css.add_rules(end_of_line_selectors.join(','), {'margin-right': 0 })
    css.css()
`export default Layout;`
