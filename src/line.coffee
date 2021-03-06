`import Configuration from './configuration.coffee';`
class Line
  constructor: (config, @_layout)->
    if config instanceof Configuration
      @_config = config
    else
      @_config = new Configuration(config)
    @_objects = []
    @_objects_ratio = 0
  accept: (object)->
    return true if @_objects.length == 0
    return true if 1/@calculate_ratio_with(object) > @_config.zoom()
    false
  ratio: ->
    if @_layout._lines.indexOf(this) == @_layout._lines.length-1
      if 1/@_config.zoom() > @_objects_ratio
        return 1/@_config.zoom()
    @_objects_ratio
  height: ->
    return 0 if @_objects.length == 0
    return 100.0 / @ratio()
  add: (object)->
    if @_objects.length == 0
      @_objects_ratio = @object_ratio(object)
    else
      @_objects_ratio += @object_ratio(object)
    @_objects.push(object)
  getItems: (offset_y)->
    return [] if @_objects.length == 0
    items = []
    offset_x = 0
    line_width = 100.0 - ((@_objects.length - 1) * @_config.margin())
    ratio = @ratio()
    line_height = line_width / ratio
    for object in  @_objects
      object_ratio = @object_ratio(object)
      width = line_height * object_ratio
      items.push({
        o: object
        w: width
        h: line_height
        offset_x: offset_x
        offset_y: offset_y
      })
      offset_x += width + @_config.margin()
    items
  calculate_ratio_with: (object)->
    @_objects_ratio + @object_ratio(object)
  object_ratio: (object)->
    object.ratio
`export default Line`
