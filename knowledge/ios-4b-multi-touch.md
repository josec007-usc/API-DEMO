# iOS - 4b Multi-Touch

Source document: `iOS - 4b Multi-Touch.pdf`

## Page 1

Multi-Touch Input

## Page 2

Touches
While SwiftUI gives us direct access to common gestures we also have way to
reference touches directly. We can do this by utilizing
SpatialEventGesture(). This function gives us access to .onChanged
and .onEnded events like what we saw before in other gestures. But what
makes it special is that it tracks all simultaneous touches independently.
As you will see in the next slide we can loop through every touch event
happening.
Note: The docs say iphones can only register up to 5 touches at once but I
swear I got 6 on my phone in Unity before.

## Page 3

Touches
.gesture(
SpatialEventGesture()
.onChanged { events in
for event in events {
print(event) //print info about each event
}
}
.onEnded { events in
for event in events {
print(event)
}
}
)

## Page 4

Touch Properties
event.phase
.active
The user is actively touching the device
.ended
The user has stopped touching the touch has ended normally
.cancelled
The touch was ended by the system. This can happen if there are too many
touches on the device.

## Page 5

Touch Properties
event.location
This is stored as a CGPoint which is a variable type with an X and Y value.
Each touch event has a location property .
event.id
This is a large id number that is unique to each touch while it is active

## Page 6

Tracking Touch Events
The touch events can be stored in a dictionary. In this example the dictionary
uses a string (or the ID) as a key and a CGpoint (the position) as a value.
@State var spatialEvents: [String:CGPoint] = [:]

## Page 7

Tracking Touch Events
The touches can be saved into the dictionary like so.
SpatialEventGesture()
.onChanged { events in
for event in events {
spatialEvents["\(event.id)"] = event.location
}
}
}

## Page 8

Tracking Touch Events
The touches can be removed from the dictionary like this. Nil means there is no
value. Nothing is set. This does not exist. Nil in swift is like null in other
languages. It serves the same purpose. By saying that an element at this key is
nil it removes it from the dictionary.
.onEnded(){ events in
for event in events {
spatialEvents["\(event.id)"] = nil
}
}

## Page 9

Tracking Touch Events
The dictionary can then be looped through in a view using a swiftUI ForEach loop.
Here we are drawing an individual red circle for each item in the dictionary and
placing it at the stored value position. The dictionary does not natively have an
order to it. Using the Array() function converts it for the purpose of iterating through
the loop. The end result is a individually tracked dot for each touch (up to 5).
ForEach(Array(spatialEvents.values), id: \.self) { value in
Circle()
.fill(.red)
.frame(width: 100, height: 100)
.position(value)
}

## Page 10

Code
Let’s look at some examples…
We will be building to our phones for this.

## Page 11

Resources
This is the main way for tracking touch events in Swift UI
SpatialEventGesture
https://developer.apple.com/documentation/swiftui/spatialeventgesture
Event Phases
https://developer.apple.com/documentation/swiftui/spatialeventcollection/event
/phase-swift.enum/cancelled
Other ways to track touche events
Using UIView
https://developer.apple.com/documentation/uikit/implementing-a-multi-touch-app
Using UIViewRepresentable to wrap UIKit gestures into a SwiftUI compatible
component.
https://fatbobman.com/en/snippet/enable-multi-finger-tap-gestures-in-swiftui/
