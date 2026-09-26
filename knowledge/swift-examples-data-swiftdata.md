# Swift Examples: Data Swiftdata

Source collection: `swift-examples-main`

This file contains 18 unique Swift source examples. Exact duplicate files were removed during extraction.

## ContentView

Original path: `data-swiftdata/1 File Views/Views/ContentView.swift`

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

#Preview {
    ContentView()
}
```

## FirstView

Original path: `data-swiftdata/1 File Views/Views/FirstView.swift`

```swift
//
//  FirstView.swift
//  Views
//
//
import SwiftUI

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
```

## SecondView

Original path: `data-swiftdata/1 File Views/Views/SecondView.swift`

```swift
//
//  SecondView.swift
//  Views
//
//

import SwiftUI

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
```

## ViewsApp

Original path: `data-swiftdata/1 File Views/Views/ViewsApp.swift`

```swift
//
//  ViewsApp.swift
//  Views
//
//

import SwiftUI

@main
struct ViewsApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `data-swiftdata/2 Environment/Environment/ContentView.swift`

```swift
//
//  ContentView.swift
//  Environment
//
//

import SwiftUI

struct ContentView: View {
    @Environment(\.locale) var locale
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        VStack {
            if colorScheme == .dark {
                Image(systemName: "globe")
                    .resizable()
                    .frame(width: 200, height: 200
                    )
                    .foregroundColor(.white)
            }
            else{
                Image(systemName: "globe")
                    .resizable()
                    .frame(width: 200, height: 200
                    )
                    .foregroundColor(.black)
            }
        }
        .padding()
        .onAppear(){
            print(locale)
            print(colorScheme)
        }
    }
}

#Preview {
    ContentView()
}
```

## EnvironmentApp

Original path: `data-swiftdata/2 Environment/Environment/EnvironmentApp.swift`

```swift
//
//  EnvironmentApp.swift
//  Environment
//
//

import SwiftUI

@main
struct EnvironmentApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `data-swiftdata/3 Using Classes/UsingClasses/ContentView.swift`

```swift
//
//  ContentView.swift
//  UsingClasses
//
//

import SwiftUI

struct ContentView: View {
    var notes: [Note] = [
        Note(title: "Today", content: "Today was a good day"),
        Note(title: "9/28", content: "Today was tough")
    ]

