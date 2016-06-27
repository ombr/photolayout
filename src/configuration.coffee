class Configuration
  constructor: (@_config)->
  zoom: ->
    @_config.zoom || 1.0
  line_height: ->
    return 200 unless @_config.line_height?
    @_config.line_height
  margin: ->
    return 5.0 unless @_config.margin?
    @_config.margin * 1.0
  tolerance: ->
    return 0.3 unless @_config.tolerance?
    @_config.tolerance * 1.0
  max_width: ->
    return 2500 unless @_config.max_width?
    @_config.max_width * 1.0
  min_width: ->
    return 200 unless @_config.min_width?
    @_config.max_width * 1.0
  selector: ->
    '.i'
  to_hash: ->
    {
      line_height: @line_height(),
      margin: @margin(),
      tolerance: @tolerance(),
      max_width: @max_width(),
      min_width: @min_width(),
      selector: @selector(),
    }
  derivate: (options)->
    hash = @to_hash()
    for k, v of options
      hash[k] = v
    new Configuration(hash)

`export default Configuration;`
