# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'photolayout/version'

Gem::Specification.new do |spec|
  spec.name          = 'photolayout'
  spec.version       = Photolayout::VERSION
  spec.authors       = ['Luc Boissaye']
  spec.email         = ['luc@boissaye.fr']

  spec.summary       = 'Photolayout from Evlaa'
  spec.description   = 'Photolayout from Evlaa !'
  spec.homepage      = 'https://github.com/ombr/photolayout'
  spec.licenses      = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_runtime_dependency 'execjs', '~> 2.7', '>= 2.7.0'
  spec.add_development_dependency 'bundler', '~> 1.12'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'minitest', '~> 5.0'
end
