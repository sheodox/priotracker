require 'net/http'
require 'zip'
require 'open-uri'
require 'fileutils'
p 'Downloading Open Iconic icon files'

zip_path = './tmp/openiconic.zip'
icon_path = './public/openiconic'
File.open(zip_path, 'w') do |file|
  open('https://github.com/iconic/open-iconic/archive/master.zip') do |zip|
    file.write zip.read
  end
end

FileUtils.mkdir_p(icon_path) unless File.directory?(icon_path)

Zip::File.open(zip_path) do |zipfile|
  zipfile.each do |file|
    unless file.name.start_with?('open-iconic-master/svg') && (File.extname(file.name) == '.svg')
      next
    end

    svg_save_path = File.join(icon_path, File.basename(file.name))
    p svg_save_path
    File.open(svg_save_path, 'w+') do |icon_save_file|
      zipfile.extract(file, icon_save_file) { true }
    end
  end
end
