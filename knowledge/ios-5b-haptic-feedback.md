# iOS - 5b Haptic Feedback

Source document: `iOS - 5b Haptic Feedback.pdf`

## Page 1

Haptic Feedback

## Page 2

Why Haptics ?
Haptic feedback is often used in app design for similar reasons as audio
feedback. Haptic feedback can make a more immersive and satisfying user
experience by giving interactions an added element of physicality. Haptic
feedback can be used to improve usability by providing a clear response or
indication of actions. The helps users that may have visual or hearing
impairments, as well as folks operating your app loud or bright environments.

## Page 3

Sensory Feedback
The most direct and simplest way of implementing haptic feedback in an iOS
app is by using SensoryFeedback.
@State var flip = false
var body: some View {
Button("Success") {
flip.toggle()
}
.sensoryFeedback(.success, trigger: flip)
}

## Page 4

Sensory Feedback
Let’s look at the main line
.sensoryFeedback(.success, trigger: flip)
Here .success is a Sensory Feedback preset. trigger: is the variable to watch. If
this variable changes then Sensory Feedback is triggered. To keep thing simple we are
using a bool called flip that is toggled by the button.

## Page 5

Sensory Feedback Presets
These are the presets that apple has assigned various common events. Try them out.
Some of these feel the same to me.
.alignment
.increase
.decrease
.levelChange
.pathComplete
.selection
.success
.warning
.error

## Page 6

Impact Weight and Flexibility
Sensory feedback also has an impact property. This lets you customize the haptic
feedback a bit. Impact has two types, weight and flexibility. weight can be
.light, .medium, or .heavy. Flexibility can be .soft, .solid, or .rigid.
intensity is a double between 0 and 1 with 0 being nothing. myVar is any generic
variable.
.sensoryFeedback(.impact(weight: .light, intensity: 1), trigger:
myVar)
.sensoryFeedback(.impact(flexibility: .solid, intensity: 1),
trigger: myVar)

## Page 7

Custom Haptic Patterns
If you need an even more customizable approach to haptic feedback, Swift
provides developers with Core Haptics. Core Haptics is a haptic engine
designed around the need to create custom patterns. A pattern is sequence of
haptic vibrations that can be Transient (short and quick) or Continuous (long
and sustained). Each haptic event has parameters that control its start time
relative to the event start time, Relative Time and its Duration, as well as
Sharpness and Intensity which both take floats from 0 to 1. Sharpness is like
the texture or feel of the haptic, 0 is very soft and 1 is very distinct.
Note: Setting the duration for a transient event seems to have no effect.

## Page 8

Custom Haptic Patterns
The main configuration for creating a pattern looks like this
let intens = CHHapticEventParameter(parameterID: .hapticIntensity, value: 1)
let sharp = CHHapticEventParameter(parameterID: .hapticSharpness, value: 1)
let event = CHHapticEvent(eventType: .hapticContinuous, parameters: [intens,
sharp], relativeTime: 0, duration: 1.0)
if let pattern = try? CHHapticPattern(events: [event], parameters: []),
let player = try? engine.makePlayer(with: pattern) {
try? player.start(atTime: 0)
}

## Page 9

Custom Haptic Patterns
There is a lot more to it as far as setting up the engine goes but let’s look at that in
Xcode…

## Page 10

Sensory Feedback Resources
Apple Docs - Sensoryfeedback
https://developer.apple.com/documentation/swiftui/sensoryfeedback
Impact weight and flexibility
https://developer.apple.com/documentation/swiftui/sensoryfeedback/impact
Create with Swift - Sensoryfeedback
https://www.createwithswift.com/providing-feedback-sensory-feedback-modifier/
Hacking with Swift - Sensoryfeedback
https://www.hackingwithswift.com/quick-start/swiftui/how-to-add-haptic-effects-using-sen
sory-feedback

## Page 11

Haptic Engine Resources
Developer Docs - Core Haptics
https://developer.apple.com/documentation/corehaptics/
Medium - Haptics in SwiftUI
https://medium.com/@jpmtech/haptics-in-swiftui-40d67d9ad3e6
Hacking with Swift - Adding Haptic Effects
https://www.hackingwithswift.com/books/ios-swiftui/adding-haptic-effects

## Page 12

Haptic Engine Resources
Haptic Events
https://developer.apple.com/documentation/corehaptics/chhapticevent
Haptic Sharpness
https://developer.apple.com/documentation/corehaptics/chhapticevent/parameterid/hapti
csharpness
Haptic Pattern
https://developer.apple.com/documentation/corehaptics/chhapticpattern
Advanced Pattern Player
https://developer.apple.com/documentation/corehaptics/chhapticadvancedpatternplayer
