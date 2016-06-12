class Css
  constructor: ->
    @_css = ''
  add_block: (css, wrapper)->
    if wrapper?
      # @_css += "#{wrapper}{\n  #{css.split("\n").join("\n  ")}}\n"
      @_css += "#{wrapper}{#{css}}"
    else
      @_css += css
    return this
  add_rules: (selector, rules)->
    css = ''
    for property, value of rules
      # css+="#{property}: #{value};\n"
      css+="#{property}:#{value};"
    @add_block(css, selector)
    return this
  css: ->
    @_css
`export default Css`
