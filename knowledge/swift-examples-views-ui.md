# Swift Examples: Views Ui

Source collection: `swift-examples-main`

This file contains 17 unique Swift source examples. Exact duplicate files were removed during extraction.

## ContentView

Original path: `views-ui/1 Views/Scope/Scope/ContentView.swift`

```swift
//
//  ContentView.swift
//  Scope
//
//

import SwiftUI

var greeting1 = "Nice to see you"

struct ContentView: View {
    var body: some View {
        HStack {
            Button("Say Hi") {
                sayHi()
            }
            Text ("|")
            Button("Say Bye") {
                sayHi()
            }
        }.font(.title)
    }
}

func sayHi() {
    let greeting2 = "Hello"
    print(greeting1)
    print(greeting2)
}

func sayBye() {
    let greeting2 = "Bye now"
    print(greeting1)
    print(greeting2)
}

#Preview {
    ContentView()
}
```

## ScopeApp

Original path: `views-ui/1 Views/Scope/Scope/ScopeApp.swift`

```swift
//
//  ScopeApp.swift
//  Scope
//
//

import SwiftUI

@main
struct ScopeApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `views-ui/1 Views/Views/Views/ContentView.swift`

```swift
//
//  ContentView.swift
//  Views
//
//

import SwiftUI

struct ContentView: View {
    @State var showView2 = false

    var body: some View {
        VStack {
            if showView2 {
                SecondView(showSecondView: $showView2)
            } else {
                FirstView(showSecondView: $showView2)
            }
        }
    }
}

struct FirstView: View {
    @Binding var showSecondView: Bool

    var body: some View {
        ZStack {
            Color(red:0.9,green: 0.9,blue: 1)
            VStack {
                Image(systemName:"heart").foregroundStyle(Color.red).font(.title).padding()
                Text("View 1").font(.title)
                Button("Go View 2") {
                    showSecondView = true
                }
            }
        }
        .ignoresSafeArea()
    }
}

struct SecondView: View {
    @Binding var showSecondView: Bool

    var body: some View {
        ZStack {
            Color(red:0.9,green: 1,blue: 1)
            VStack {
                Image(systemName:"star.fill").foregroundStyle(Color.green).font(.title).padding()
                Text("View 2").font(.title)
                Button("Go View 1") {
                    showSecondView = false
                }
            }
        }
        .ignoresSafeArea()
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `views-ui/2 NavStack/NavLinks/ContentView.swift`

```swift
//
//  ContentView.swift
//  NavLinks
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            View1()
        }
    }
}

struct View1: View {
    var body: some View {
        ZStack {
            Color(red:0.9,green: 0.9,blue: 1)
            VStack {
                Text("This is View 1")
                NavigationLink("Go to View 2", destination: View2())
            }
            .navigationTitle("Main View")
        }.ignoresSafeArea()
    }
}

struct View2: View {
    var body: some View {
        VStack {
            Text("This is View 2")
            NavigationLink("Go to View 3", destination: View3())
        }
        .navigationTitle("View 2")
    }
}

struct View3: View {
    var body: some View {
        Text("This is View 3")
            .navigationTitle("View 3")
    }
}

#Preview {
    ContentView()
}
```

## NavLinksApp

Original path: `views-ui/2 NavStack/NavLinks/NavLinksApp.swift`

```swift
//
//  NavLinksApp.swift
//  NavLinks
//
//

import SwiftUI

@main
struct NavLinksApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `views-ui/3 Sheets/Sheets/ContentView.swift`

```swift
//
//  ContentView.swift
//  Sheets
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ShowSignUp()
    }
}

struct ShowSignUp: View {
    @State var showingSheet = false

    var body: some View {
        VStack{
            Image(systemName:"star.fill").foregroundStyle(Color.green).padding()
            Button(action: {showingSheet.toggle()}){
                Text("Sign Up")
            }
        }.font(.title)

        .sheet(isPresented: $showingSheet,
               onDismiss: didDismiss) {
            VStack {
                Image(systemName:"heart").foregroundStyle(Color.red).padding()
                Button("Dismiss") { showingSheet.toggle() }
            }.font(.title)
        }
    }

    func didDismiss() {
        print("Dismissed")
    }
}

#Preview {
    ContentView()
}
```

## SheetsApp

Original path: `views-ui/3 Sheets/Sheets/SheetsApp.swift`

```swift
//
//  SheetsApp.swift
//  Sheets
//
//

import SwiftUI

@main
struct SheetsApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `views-ui/4 TabViews/SwipeNav/SwipeNav/SwipeNav/ContentView.swift`

```swift
//
//  ContentView.swift
//  SwipeNav
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Onboarding()
    }
}

struct Onboarding: View {
    var body: some View {
        TabView{
            ZStack {
                Color.blue
                Text("Step 1")
            }
            ZStack {
                Color.teal
                Text("Step 2")
            }
            ZStack {

                Text("Step 3")
            }
            ZStack {
                Color.orange
                Text("Step 4")
            }
        }.tabViewStyle(.page).indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))
    }
}

#Preview {
    ContentView()
}
```

## SwipeNavApp

Original path: `views-ui/4 TabViews/SwipeNav/SwipeNav/SwipeNav/SwipeNavApp.swift`

```swift
//
//  SwipeNavApp.swift
//  SwipeNav
//
//

import SwiftUI

@main
struct SwipeNavApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `views-ui/4 TabViews/SwipeNav/SwipeNav2/SwipeNav/ContentView.swift`

```swift
//
//  ContentView.swift
//  SwipeNav
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Onboarding()
    }
}

