# iOS - 2a Swift

Source document: `iOS - 2a Swift.pdf`

## Page 1

Swift Programming
Fundamentals

## Page 2

Multi-paradigm Programming
What is Swift?
Is it an object-oriented language? One that is built around classes and methods
that can be duplicated, extended, and executed as needed?
Is it a functional language? Is it focused on pure functions (functions that only
turn the input into output and affect nothing else), immutable data (data that can
not be changed)
Is it imperative? Is code executed in a specific order? Like step by step
instructions going from top to bottom?

## Page 3

Multi-paradigm Programming
Answer:
As you probably guessed from the title, it is all of the above. Everything mixed
together. The goal was to take the best parts of everything but in practice…
Let’s get into it!

## Page 4

Make a New App
Open the default example code
Edit the code to make a sandbox for experimentation
We will use this to demonstrate the basics of programming

## Page 5

import SwiftUI
struct ContentView: View {
var body: some View {
VStack {
Text(myFunc()).font(.largeTitle)
}
}
func myFunc() -> String {
var pet = "cat"
return "\(pet)"
}
}
#Preview {
ContentView()
}

## Page 6

Structs and Functions
Views are Structs (aka Structures)
They are collections of data
You can have some logic in Structs, but you can not change the data.
This means generally speaking variables can not be changed. (immutable)
Think of them as executing once to draw to the screen.
Functions are subroutines, building blocks of code and logic.
In Functions variables and other types of data can be changed and updated.
Therefor, to get started with our code we need to create a function.
It will output (return) a string to our view
Note: There are specific types of variables inside views that can change called States but we will
get into that later

## Page 7

import SwiftUI
struct ContentView: View {
var body: some View {
VStack {
Text(myFunc()).font(.largeTitle)
}
}
func myFunc() -> String {
var pet = "cat"
return "\(pet)"
}
}
#Preview {
ContentView()
}

## Page 8

Variables
A variable is defined with the var keyword. If it never needs to change (aka readonly)
then use let. What type of variable is pet?
var pet = "cat"
return "\(pet)"
Pet does not change in this example so the compiler will recommend using let. Can you
see your pet’s name in the preview window?

## Page 9

Variables
There are 4 basic variable types.
String
var a = "cat" //text
Int
var a = 55 //whole number
Double
var a = 3.14 //decimal number
Bool
var a = true //true or false

## Page 10

Integers
Math operations: +, -, *, /,%
var a = 3
a = a + 1
return "\(a)"
Notes:
No ;
No ++
Integer division only results whole numbers
% gives you the remainder
"\(a)" converts any variable (in this case ‘a’) to a string

## Page 11

Doubles
Math operations: +, -, *, /
var a = 3.5
a = a / 2
return "\(a)"
Notes:
Swift uses Doubles over Floats
Math is similar to ints
Division returns a decimal number

## Page 12

Strings
Strings are strings of characters. (aka Text)
Views display text so our other variables must be converted to display as output on the screen.
Strings have addition (aka concatenation)
var str = "Hi"
var str2 = " There"
str += str2
Strings have methods and properties
print(str.count)
print(str.uppercased())
print(str.sorted()) // sort into an array
"""Three quotes let you do
multiline strings"""

## Page 13

Bools
Bools (aka Booleans) are only one bit, True or False
var a = true
a = !a //! means NOT
print(a)

## Page 14

Comparison && Conditionals
a = 5 // Means assignment. Make a be 5
a == 5 // Means equivalency. Like asking “Is a equal to 5?”
!= //Not equivalent
< //Less than
>= //Greater than or equal to
//if statements do not use parentheses like C/C++/C#
var a = 3
if a < 4 {
a = 0
}

## Page 15

Comparison && Conditionals
Conditionals work with strings. They compare Alphabetical order.
if "apple" < "bob" {
print("Yes")
}
Check multiple conditions with && (and) or || (or)
else can be used for follow up conditions
if a > 0 && a < 10 {
print("Yes")
}else{
print("No")
}

## Page 16

Ranges
..<
Swift has a range operator.
0..<50
Gives a range that is between 0 (inclusive) and up to 50 (exclusive)
0...50
Gives a range that includes 0 (inclusive) and 50 (inclusive)
~=
This is the pattern matching operator

## Page 17

Ranges
Check if a var is in a the range
let age = 48
if 40...50 ~= age {
print("old enough to die, not young enough to retire")
}
A range can also be a variable. Range has a method called contains
let ageRange = 21...31
if ageRange.contains(age) {
print("Congratulations!")
}

## Page 18

While Loops
Loops are a concise way to repeat code. Mainly swift uses while loops and for loops.
A while loop requires you to do your own incrementing and check your own condition.
var i = 0
while i < 20 {
print(i)
i += 1
}
You need to be careful to avoid infinite loops
while true{
print("hi")
}

## Page 19

For Loops
For loops can use a range or an array. We will talk about arrys later. A for loop
in swift is a little more like a foreach loop in other languages. Less code, more
clarity, more safety, more constrained. In most cases you should try to see if a
for loop will work first.
for i in (0 ..< 10) {
print (i)
}
Note: break can exit a loop early

## Page 20

Functions
Functions are blocks of code. They are useful for organization, clarity and reusability.
Usually they have input and output. You can think of them as a black box that processes
something. In swift function names start with a lowercase letter
This function has no Parameters (input) and no return values (output)
func testFunc(){ // This is the function definition
print("hi") // This is the code that will run when the
// function is called
}
A function that returns nothing is called void

## Page 21

Functions
This function has a return type String
func myFunc() -> String { // The return type can be any basic
let pet = "cat" // variable type
return pet // Call return to output the value
}
This function uses parameters as input and returns an int. Notice the input also requires
a type
func addIt (a: Int, b: Int) -> Int {
return a + b
}

## Page 22

States
States are a special type of variable that are allowed to change in the view. When the
state changes the view is refreshed with the new data. States are defined in a view using
the @State keyword.
struct ContentView: View {
@State var isOn = false
}
In this example we have a bool called isOn that is allowed to change in this struct.
Note: States are handy for tracking a few things but overusing them can get to be
clunky.

## Page 23

States
struct ContentView: View {
@State var isOn = false
var body: some View {
ZStack {
if !isOn{
Rectangle().background(Color.black)
}
Button("Click Me") {
isOn = !isOn
}.font(.largeTitle)
}
}
}
States are handy for tracking a few things but overusing them can get to
be clunky.
