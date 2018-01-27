begin
  require 'bundler/setup'
rescue LoadError
  puts 'You must `gem install bundler` and `bundle install` to run rake tasks'
end

require 'bundler/gem_tasks'
require 'rake/testtask'
require 'babel/transpiler'

Rake::TestTask.new(:test) do |t|
  t.libs << 'test'
  t.pattern = 'test/**/*_test.rb'
  t.verbose = false
end

task default: :test

namespace :assets do
  desc 'Compile assets'
  task :compile do
    ROOT = Pathname(File.dirname(__FILE__))
    SOURCE_DIR = ROOT.join('lib/assets/javascripts/src/parliament')
    BUILD_DIR = ROOT.join('app/assets/javascripts')

    source = SOURCE_DIR.join('index.js')
    transformed = Babel::Transpiler.transform(File.read(source))
    File.write(BUILD_DIR.join('parliament.js'), transformed['code'])
  end
end