struct Onboarding: View {
    var body: some View {
        VStack {
            TabView{
                ZStack {
                    Color.blue//.opacity(0.5)
                    Text("Step 1").font(.largeTitle)
                }
                .foregroundColor(.orange)
                ZStack {
                    Color(red: 0, green: 0, blue: 1)
                    Text("Step 2").font(.largeTitle)
                }
                .foregroundColor(.green)
                ZStack {
                    Color(red: 0.9, green: 0.9, blue: 0)
                    Button(action: signUp) {
                        Label("Sign Up", systemImage: "person.circle").font(.largeTitle).padding()
                    }.buttonStyle(.borderedProminent).buttonBorderShape(.capsule)
                }
            }.tabViewStyle(.page) .cornerRadius(10).padding(.horizontal, 10)
        }.background(.black).indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))

    }

    func signUp() {
        print("click")
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `views-ui/4 TabViews/TabNav/TabNav/TabNav/ContentView.swift`

```swift
//
//  ContentView.swift
//  TabNav
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Onboarding()
    }
}

struct Onboarding: View {
    var body: some View {
        TabView{
            ZStack {
                Color.blue
                Text("Home").foregroundStyle(Color.white)
            }
            .tabItem {
                Label("Home", systemImage: "house")
            }

            ZStack {
                Color.teal
                Text("New Post").foregroundStyle(Color.white)
            }
            .tabItem {
                Label("New Post", systemImage: "plus")
            }

            ZStack {
                Color.orange
                Text("Edit Posts")
            }
            .tabItem {
                Label("Edit", systemImage: "pencil")
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## TabNavApp

Original path: `views-ui/4 TabViews/TabNav/TabNav/TabNav/TabNavApp.swift`

```swift
//
//  TabNavApp.swift
//  TabNav
//
//

import SwiftUI

@main
struct TabNavApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `views-ui/4 TabViews/TabNav/TabNav2/TabNav/ContentView.swift`

```swift
//
//  ContentView.swift
//  TabNav
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        Onboarding()
    }
}

struct Onboarding: View {
    @State var activeTab = 1

    var body: some View {
        TabView(selection: $activeTab){
            ZStack {
                Color.blue
                Text("Home").foregroundStyle(Color.white)
            }
            .tabItem {
                Label("Home", systemImage: "house")
            }
            .tag(0)

            ZStack {
                Color.teal
                Text("New Post").foregroundStyle(Color.white)
            }
            .tabItem {
                Label("New Post", systemImage: "plus")
            }
            .tag(1)

            ZStack {
                Color.teal
                Text("New Post").foregroundStyle(Color.white)
            }
            .tabItem {
                Label("New Post", systemImage: "plus")
            }
            .tag(2)

            ZStack {
                Color.orange
                VStack{
                    Text("Edit Posts")

                    Button("Go Home"){
                        activeTab = 0
                    }
                }
            }
            .tabItem {
                Label("Edit", systemImage: "pencil")
            }
            .tag(3)

        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `views-ui/5 Text Input/Local Storage/LocalStorage/ContentView.swift`

```swift
//
//  ContentView.swift
//  LocalStorage
//
//

import SwiftUI

struct ContentView: View {

    @AppStorage("USERNAME") var savedName = ""

    var body: some View {
        if savedName.isEmpty{
            singInForm(savedName: $savedName)
        }else{
            welcome(savedName: $savedName)
        }
    }
}

struct singInForm: View {

    @State var username = ""
    @State var password = ""
    @Binding var savedName: String

    private var isFormValid: Bool {
        !username.trimmingCharacters(in: .whitespaces).isEmpty &&
        !password.trimmingCharacters(in: .whitespaces).isEmpty
    }

    var body: some View {
        VStack {
            Form {
                TextField(text: $username) {
                    Text("Username")
                }
                SecureField(text: $password) {
                    Text("Password")
                }

                Button("Submit") {
                    savedName = username
                }
                .disabled(!isFormValid)
                .buttonStyle(.borderedProminent)
                .buttonBorderShape(.capsule)
                .padding()
                .frame(maxWidth: .infinity, alignment: .center)
            }
        }
    }
}

struct welcome: View {

    @Binding var savedName: String

    var body: some View {
        Text("Welcome " + savedName).font(.title)
        Button("Sign Out") {
            savedName = ""
        }
        .buttonStyle(.borderedProminent)
        .buttonBorderShape(.capsule)
        .padding()
        .frame(maxWidth: .infinity, alignment: .center)
    }
}

#Preview {
    ContentView()
}
```

## LocalStorageApp

Original path: `views-ui/5 Text Input/Local Storage/LocalStorage/LocalStorageApp.swift`

```swift
//
//  LocalStorageApp.swift
//  LocalStorage
//
//

import SwiftUI

@main
struct LocalStorageApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `views-ui/5 Text Input/Text Input/TextInput/TextInput/ContentView.swift`

```swift
//
//  ContentView.swift
//  Text Input
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        singInForm()
    }
}

struct singInForm: View {

    @State var username = ""
    @State var password = ""

    private var isFormValid: Bool {
        !username.trimmingCharacters(in: .whitespaces).isEmpty &&
        !password.trimmingCharacters(in: .whitespaces).isEmpty
    }

    var body: some View {
        VStack {
            Form {
                TextField(text: $username) {
                    Text("Username")
                }
                SecureField(text: $password) {
                    Text("Password")
                }

                Button("Submit") {
                    print(username);
                    print(password);
                }
                .disabled(!isFormValid)
                .buttonStyle(.borderedProminent)
                .buttonBorderShape(.capsule)
                .padding()
                .frame(maxWidth: .infinity, alignment: .center)
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## TextInputApp

Original path: `views-ui/5 Text Input/Text Input/TextInput/TextInput/TextInputApp.swift`

```swift
//
//  TextInputApp.swift
//  TextInput
//
//

import SwiftUI

@main
struct TextInputApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```
