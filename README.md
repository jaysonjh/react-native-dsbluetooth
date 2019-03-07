
# react-native-dsbluetooth

## Getting started

`$ npm install react-native-dsbluetooth --save`

### Mostly automatic installation

`$ react-native link react-native-dsbluetooth`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-dsbluetooth` and add `RNDsbluetooth.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNDsbluetooth.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.quenice.cardview.RNDsbluetoothPackage;` to the imports at the top of the file
  - Add `new RNDsbluetoothPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-dsbluetooth'
  	project(':react-native-dsbluetooth').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-dsbluetooth/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-dsbluetooth')
  	```


## Usage
```javascript
import RNDsbluetooth from 'react-native-dsbluetooth';

// TODO: What to do with the module?
RNDsbluetooth;
```
  