# iOS - 6 Data - SwiftData

Source document: `iOS - 6 Data - SwiftData.pdf`

## Page 1

Data - SwiftData

## Page 2

Classes
It’s time to talk about classes. In object oriented programming a class serves as
a template for creating objects. It defines the structure and behavior that objects
created from it will possess. You can think of them as being similar but more
versatile than structs. In a language like C# we would be using classes from the
beginning.
Sometimes the type or structure of the data which we need to store outgrows a
simple array or dictionary. With a class we can create a “custom container” for
the data and then store that container in an array or dictionary.

## Page 3

Classes
Let’s say we want to make a note taking app. Let’s think about how our data is
structured. We want a title, content, and a date. Three variables that hold different data
but need to be connected to each other. You can think of each note as a container
containing these vars. Here is the blueprint. Here we see our three variables of
information defined inside the Note Class.
class Note {
var title: String
var content: String
var dateCreated: Date
// It still needs an init
}

## Page 4

Classes
We aren’t done yet though. We need an initializer. The init function lets us create a new object
from the class and even gives us an opportunity to set some defaults. In this init, the date
variable is set to be the current date by default when a new note is created. In Xcode if you
start typing init it will fill it all in for you.
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

## Page 5

Classes
// We can create a new Note object with the initializer
var myNote = Note(title: "Good", content: "Today was a good day")
print(myNote.title)
// But we can also update the properties specifically
myNote.title = "Cool"
print(myNote.title)
// Now we can make an array that holds our notes
var notes: [Note] = []
notes.append(Note(title: "Good", content: "Today was a good day"))

## Page 6

Swift File Structure
We can make new files in our xcode project by right clicking out assets folder
and selecting “New Empty File” from the menu. Any code like a view can exist
in its own file. There is no specific reference or scoping that needs to take
place. So now if your projects are getting big you can start separating out your
views into their own files. Your class can have its own file as well.

## Page 7

@Environment
New Keyword unlocked! @Environment is a property wrapper that allows a view access to
system defined big picture values that SwiftUI manages. It gives access to values injected by
ancestor views, as well. We’ll come back to this.
@Environment(\.locale) var locale
@Environment(\.colorScheme) var colorScheme
print(locale)
print(colorScheme)
Returns:
en_US (fixed en_US)
light

## Page 8

SwiftData
SwiftData is an easy to use way to manage a local database with SwiftUI. It is basically an
easy to use, high level version of the Core Data framework which is running behind the
scenes. SwiftData is the ideal way to store data, (beyond just a few variables) locally on your
device. It also allows synching to iCloud. Let’s look at the main components:
First you need to import SwiftData and add @Model to your class

## Page 9

SwiftData
import SwiftData //bring in SwiftData
import Foundation //Foundation is needed for date
@Model //used to define the data models that SwiftData will manage and store
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

## Page 10

SwiftData
Next you need to add the modelContainer for your class to the main app file.
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

## Page 11

SwiftData
To add to the Data you can use @Environment and bring it into the view as a variable
@Environment(\.modelContext) private var context
//Then we add to it using context.insert()
context.insert(Note(title: "OK", content: "Today was OK"))
//And save it using
try? context.save()

## Page 12

SwiftData
To display the data you create a query like MySQL. Then you can loop through the
result. In this case we are returning the data in reverse order based on the date value.
@Query(sort: \Note.dateCreated, order: .reverse) private var
notes: [Note]
ForEach(notes) { note in
Text(note.title)
Text(note.content)
Text(note.dateCreated, style: .date)
}

## Page 13

Assignment 1: Data Sets
Working in groups of 4 (3 is ok), develop an app that utilizes an internal or external dataset.
This set could be data collected manually, created by users, or an external database. Display
the data in a meaningful way. Design the user interactions with intentionality. Consider the
type of actions the user would want or need to do with this particular type of data.
Email me your groups by Monday.
Everyone in the group must submit the work to brightspace if they want credit.
The app needs to build to your phone without issues.
-Progress Check-in (Have some design docs and some code written)
-Live Demo
-Release

## Page 14

Resources
Apple Docs Overview
https://developer.apple.com/documentation/SwiftData
Hacking with Swift - Create your first app with SwiftUI and SwiftData
https://www.youtube.com/watch?v=n4SCMC25BxY
Code with Chris - Beginner’s Guide to SwiftData
https://codewithchris.com/swift-data/
Hacking with Swift - SwiftData by Example (this is a deep dive)
https://www.hackingwithswift.com/quick-start/swiftdata
Hacking with Swift - What is the @Environment property wrapper?
https://www.hackingwithswift.com/quick-start/swiftui/what-is-the-environment-property-wrapper
