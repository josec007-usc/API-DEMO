# Swift Examples: Multi Touch

Source collection: `swift-examples-main`

This file contains 5 unique Swift source examples. Exact duplicate files were removed during extraction.

## ContentView

Original path: `multi-touch/1 Touch Info/Multi-touch/ContentView.swift`

```swift
//
//  ContentView.swift
//  Multi-touch paint
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Sandbox()
    }
}

struct Sandbox: View {

    @State var spatialEvents: [String:CGPoint] = [:]

    var body: some View {
        ZStack(){
            Rectangle()
                .fill(.green)
                .ignoresSafeArea()
            VStack{
                ForEach(Array(spatialEvents.values), id: \.self) { value in
                    Text("X:\(Int(value.x)) Y:\(Int(value.y))")
                }
            }
        }
        .gesture(
            SpatialEventGesture()
                .onChanged { events in
                    for event in events {
                        if event.phase == .active {
                        spatialEvents["\(event.id)"] = event.location
                        } else {
                            spatialEvents["\(event.id)"] = nil
                        }
                    }
                }
                .onEnded(){ events in
                for event in events {
                    spatialEvents["\(event.id)"] = nil
                }
            }
        )
    }
}

#Preview {
    ContentView()
}
```

## Multi touchApp

Original path: `multi-touch/1 Touch Info/Multi-touch/Multi_touchApp.swift`

```swift
//
//  Multi_touchApp.swift
//  Multi-touch
//
//

import SwiftUI

@main
struct Multi_touchApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `multi-touch/2 Location/Multi-touch/ContentView.swift`

```swift
//
//  ContentView.swift
//  Multi-touch paint
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Sandbox()
    }
}

struct Sandbox: View {

    @State var spatialEvents: [String:CGPoint] = [:]

    var body: some View {
        ZStack(){
            Rectangle()
                .fill(.green)
                .ignoresSafeArea()

            ForEach(Array(spatialEvents.values), id: \.self) { value in
                Circle()
                    .fill(.red)
                    .frame(width: 100, height: 100)
                    .position(value)

                Text("X:\(Int(value.x)) Y:\(Int(value.y))")
                    .position(value)
            }
        }
        .gesture(
            SpatialEventGesture()
                .onChanged { events in
                    for event in events {
                        if event.phase == .active {
                        spatialEvents["\(event.id)"] = event.location
                        } else {
                            spatialEvents["\(event.id)"] = nil
                        }
                    }
                }
                .onEnded(){ events in
                    for event in events {
                        spatialEvents["\(event.id)"] = nil
                    }
                }
        )
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `multi-touch/3 Paint/Multi-touch/ContentView.swift`

```swift
//
//  ContentView.swift
//  Multi-touch paint
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Sandbox()
    }
}

struct Sandbox: View {

    @State var touchPos: [CGPoint] = []

    var body: some View {
        ZStack(){
            Rectangle()
                .fill(.green)
                .ignoresSafeArea()
            ForEach(touchPos, id: \.self) { pos in
                Circle()
                    .fill(.blue)
                    .opacity(0.2)
                    .frame(width: 100,height: 100)
                    .position(pos)
            }
        }
        .gesture(
            SpatialEventGesture()
                .onChanged { events in
                    for event in events {
                        print(event.phase)
                        touchPos.append(event.location)
                    }
                }
            /*
                .onEnded(){ events in
                    for event in events {
                        print(event.phase)
                        touchPos = []
                    }
                }
             */
        )
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `multi-touch/4 Dots/Multi-touch/ContentView.swift`

```swift
//
//  ContentView.swift
//  Multi-touch Make Dots
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        MakeDots()
    }
}

struct MakeDots: View {
    //iPhones are capped at 5 touches

    @State var dots:[SpatialEventCollection.Event.ID:CGPoint] = [:]

    var body: some View {
        ZStack{
            Rectangle()
                .fill(.green)
                .ignoresSafeArea()

            ForEach(Array(dots.keys), id: \.self) { key in
                Circle()
                    .fill(idToColor(id:key))
                    .frame(width: 100, height: 100)
                    .position(dots[key] ?? .zero)
            }
        }
        .gesture(
            SpatialEventGesture()
                .onChanged { events in
                    for event in events {
                        if event.phase == .active {
                            dots[event.id] = event.location
                            //print(dots)
                        } else {
                            dots[event.id] = nil
                        }
                    }
                }
                .onEnded { events in
                    for event in events {
                        dots[event.id] = nil
                    }
                }
        )
    }
}

func idToColor(id:SpatialEventCollection.Event.ID) -> Color {
    let r:CGFloat = CGFloat(abs(id.hashValue / 100) % 10) / 10
    let g:CGFloat = CGFloat(abs(id.hashValue / 10) % 10) / 10
    let b:CGFloat = CGFloat(abs(id.hashValue) % 10) / 10

    return Color(red: r, green: g, blue: b)
   }

#Preview {
    ContentView()
}
```
