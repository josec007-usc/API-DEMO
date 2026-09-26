# Swift Examples: Audio

Source collection: `swift-examples-main`

This file contains 10 unique Swift source examples. Exact duplicate files were removed during extraction.

## Audio FeedbackApp

Original path: `audio/1 System Audio/Audio Feedback/Audio_FeedbackApp.swift`

```swift
//
//  Audio_FeedbackApp.swift
//  Audio Feedback
//
//

import SwiftUI

@main
struct Audio_FeedbackApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `audio/1 System Audio/Audio Feedback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Feedback
//
//

import AudioToolbox
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Button("Play Sound") {
                // ~ 1000 to 1400
                AudioServicesPlaySystemSound(1003)
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `audio/2 System Audio/Audio Feedback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Feedback
//
//

//https://github.com/TUNER88/iOSSystemSoundsLibrary
//This list is not complete

import AudioToolbox
import SwiftUI

struct ContentView: View {

    @State var sounds10h = 1000
    @State var sounds11h = 1100
    @State var sounds12h = 1200
    @State var sounds13h = 1300

    var body: some View {
        VStack {
            Button("Play Sound: \(sounds10h)") {
                AudioServicesPlaySystemSound(SystemSoundID(sounds10h))
                sounds10h += 1
            }.buttonStyle(BlueButton())

            Button("Play Sound: \(sounds11h)") {
                AudioServicesPlaySystemSound(SystemSoundID(sounds11h))
                sounds11h += 1
            }.buttonStyle(BlueButton())

            Button("Play Sound: \(sounds12h)") {
                AudioServicesPlaySystemSound(SystemSoundID(sounds12h))
                sounds12h += 1
            }.buttonStyle(BlueButton())

            Button("Play Sound: \(sounds13h)") {
                AudioServicesPlaySystemSound(SystemSoundID(sounds13h))
                sounds13h += 1
            }.buttonStyle(BlueButton())
        }
    }
}

struct BlueButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(15)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `audio/3 System Audio Vibrate/Audio Feedback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Vibrate
//
//

//https://github.com/TUNER88/iOSSystemSoundsLibrary
//This list is not complete

import AudioToolbox
import SwiftUI

struct ContentView: View {

    var body: some View {
        VStack {
            Button("SMS Received: 1011") { //seems the same as 1311
                AudioServicesPlaySystemSound(1011)
            }.buttonStyle(BlueButton())

            Button("FailedUnlock: 1102") {
                AudioServicesPlaySystemSound(1102)
            }.buttonStyle(BlueButton())

            Button("RingerVibeChanged: 1350") {
                AudioServicesPlaySystemSound(1350)
            }.buttonStyle(BlueButton())

            Button("SilentVibeChanged: 1351") {
                AudioServicesPlaySystemSound(1351)
            }.buttonStyle(BlueButton())

            Button("Vibrate: 4095") {
                AudioServicesPlaySystemSound(4095)
            }.buttonStyle(BlueButton())

            Button("kSystemSoundID_Vibrate") {
                AudioServicesPlaySystemSound(kSystemSoundID_Vibrate)
            }.buttonStyle(BlueButton())
        }
    }
}

struct BlueButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(15)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `audio/4 Custom Audio Simple/Audio Feedback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Feedback
//
//

import SwiftUI
import AudioToolbox

struct ContentView: View {

    var body: some View {
        VStack {
            Button("Play Bloop"){
                playSound(name:"Bloop")
            }

            Button("Play Pop"){
                playSound(name:"Pops")
            }
        }
    }

    func playSound(name:String) {
        if let soundURL = Bundle.main.url(forResource: name, withExtension: "wav") {
            var soundID: SystemSoundID = 0
            AudioServicesCreateSystemSoundID(soundURL as CFURL, &soundID)
            AudioServicesPlaySystemSound(soundID)

        } else {
            print("Sound file not found.")
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `audio/5 Custom Audio Optimized/Audio Feedback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Feedback
//
//

import SwiftUI
import AudioToolbox

var soundIDs: [String: SystemSoundID] = [:]

struct ContentView: View {
    var body: some View {
        VStack{
            Button("Play Pops") {
                playSound(name:"Pop") //assumes .wav
            }
            Button("Play Bloop") {
                playSound(name:"Bloop")
            }
        }
    }
}

func initSound(name:String) {
    if let soundURL = Bundle.main.url(forResource: name, withExtension: "wav"){
        var soundID: SystemSoundID = 0
        AudioServicesCreateSystemSoundID(soundURL as CFURL, &soundID)
        soundIDs[name] = soundID
    }else {
        print("Sound file not found.")
    }
}

func playSound(name:String) {
    if soundIDs[name] == nil { // initialize if nil
        initSound(name:name)
    }
    AudioServicesPlaySystemSound(soundIDs[name] ?? 1104) //play 1104 if something went wrong
}

#Preview {
    ContentView()
}
```

## Audio PlaybackApp

Original path: `audio/6 Audio Playback Simple/Audio Playback/Audio_PlaybackApp.swift`

```swift
//
//  Audio_PlaybackApp.swift
//  Audio Playback
//
//

