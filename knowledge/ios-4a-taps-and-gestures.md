# iOS - 4a Taps and Gestures

Source document: `iOS - 4a Taps and Gestures.pdf`

## Page 1

Taps and Gestures

## Page 2

Events
In programming, an event is an action that takes place within the system. When
developing software, we create functionality to respond to these events.
What are some user generated events?
What are some examples of non-user generated events?

## Page 3

Events
Button("Tap") {
print("Button was tapped!")
}
Circle().onAppear {
print("Shape was loaded")
}

## Page 4

Tap Gesture
On Tap Gesture is an event that is triggered when an element is tapped.
Circle().onTapGesture {
print("tapped")
}
The tap gesture has an optional parameter for multi-tap
Circle().onTapGesture (count:2) { //Requires a double-tap
print("tapped twice")
}

## Page 5

Tap Gesture
The Tap Gesture can also return the location of the tap. The coordinateSpace parameter
sets the mode to either local space (that of the object) or global space (the whole screen).
Local is the default. Global is always offset because it takes the safe area at the top of the
screen into account
.onTapGesture(coordinateSpace: .global){ location in
print("Global tap location: \(location)")
}
Location is a type called CGPoint. A point is a 2D value holding both an x and a y property.
print(location.x)

## Page 6

Long Press
The onLongPressGesture is an event that is triggered when an element is held for a
specific amount of time.
Circle().onLongPressGesture(){ // wait .5 sec
print("long")
}
Circle().onLongPressGesture(minimumDuration: 0.1){ // wait .1 sec
print("long")
}

## Page 7

Long Press
Besides the main action, we also have access to onPressingChanged. The
onPressingChanged function executes when the state of the press changes. This lets
us track when the press began and when it finished.
Circle().onLongPressGesture(minimumDuration: 0.1) {
print("was pressed")
} onPressingChanged: { pressing in
if pressing {
print("is pressing")
}else{
print("stopped pressing")
}
}

## Page 8

Drag Gesture
@State var pos: CGPoint = .zero For more complicated Gestures we use
var body: some View {
the .gesture Modifier. Other Gestures
Circle()
are structs that conform to this modifier.
.position(pos)
.gesture(
Let’s look at DragGesture. We have
DragGesture() access to an OnChanged event and an
.onChanged { value in
OnEnded event. Inside these events
pos = value.location
we can access the location of the
print(pos)
} object being dragged.
. onEnded { value in
pos = .zero
}
)
}

## Page 9

Magnify Gesture
@State var zoom = 0.0 Let’s look at MagnifyGesture. We
var body: some View {
have access to the OnChanged and
Circle()
OnEnded events. This time inside
.frame(width: 100, height: 100)
these events we can access the
.scaleEffect(zoom)
magnification of the gesture. We can
.gesture(
MagnifyGesture() apply that to the scale of the object
.onChanged { value in
being pinched and zoomed.
zoom = value.magnification
}
Tip: Hold option in the simulator for two
.onEnded { value in
fingers
zoom = 0;
}
)
}

## Page 10

Rotate Gesture
@State var rot = Angle.zero Let’s look at RotateGesture. Again,
var body: some View {
We have access to the OnChanged
Rectangle()
event and OnEnded events. Inside
.frame(width: 100, height: 100)
these events we can access the
.rotationEffect(rot)
rotation value of the gesture and apply
.gesture(
RotateGesture() that to the object being rotated.
.onChanged { value in
rot = value.rotation
Note: The Angle type variable is an
}
abstraction that allows developers to
.onEnded { value in
not be concerned with whether they are
rot = Angle.zero;
} working in radians or degrees.
)
print(rot.degrees)
}

## Page 11

Gesture Combos
Gestures can be defined as variables and then sequined together so that one gesture
must be performed before the next is activated.
//SequenceGesture
pressGesture.sequenced(before: dragGesture)
//SimultaneousGesture (or at the same time)
pressGesture.simultaneously(with: RotateGesture()

## Page 12

Gesture Sequence
@State var pos = CGPoint(x: 200, y: 400) Circle()
@State var scale = 1.0 .fill(.red)
var body: some View { .frame(width: 50, height: 50)
.scaleEffect(scale)
let dragGesture = DragGesture() .animation(.spring(), value: scale)
.onChanged { value in .position(pos)
pos = value.location .gesture(pressGesture.sequenced(before:
} dragGesture))
.onEnded { value in
scale = 1 }
}
let pressGesture = LongPressGesture()
.onEnded { value in
scale = 2
}

## Page 13

Resources
SwiftUI Docs: Tap
https://developer.apple.com/documentation/swiftui/tapgesture
SwiftUI Docs: Long Press
https://developer.apple.com/documentation/swiftui/longpressgesture
Hacking with Swift: How to User Gestures
https://www.hackingwithswift.com/books/ios-swiftui/how-to-use-gestures-in-swiftui
SwiftUI Docs: Gesture
https://developer.apple.com/documentation/swiftui/gesture
