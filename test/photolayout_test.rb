require 'test_helper'

class PhotolayoutTest < Minitest::Test
  def setup
    @photos = Array.new(5).map do
      {
        id: rand(100),
        ratio: rand + 0.25
      }
    end
  end

  def test_that_it_has_a_version_number
    refute_nil ::Photolayout::VERSION
  end

  def test_return_widths
    items = []
    Photolayout.layout({ margin: 5, zoom: 1 / 8 }, @photos) do |item|
      assert item['w']
      items.push item
    end
    assert items.length == @photos.length
  end

  def test_source
    assert Photolayout.source
  end
end
