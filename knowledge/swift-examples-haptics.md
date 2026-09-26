# Swift Examples: Haptics

Source collection: `swift-examples-main`

This file contains 8 unique Swift source examples. Exact duplicate files were removed during extraction.

## ContentView

Original path: `haptics/0 Haptic Simple/Haptic/ContentView.swift`

```swift
//
//  ContentView.swift
//  Haptic Simple
//
//

import SwiftUI

struct ContentView: View {
    @State var flip = false

    var body: some View {
        Button("Success") {
            flip.toggle()
        }
        .sensoryFeedback(.success, trigger: flip)
    }
}

#Preview {
    ContentView()
}
```

## HapticApp

Original path: `haptics/0 Haptic Simple/Haptic/HapticApp.swift`

```swift
//
//  HapticApp.swift
//  Haptic
//
//

import SwiftUI

@main
struct HapticApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `haptics/1 Haptic Presets/Haptic/ContentView.swift`

```swift
//
//  ContentView.swift
//  Haptic Presets
//
//

import SwiftUI

struct ContentView: View {

    var body: some View {
        Feedback()
    }
}

struct Feedback: View {

    let feedback:[SensoryFeedback] = [.alignment, .increase, .decrease, .levelChange, .pathComplete, .selection, .success, .warning, .error]

    let feedbackNames = ["alignment", "increase", "decrease", "level change", "path complete", "selection", "success", "warning", "error"]

    @State private var flip = Array(repeating: false, count: 9)

    var body: some View {
        LazyVGrid(columns: [GridItem(.adaptive(minimum: 100))], spacing: 20) {

            ForEach(0 ..< feedback.count) { i in

                Button(feedbackNames[i]) {
                    flip[i].toggle()
                }
                .buttonStyle(BlueButton())
                .sensoryFeedback(feedback[i], trigger: flip[i])
            }
        }
    }
}

//https://www.hackingwithswift.com/quick-start/swiftui/customizing-button-with-buttonstyle
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

Original path: `haptics/2 Haptic Weight/Haptic/ContentView.swift`

```swift
//
//  ContentView.swift
//  Haptic Weight
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Feedback()
    }
}

struct Feedback: View {
    @State var lightLevel  = 0.0;
    @State var mediumLevel = 0.0;
    @State var heavyLevel = 0.0;

    var body: some View {
        Text ("Impact Weight and Intensity").font(.title).padding()

        Button("Light " + String(format: "%.1f",lightLevel)) {
            lightLevel += 0.1

            if lightLevel > 1{
                lightLevel = 0
            }
        }
        .buttonStyle(BlueButton()).padding()
        .sensoryFeedback(.impact(weight: .light, intensity: lightLevel), trigger: lightLevel)

        Button("Medium " + String(format: "%.1f",mediumLevel)) {
            mediumLevel += 0.1

            if mediumLevel > 1{
                mediumLevel = 0
            }
        }
        .buttonStyle(BlueButton()).padding()
        .sensoryFeedback(.impact(weight: .medium, intensity: mediumLevel), trigger: mediumLevel)

        Button("Heavy " + String(format: "%.1f",heavyLevel)) {
            heavyLevel += 0.1

            if heavyLevel > 1{
                heavyLevel = 0
            }
        }
        .buttonStyle(BlueButton()).padding()
        .sensoryFeedback(.impact(weight: .heavy, intensity: heavyLevel), trigger: heavyLevel)

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

Original path: `haptics/3 Haptic Flexibility/Haptic/ContentView.swift`

```swift
//
//  ContentView.swift
//  Haptic Flexibility
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Feedback()
    }
}

struct Feedback: View {
    @State var softLevel  = 0.0;
    @State var solidLevel = 0.0;
    @State var rigidLevel = 0.0;

