
Pod::Spec.new do |s|
  s.name         = "RNDSBluetooth"
  s.version      = "1.0.2"
  s.summary      = "RNDSBluetooth"
  s.description  = <<-DESC
                  React Native for Desay Bluetooth
                   DESC
  s.homepage     = "https://github.com/jaysonjh/jaysonjh.github.io"
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "8.0"
  s.source       = { :git => "https://github.com/jaysonjh/react-native-dsbluetooth.git", :tag => "master" }
  s.source_files  = "RNDSBluetooth/**/*.{h,m}"
  s.requires_arc = true
  s.public_header_files = 'RNDSBluetooth/**/*.h'
  s.vendored_frameworks = ['Frameworks/DesayBluetooth.framework','Frameworks/SSZipArchive.framework']
  s.dependency "React"
  s.ios.deployment_target = '9.0'
end

  