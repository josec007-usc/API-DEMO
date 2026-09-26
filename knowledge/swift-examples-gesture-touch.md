# Swift Examples: Gesture Touch

Source collection: `swift-examples-main`

This file contains 16 unique Swift source examples. Exact duplicate files were removed during extraction.

## ContentView

Original path: `gesture-touch/1 TapGesture/Tap/TapGesture1/ContentView.swift`

```swift
//
//  ContentView.swift
//  Tap Gesture
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        TapDemo()
    }
}

struct TapDemo: View {
    @State private var tapped = false
    var body: some View {
        ZStack{
            if tapped{
                Color.green.ignoresSafeArea()
            }else{
                Color.cyan.ignoresSafeArea()
            }

            Circle()
                .fill(Color.red)
                .frame(width: 60, height: 60)
                /*.onTapGesture {
                    print("tapped")
                    tapped.toggle()
                }
                 */

                .onTapGesture (count:2) {
                    tapped.toggle()
                }

            Text("Tap").foregroundStyle(.white)
        }
    }
}

#Preview {
    ContentView()
}
```

## TapGesture1App

Original path: `gesture-touch/1 TapGesture/Tap/TapGesture1/TapGesture1App.swift`

```swift
//
//  TapGesture1App.swift
//  TapGesture1
//
//

import SwiftUI

@main
struct TapGesture1App: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `gesture-touch/1 TapGesture/TapLocation/TapLocation/ContentView.swift`

```swift
//
//  ContentView.swift
//  Tap Location
//
//
import SwiftUI

struct ContentView: View {
    @State var tapLocation: CGPoint = .zero

    var body: some View {
        ZStack {
            Rectangle()
                .fill(.green)
                .ignoresSafeArea()
                .onTapGesture(){ location in
                    tapLocation = location
                    tapLocation.x = 100
                    print("Local tap location: \(location)")
                }

            Circle()
                .fill(Color.blue)
                .frame(width: 50, height: 50)
                .position(tapLocation)
                .animation(.easeInOut, value: tapLocation)
        }
    }
}

#Preview {
    ContentView()
}
```

## TapLocationApp

Original path: `gesture-touch/1 TapGesture/TapLocation/TapLocation/TapLocationApp.swift`

```swift
//
//  TapLocationApp.swift
//  TapLocation
//
//

import SwiftUI

@main
struct TapLocationApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `gesture-touch/2 LongPress/LongPress/ContentView.swift`

```swift
//
//  ContentView.swift
//  LongPress
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        LongPressDemo()
    }
}

struct LongPressDemo: View {
    @State private var scale = 1.0
    var body: some View {
        Circle()
            .fill(Color.blue)
            .frame(width: 50, height: 50)
            .scaleEffect(scale)
            .animation(.spring(), value: scale)
            .onLongPressGesture(minimumDuration: 0.1) {
                print("pressed")
            } onPressingChanged: { pressing in
                if pressing {
                    scale = 10
                    print("is pressing")
                }else{
                    scale = 1
                    print("stopped pressing")
                }
            }
    }
}

#Preview {
    ContentView()
}
```

## LongPressApp

Original path: `gesture-touch/2 LongPress/LongPress/LongPressApp.swift`

```swift
//
//  LongPressApp.swift
//  LongPress
//
//

import SwiftUI

@main
struct LongPressApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `gesture-touch/3 Drag/Drag1/Drag/ContentView.swift`

```swift
//
//  ContentView.swift
//  Drag
//
//

import SwiftUI

struct ContentView: View {
    @State var pos = CGPoint(x: 200, y: 400)

    var body: some View {
        VStack {
            Text("X:\(Int(pos.x)), Y:\(Int(pos.y))")
            Circle()
                .fill(Color.blue)
                .frame(width: 50, height: 50)
                .position(pos)
                .gesture(
                    DragGesture()
                        .onChanged { value in
                            pos = value.location
                        }
                )
        }
    }
}

#Preview {
    ContentView()
}
```

## DragApp

Original path: `gesture-touch/3 Drag/Drag1/Drag/DragApp.swift`

```swift
//
//  DragApp.swift
//  Drag
//
//