    var body: some View {
        VStack {
            ForEach(notes) { note in
                VStack {
                    Text(note.title).font(.headline)
                    Text(note.content)
                    Text(note.dateCreated, style: .date).font(.caption)
                }.padding()
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## NoteClass

Original path: `data-swiftdata/3 Using Classes/UsingClasses/NoteClass.swift`

```swift
//
//  NoteClass.swift
//  UsingClasses
//
//

import Foundation //needed for date

class Note: Identifiable {
    var title: String
    var content: String
    var dateCreated: Date

    init(title: String, content: String, dateCreated: Date = Date()) {
        self.title = title
        self.content = content
        self.dateCreated = dateCreated
    }
}
```

## UsingClassesApp

Original path: `data-swiftdata/3 Using Classes/UsingClasses/UsingClassesApp.swift`

```swift
//
//  UsingClassesApp.swift
//  UsingClasses
//
//

import SwiftUI

@main
struct UsingClassesApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `data-swiftdata/4 Adding Data/UsingClasses/ContentView.swift`

```swift
//
//  ContentView.swift
//  UsingClasses
//
//

import SwiftUI

struct ContentView: View {
    @State var notes: [Note] = []

    var body: some View {
        HStack{
            Button("Good"){
                notes.append(Note(title: "Good", content: "Today was a good day"))
            }.font(.largeTitle).padding()

            Button("Bad"){
                notes.append(Note(title: "Bad", content: "Today was a bad day"))
            }.font(.largeTitle).padding()

        }
        ScrollView{
            VStack {
                ForEach(notes) { note in
                    VStack {
                        Text(note.title).font(.headline)
                        Text(note.content)
                        Text(note.dateCreated, style: .date).font(.caption)
                    }.padding()
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `data-swiftdata/5 Using Swift Data/UsingSwiftData/ContentView.swift`

```swift
//
//  ContentView.swift
//  UsingSwiftData
//
//
import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \Note.dateCreated, order: .reverse) private var notes: [Note]

    var body: some View {
        HStack{
            Button("Good"){
                context.insert(Note(title: "Good", content: "Today was a good day"))
                try? context.save()
            }.font(.largeTitle).padding()

            Button("Bad"){
                context.insert(Note(title: "Bad", content: "Today was a bad day"))
                try? context.save()
            }.font(.largeTitle).padding()

        }
        ScrollView{
            VStack {
                ForEach(notes) { note in
                    VStack {
                        Text(note.title).font(.headline)
                        Text(note.content)
                        Text(note.dateCreated, style: .date).font(.caption)
                    }.padding()
                }
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## NoteClass

Original path: `data-swiftdata/5 Using Swift Data/UsingSwiftData/NoteClass.swift`

```swift
//
//  NoteClass.swift
//  UsingSwiftData
//
//
import SwiftData
import Foundation //needed for date

@Model          //used to define the data models that SwiftData will manage and store
class Note: Identifiable {
    var title: String
    var content: String
    var dateCreated: Date

    init(title: String, content: String, dateCreated: Date = Date()) {
        self.title = title
        self.content = content
        self.dateCreated = dateCreated
    }
}
```

## UsingSwiftDataApp

Original path: `data-swiftdata/5 Using Swift Data/UsingSwiftData/UsingSwiftDataApp.swift`

```swift
//
//  UsingSwiftDataApp.swift
//  UsingSwiftData
//
//

import SwiftData
import SwiftUI

@main
struct UsingSwiftDataApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Note.self) // SwiftData container class
    }
}
```

## AddNote

Original path: `data-swiftdata/6 Note App/Notes/AddNote.swift`

```swift
//
//  AddNote.swift
//  Notes
//
//

import SwiftUI
import SwiftData

struct AddNoteView: View {
    @Environment(\.modelContext) private var context
    @Environment(\.dismiss) private var dismiss

    @State private var title = ""
    @State private var content = ""

    var body: some View {
        NavigationStack {
            Form {
                TextField("Title", text: $title)
                TextEditor(text: $content)
                    .frame(height: 200)
            }
            .navigationTitle("New Note")
            .toolbar {
                ToolbarItem(placement: .confirmationAction) {
                    Button("Save") {
                        let newNote = Note(title: title, content: content)
                        context.insert(newNote)
                        try? context.save()
                        dismiss()
                    }.disabled(title.isEmpty || content.isEmpty)
                }

                ToolbarItem(placement: .cancellationAction) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }
}
```

## ContentView

Original path: `data-swiftdata/6 Note App/Notes/ContentView.swift`

```swift
//
//  ContentView.swift
//  Notes
//
//

import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.modelContext) private var context
    @Query(sort: \Note.dateCreated, order: .reverse) private var notes: [Note]
    @State private var showAddSheet = false

    var body: some View {
        NavigationStack {
            List {
                ForEach(notes) { note in
                    NavigationLink(destination: NoteDetailView(note: note)) {
                        VStack(alignment: .leading) {
                            Text(note.title).font(.headline)
                            Text(note.dateCreated, style: .date).font(.caption)
                        }
                    }
                }
                .onDelete(perform: deleteNotes)
            }
            .navigationTitle("Notes")
            .toolbar {
                ToolbarItem(placement: .primaryAction) {
                    Button(action: { showAddSheet = true }) {
                        Label("Add Note", systemImage: "plus")
                    }
                }
            }
            .sheet(isPresented: $showAddSheet) {
                AddNoteView()
            }
        }
    }

    func deleteNotes(at offsets: IndexSet) {
        for index in offsets {
            context.delete(notes[index])
        }
        try? context.save()
    }
}

#Preview {
    ContentView()
}
```

## NoteClass

Original path: `data-swiftdata/6 Note App/Notes/NoteClass.swift`

```swift
//
//  NoteClass.swift
//  Notes
//
//

import SwiftData
import Foundation //needed for date

@Model
class Note {
    var title: String
    var content: String
    var dateCreated: Date

    init(title: String, content: String, dateCreated: Date = Date()) {
        self.title = title
        self.content = content
        self.dateCreated = dateCreated
    }
}
```

## NoteDetail

Original path: `data-swiftdata/6 Note App/Notes/NoteDetail.swift`

```swift
//
//  NoteDetail.swift
//  Notes
//
//

import SwiftUI
import SwiftData

struct NoteDetailView: View {
    @Bindable var note: Note  // Bindable lets us edit the info that is stored
    @Environment(\.modelContext) private var context
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        Form {
            TextField("Title", text: $note.title)

            TextEditor(text: $note.content)
                .frame(height: 200)
        }
        .navigationTitle("Edit Note")
        .toolbar {
            ToolbarItem(placement: .confirmationAction) {
                Button("Done") {
                    try? context.save()  // Saves any changes to the model
                    dismiss()
                }
            }
        }
    }
}
```

## NotesApp

Original path: `data-swiftdata/6 Note App/Notes/NotesApp.swift`

```swift
//
//  NotesApp.swift
//  Notes
//
//

import SwiftUI
import SwiftData

@main
struct NotesApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(for: Note.self) // SwiftData container class
    }
}
```