    var body: some View {
        Text ("Impact Flexibility and Intensity").font(.title).padding()

        Button("Soft " + String(format: "%.1f",softLevel)) {
            softLevel += 0.1

            if softLevel > 1{
                softLevel = 0
            }
        }
        .buttonStyle(BlueButton()).padding()
        .sensoryFeedback(.impact(flexibility: .soft, intensity: softLevel), trigger: softLevel)

        Button("Solid " + String(format: "%.1f",solidLevel)) {
            solidLevel += 0.1

            if solidLevel > 1{
                solidLevel = 0
            }
        }
        .buttonStyle(BlueButton()).padding()
        .sensoryFeedback(.impact(flexibility: .solid, intensity: solidLevel), trigger: solidLevel)

        Button("Rigid " + String(format: "%.1f",rigidLevel)) {
            rigidLevel += 0.1

            if rigidLevel > 1{
                rigidLevel = 0
            }
        }
        .buttonStyle(BlueButton()).padding()
        .sensoryFeedback(.impact(flexibility: .rigid, intensity: rigidLevel), trigger: rigidLevel)

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

Original path: `haptics/4 Core Haptics Simple/Haptic/ContentView.swift`

```swift
//
//  ContentView.swift
//  Core Haptics Simple
//
//

import SwiftUI
import CoreHaptics

struct ContentView: View {
    @State private var engine: CHHapticEngine?

    var body: some View {
        VStack {
            Button("Custom Haptic") {
                playHaptic()
            }
        }.onAppear(){
            initHaptics()
        }
    }

    func initHaptics() {
        //Setup the Engine
        guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }
        engine = try? CHHapticEngine()
        try? engine?.start()
    }

    func playHaptic() {
        //Make a pattern
        guard let engine = engine else { return }

        let intensity = CHHapticEventParameter(parameterID: .hapticIntensity, value: 1.0)
        let sharpness = CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.2)
        let event = CHHapticEvent(eventType: .hapticTransient, parameters: [intensity, sharpness], relativeTime: 0)

        if let pattern = try? CHHapticPattern(events: [event], parameters: []),
           let player = try? engine.makePlayer(with: pattern) {
            try? player.start(atTime: 0) //Play the pattern
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `haptics/5 Core Haptics Pattern/Haptic/ContentView.swift`

```swift
//
//  ContentView.swift
//  Core Haptics Pattern
//
//

import SwiftUI
import CoreHaptics

struct ContentView: View {
    @State private var engine: CHHapticEngine?

    var body: some View {
        VStack {
            Button("Custom Haptic") {
                playHaptic()
            }
        }.onAppear(){
            initHaptics()
        }
    }

    func initHaptics() {
        //Setup the Engine
        guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }
        engine = try? CHHapticEngine()
        try? engine?.start()
    }

    func playHaptic() {
        //Make a pattern
        guard let engine = engine else { return }

        let intens1 = CHHapticEventParameter(parameterID: .hapticIntensity, value: 1.0)
        let sharp1 = CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.2)
        let event1 = CHHapticEvent(eventType: .hapticTransient, parameters: [intens1, sharp1], relativeTime: 0)

        let intens2 = CHHapticEventParameter(parameterID: .hapticIntensity, value: 0.5)
        let sharp2 = CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.8)
        let event2 = CHHapticEvent(eventType: .hapticContinuous, parameters: [intens2, sharp2], relativeTime: 0.5, duration: 1.0)

        if let pattern = try? CHHapticPattern(events: [event1, event2], parameters: []),
           let player = try? engine.makePlayer(with: pattern) {
            try? player.start(atTime: 0) //Play the pattern
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `haptics/6 Core Haptics Optimized/Haptic/ContentView.swift`

```swift
//
//  ContentView.swift
//  Core Haptics Simple
//
//

import SwiftUI
import CoreHaptics

struct ContentView: View {
    @State private var engine: CHHapticEngine?
    @State private var player1: CHHapticPatternPlayer?
    @State private var player2: CHHapticPatternPlayer?

    var body: some View {
        VStack {
            Button("Custom Haptic 1") {
                try? player1?.start(atTime: 0)
            }.padding()

            Button("Custom Haptic 2") {
                try? player2?.start(atTime: 0)
            }.padding()
        }

        .onAppear {
            initHaptics()
        }
    }

    func initHaptics() {
        guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }

        engine = try? CHHapticEngine()
        try? engine?.start()

        let intens1 = CHHapticEventParameter(parameterID: .hapticIntensity, value: 1.0)
        let sharp1 = CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.2)
        let event1 = CHHapticEvent(eventType: .hapticTransient, parameters: [intens1, sharp1], relativeTime: 0)

        let intens2 = CHHapticEventParameter(parameterID: .hapticIntensity, value: 0.5)
        let sharp2 = CHHapticEventParameter(parameterID: .hapticSharpness, value: 0.8)
        let event2 = CHHapticEvent(eventType: .hapticContinuous, parameters: [intens2, sharp2], relativeTime: 0.5, duration: 1.0)

        let event3 = CHHapticEvent(eventType: .hapticTransient, parameters: [intens1, sharp1], relativeTime: 0.5)

        let pattern1 = try? CHHapticPattern(events: [event1, event2], parameters: [])
        player1 = try? engine?.makePlayer(with: pattern1!)

        let pattern2 = try? CHHapticPattern(events: [event1, event3], parameters: [])
        player2 = try? engine?.makePlayer(with: pattern2!)
    }

}
#Preview {
    ContentView()
}
```
