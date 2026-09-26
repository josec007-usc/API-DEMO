# iOS - 3a Views States Flow

Source document: `iOS - 3a Views States Flow.pdf`

## Page 1

Views, States & Flow

## Page 2

Onboarding Flow
When onboarding a user, it is important to walk them through the process of
becoming familiar with your app. This is called onboarding. The steps the move
the user from page to page or scene to scene is the onboarding flow. SwiftUI
does not have pages like HTML or Scenes like unity. In Swift we move the user
through views.

## Page 3

Views
We can start to think of views as scenes or pages in the Apps we are designing.
For this session we will start looking at ways in which users can navigate
between views.

## Page 4

Scope
Variables and functions are only local to their level of scope.
let greeting1 = "Nice to see you" //This is a global variable
func sayHi() { //It can be accessed anywhere
let greeting2 = "Hello" //This is a local variable
print(greeting1) //It only exists in this func
print(greeting2)
}
func sayBye() {
let greeting2 = "Bye now"
print(greeting1)
print(greeting2)
}

## Page 5

Changing Views
@State var showView2 = false We can make a simple toggle that
var body: some View {
switches between 2 views using a
VStack {
@State bool and a button. But notice
if showView2 {
that button exists on the same level
SecondView()
as the @State. What if we wanted to
} else {
switch views from within the views
FirstView()
} themselves. We would need a way to
}
link the value of that bool.
Button("Switch Views") {
showView2.toggle()
}.font(.title)
}

## Page 6

Binding
In programing, passing variables into a function is preferred to using lots of
global variables. It makes it easier to track what's happening, and is less prone
to bugs caused by functions changing things they shouldn't.
So let’s combine that with what we know about @states to share data between
views.
@Binding: A two-way connection between a property that stores data and a
view that displays or changes that data. @Bindings are a way for a @state to
be referenced in another view.

## Page 7

Binding and Views
This is a simple example showing two distinct views using a @state and
@biding to change both the view that is displayed and how each view is
rendered.
Let’s look at some code.

## Page 8

Navigation Stack
NavigationStack:
This is the container for a series of views. It also manages the navigation path between
these views
NavigationLink:
Used to navigate within the NavigationStack using the destination keyword
NavigationLink("Go to View 2", destination: View2())
Navigation Title:
Creates a title for each view in the stack, as well as the back button
.navigationTitle("Main View")
Lets look at some code…

## Page 9

Sheets
You can think of a sheet like an overlay or a modal. It covers the existing content,
allowing for focused interaction.
@State var showingSheet = false
Button(action: {showingSheet.toggle()}){
Text("Sign Up")
}
.sheet(isPresented: $showingSheet, onDismiss: didDismiss) {
// Sheet Content
}

## Page 10

TabView
The most often used navigation feature in swift UI is TabView. It facilitates
navigation between different child views.
Default (Tab style):
Tab items and labels define a universal nav bar across the bottom.
Page style:
Pages operate more like a carousel with swipe based navigation. The pages
are represented as dots along the bottom

## Page 11

Page Style
TabView{
ZStack {
Color.blue
Text("Step 1")
}
ZStack {
Color.teal
Text("Step 2")
}
}.tabViewStyle(.page) //Adds dots and swiping
.indexViewStyle(PageIndexViewStyle(backgroundDisplayMode: .always))
//keeps the dots visible by adding a background

## Page 12

Tab Style
TabView{
ZStack {
Color.blue
Text("Home").foregroundStyle(Color.white)
}
.tabItem {
Label("Home", systemImage: "house")
}
ZStack {
Color.orange
Text("Edit Posts")
}
.tabItem {
Label("Edit", systemImage: "pencil")
}
}

## Page 13

Form Input
Create a state variable and link it to the text field. This will update in realtime. The submit
button can be used to take some action on it.
@State var username = ""
var body: some View {
Form {
TextField(text: $username) {
Text("Username")
}
Button("Submit") {
print(username);
}
}

## Page 14

Form Validation
Add a bool to check if the input meets criteria. In this case, check if username is blank.
The private keyword limits the scope and prevents a realtime view refresh.
private var isFormValid: Bool {
!username.trimmingCharacters(in: .whitespaces).isEmpty
}
The bool can then be applied to the button’s disabled property
Button("Submit") {
print(username);
}.disabled(!isFormValid)

## Page 15

Persistent Data
One of the easiest ways to create persistent data is using the @AppStorage property
wrapper. This lets you save a variable with a key. In this case the key is "USERNAME".
This operates much like a cookie in js or playerprefs in Unity. Infact this wrapper is
accessing ios UserDefaults behind the scenes. This is not ideal for large amounts of
data and can become expensive at scale. Like @State it causes a view refresh on
change.
@AppStorage("USERNAME") var savedName = ""
When we start building apps to our phones, try updating the clicker game to be
persistent.
