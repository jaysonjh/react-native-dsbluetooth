require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNDSBluetooth"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = 'https://github.com/jaysonjh/react-native-dsbluetooth'
  s.license      = package["license"]
  s.author       = { package["author"]["name"] => package["author"]["email"] }
  s.platform     = :ios, "9.0"
  s.source       = { :git => "https://github.com/jaysonjh/react-native-dsbluetooth.git", :tag => "master" }
  s.source_files = "ios/**/*.{h,m}"
  s.public_header_files = 'ios/**/*.h'
  s.vendored_frameworks = ['ios/Frameworks/DesayBluetooth.framework','ios/Frameworks/SSZipArchive.framework']
  s.requires_arc = true
  s.dependency "React"
end
