`import Line from './line.coffee';`
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
  css: ->
    # "#{@_selector}{ position: absolute; }\n\
    "#{@_selector}{float: left; margin: 0 #{@_margin}% #{@_margin}% 0; }\n\
    #{@css_for_items()}\
    .layout-container{ padding-bottom: #{@height()}% }"
  css_for_items: ->
    css=''
    items = @getItems()
    for item in items
      # css += "#{@_selector}#{item.o.id}{width: #{item.w}%; padding-top: #{item.h}%;}\n"
      css += "#{@_selector}#{item.o.id}{top: #{item.offset_y}%; left: #{item.offset_x}%;width: #{item.w}%; padding-top: #{item.h}%;}\n"
    end_of_line_selectors = []
    for line in @_lines
      [..., last] = line._objects
      end_of_line_selectors.push("#{@_selector}#{last.id}")
    css += "#{end_of_line_selectors.join(', ')}{ margin-right: 0; }\n"
    css

`export default Layout;`