import SwiftUI

@main
struct Audio_PlaybackApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `audio/6 Audio Playback Simple/Audio Playback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Playback Simple
//
//

import SwiftUI
import AVFoundation

struct ContentView: View {
    @State private var audioPlayer: AVAudioPlayer?

    var body: some View {
        Button("Play") {
            if let url = Bundle.main.url(forResource: "Janney_Drum3", withExtension: "wav") {
                audioPlayer = try? AVAudioPlayer(contentsOf: url)
                audioPlayer?.play()
            } else {
                print("Audio file not found")
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `audio/7 Audio Playback Optimized/Audio Playback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Playback Simple Optimized
//
//

import SwiftUI
import AVFoundation

struct ContentView: View {
    @State private var audioPlayer: AVAudioPlayer?

    var body: some View {
        Button("Play") {
            if(audioPlayer == nil){
                initSound(name: "Janney_Drum3")
            }
            audioPlayer?.play()
        }

        Button("Stop") {
            audioPlayer?.stop()
            audioPlayer?.currentTime = 0
        }
    }

    func initSound(name: String) {
        if let url = Bundle.main.url(forResource: name, withExtension: "wav"){
            audioPlayer = try? AVAudioPlayer(contentsOf: url)
        } else {
            print("Audio file not found")
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `audio/8 Audio Playback Controls/Audio Playback/ContentView.swift`

```swift
//
//  ContentView.swift
//  Audio Playback Controls
//
//

import SwiftUI
import AVFoundation

struct ContentView: View {
    @State var audioPlayer: AVAudioPlayer?

    @State var volume: Float = 0.5
    @State var pan: Float = 0.0
    @State var speed: Float = 1.0

    //audioPlayer?.numberOfLoops = 0
    //audioPlayer?.numberOfLoops = -1

    var body: some View {
        VStack{
            Spacer()
            Button("Play") {
                if(audioPlayer == nil){
                    initSound(name: "Janney_Drum3")
                }
                audioPlayer?.play()
            }

            Button("Stop") {
                audioPlayer?.stop() //I think this frees up resources but I am not sure
                audioPlayer?.currentTime = 0; //resets the time
            }

            Button("Pause") {
                audioPlayer?.pause()
            }

            Button("Skip 10sec") {
                audioPlayer?.currentTime += 10
            }

            Spacer()

            Text("Volume")
            Slider(value: $volume, in: 0.0...1.0, step: 0.1) {
            } onEditingChanged: { editing in
                if !editing {
                    audioPlayer?.volume = volume
                }
            }.padding(.horizontal)

            Text("Pan")
            Slider(value: $pan, in: -1.0...1.0, step: 0.1) {
            } onEditingChanged: { editing in
                if !editing {
                    audioPlayer?.pan = pan
                }
            }.padding(.horizontal)

            Text("Speed")
            Slider(value: $speed, in: 0.5...2.0, step: 0.1){
            } onEditingChanged: { editing in
                if !editing {
                    audioPlayer?.rate = speed
                }
            }.padding(.horizontal)

            Spacer()

        }.font(.title).padding()
    }

    func initSound(name: String) {
        if let url = Bundle.main.url(forResource: name, withExtension: "wav"){
            audioPlayer = try? AVAudioPlayer(contentsOf: url)
            audioPlayer?.enableRate = true //needed for rate changes
        } else {
            print("Audio file not found")
        }
    }
}

#Preview {
    ContentView()
}
```
