$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "parliament/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "parliament"
  s.version     = Parliament::VERSION
  s.authors     = ["Kevin Brown", "Justin Licata"]
  s.email       = ["chevinbrown@gmail.com", "licata.justin@gmail.com"]
  s.homepage    = "https://github.com/proctoru/parliament"
  s.summary     = "Vanilla javascript nested forms for rails."
  s.description = "Vanilla javascript nested forms for rails."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 5.0"

  s.add_development_dependency "pry"
  s.add_development_dependency "sqlite3"
  s.add_development_dependency "babel-transpiler"
end
