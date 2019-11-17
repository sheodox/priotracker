task default: ['dl']

task :dl do
  ruby 'lib/tasks/download-icons.rb'
end