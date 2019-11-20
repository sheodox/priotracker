require 'net/http'
require 'open-uri'
p 'Downloading Open Iconic icon files'

icon_path = './public/open-iconic.svg'
File.open(icon_path, 'w') do |file|
  open('https://raw.githubusercontent.com/iconic/open-iconic/master/sprite/open-iconic.min.svg') do |dl|
    file.write dl.read
  end
end
