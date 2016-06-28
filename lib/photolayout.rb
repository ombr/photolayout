require "photolayout/version"
require 'execjs'

module Photolayout
  # Super Layout
  class Layout
    def initialize(config)
      @_config = config
      @_photos = []
    end

    def add(photo)
      @_photos.push photo
    end

    def photos_serialized
      @_photos.each_with_index.map do |photo, i|
        { ratio: photo[:ratio], id: i }
      end
    end

    def items
      Photolayout.context.call(
        'photolayout.default.Layout.layout',
        @_config,
        photos_serialized
      ).map do |item|
        item['o'] = @_photos[item['o']['id']]
        item
      end
    end
  end

  def self.source
    File.read(
      File.expand_path('../../dist/photolayout.js', __FILE__)
    )
  end

  def self.context
    @context ||= ExecJS.compile(source)
  end

  def self.layout(options, photos)
    layout = Layout.new(options)
    photos.each do |photo|
      layout.add(photo)
    end
    layout.items.each do |item|
      yield(item)
    end
  end
end