import SwiftUI

@main
struct DragApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `gesture-touch/3 Drag/Drag2/Drag2/ContentView.swift`

```swift
//
//  ContentView.swift
//  Drag2
//
//

import SwiftUI

struct ContentView: View {
    @State private var offset: CGSize = .zero

    var body: some View {
        VStack {
            Text("Offset W:\(Int(offset.width)), H:\(Int(offset.height))")
            Circle()
                .fill(Color.blue)
                .frame(width: 50, height: 50)
                .offset(offset)
                .gesture(
                    DragGesture()
                        .onChanged { value in
                            offset = value.translation
                        }
                        .onEnded { value in
                            offset = .zero
                        }
                )
        }
    }
}

#Preview {
    ContentView()
}
```

## Drag2App

Original path: `gesture-touch/3 Drag/Drag2/Drag2/Drag2App.swift`

```swift
//
//  Drag2App.swift
//  Drag2
//
//

import SwiftUI

@main
struct Drag2App: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `gesture-touch/4 Magnify/Magnify/ContentView.swift`

```swift
//
//  ContentView.swift
//  Magnify
//
//

import SwiftUI

struct ContentView: View {
    @State var zoom = 0.0
    @State var lastZoom = 1.0

    var body: some View {
        ZStack{
            Circle()
                .fill(Color.blue)
                .frame(width: 100, height: 100)
                .scaleEffect(zoom + lastZoom)
                .gesture(
                    MagnifyGesture()
                        .onChanged { value in
                            zoom = value.magnification - 1
                        }
                        .onEnded { value in
                            lastZoom += zoom
                            zoom = 0;
                        }
                )

            VStack {
                Text("Scale:\(Int(zoom + lastZoom))")
                Spacer()
            }

        }
    }
}

#Preview {
    ContentView()
}
```

## MagnifyApp

Original path: `gesture-touch/4 Magnify/Magnify/MagnifyApp.swift`

```swift
//
//  MagnifyApp.swift
//  Magnify
//
//

import SwiftUI

@main
struct MagnifyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `gesture-touch/5 Twist/Twist/ContentView.swift`

```swift
//
//  ContentView.swift
//  Twist
//
//

import SwiftUI

struct ContentView: View {
    @State var rot = Angle.zero
    @State var lastRot = Angle.zero

    var body: some View {
        ZStack{
            Rectangle()
                .fill(Color.blue)
                .frame(width: 100, height: 100)
                .rotationEffect(rot + lastRot)
                .gesture(
                    RotateGesture()
                        .onChanged { value in
                            rot = value.rotation
                        }
                        .onEnded { value in
                            lastRot += rot
                            rot = Angle.zero;
                        }
                )

            VStack {
                Text("Rotation: \(Int(rot.degrees + lastRot.degrees)) Degrees")
                Spacer()
            }

        }
    }
}

#Preview {
    ContentView()
}
```

## TwistApp

Original path: `gesture-touch/5 Twist/Twist/TwistApp.swift`

```swift
//
//  TwistApp.swift
//  Twist
//
//

import SwiftUI

@main
struct TwistApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `gesture-touch/6 Sequence/Sequence/ContentView.swift`

```swift
//
//  ContentView.swift
//  Sequence
//
//

import SwiftUI

struct ContentView: View {
    @State var pos = CGPoint(x: 200, y: 400)
    @State var scale = 1.0

    var body: some View {
        let dragGesture = DragGesture()
            .onChanged { value in
                pos = value.location
            }
            .onEnded { value in
                scale = 1
            }

        let pressGesture = LongPressGesture()
            .onEnded { value in
                scale = 2
            }

        Circle()
            .fill(.red)
            .frame(width: 50, height: 50)
            .scaleEffect(scale)
            .animation(.spring(), value: scale)
            .position(pos)
            .gesture(pressGesture.sequenced(before: dragGesture))
    }
}

#Preview {
    ContentView()
}
```

## SequenceApp

Original path: `gesture-touch/6 Sequence/Sequence/SequenceApp.swift`

```swift
//
//  SequenceApp.swift
//  Sequence
//
//

import SwiftUI

@main
struct SequenceApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```
