# Swift Examples: Arrays

Source collection: `swift-examples-main`

This file contains 9 unique Swift source examples. Exact duplicate files were removed during extraction.

## ArraysApp

Original path: `arrays/1 Arrays/Arrays/ArraysApp.swift`

```swift
//
//  ArraysApp.swift
//  Arrays
//
//

import SwiftUI

@main
struct ArraysApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `arrays/1 Arrays/Arrays/ContentView.swift`

```swift
//
//  ContentView.swift
//  Arrays
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
        }.onAppear(){
            sandBox()
        }
    }
}

func sandBox() {

    var pets = ["Pig", "Chicken", "Rat"]

    print(pets.count)

    //var pets: [String] = ["Pig", "Chicken", "Rat"]

    //pets.append("Dog")
    //pets.remove(at: 0)
    //pets.insert("Cat", at: 1)
    //pets.reverse()
    //pets.sort()
    //print(pets)

    /*
    if let intdex = pets.firstIndex(of: "Rat"){
        print(intdex)
    }
    */

    /*
    for i in (0 ..< pets.count) {
        print ("\(i) = " + pets[i])
    }*/

    for i in pets{
        print (i)
    }

}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `arrays/2 Swift ForEach/ForEach/ContentView.swift`

```swift
//
//  ContentView.swift
//  ForEach
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
        }.onAppear(){
            //sandBox1()
            sandBox2()
        }
    }
}

func sandBox1(){
    var person = ["John", "47", "New York"]

    //person[0] = "bob"

    person.forEach { value in
        print("\(value)")
    }
}

func sandBox2(){
    var person = ["name": "John", "age": "47", "city": "New York"]

    person ["name"] = "bob";

    for i in person{
        print("\(i.key): \(i.value)")
    }

    person.forEach { key, value in
        print("\(key): \(value)")
    }

}

#Preview {
    ContentView()
}
```

## ForEachApp

Original path: `arrays/2 Swift ForEach/ForEach/ForEachApp.swift`

```swift
//
//  ForEachApp.swift
//  ForEach
//
//

import SwiftUI

@main
struct ForEachApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `arrays/3 SwiftUI ForEach/ForEach/ContentView.swift`

```swift
//
//  ContentView.swift
//  ForEach
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        MyPets()
    }
}

struct MyPets: View {
    let pets = ["Chicken", "Rock", "Rat", "Frog"]

    var body: some View {
        VStack {
            ForEach(pets, id: \.self) { pet in
                Text(pet).font(.largeTitle)
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## ArrayNavApp

Original path: `arrays/4 List/ArrayNav/ArrayNavApp.swift`

```swift
//
//  ArrayNavApp.swift
//  ArrayNav
//
//

import SwiftUI

@main
struct ArrayNavApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `arrays/4 List/ArrayNav/ContentView.swift`

```swift
//
//  ContentView.swift
//  Array Nav List
//
//

import SwiftUI

struct ContentView: View {
    let pets = ["Dog", "Cat", "Rat"]

    var body: some View {
        NavigationStack {
            List {
                ForEach(pets, id: \.self) { item in
                    NavigationLink(value: item) {
                        Text(item)
                    }
                }
            }
            .navigationDestination(for: String.self) { item in
                DetailView(selectedItem: item)
            }
            .navigationTitle("My Pets")
        }
    }
}

struct DetailView: View {
    let selectedItem: String

    var body: some View {
        Text("Details for: \(selectedItem)")
            .navigationTitle(selectedItem)
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `arrays/5 Pages/PagesArray/PagesArray/ContentView.swift`

```swift
//
//  ContentView.swift
//  PagesArray
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Onboarding()
    }
}

struct Onboarding: View {
    private let bgColors: [Color] = [.blue, .cyan, .purple]

    var body: some View {
        VStack {
            TabView{
                ForEach(0..<bgColors.count, id: \.self) {i in
                    ZStack {
                        bgColors[i]
                        Text("Step \(i+1)").font(.largeTitle)
                    }
                    .foregroundColor(.white)

                }
            }.tabViewStyle(.page) .cornerRadius(10).padding(.horizontal, 10)
        }.background(.black).indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))

    }
}
#Preview {
    ContentView()
}
```

## PagesArrayApp

Original path: `arrays/5 Pages/PagesArray/PagesArray/PagesArrayApp.swift`

```swift
//
//  PagesArrayApp.swift
//  PagesArray
//
//

import SwiftUI

@main
struct PagesArrayApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```
