# Swift Examples: Database Firebase

Source collection: `swift-examples-main`

This file contains 10 unique Swift source examples. Exact duplicate files were removed during extraction.

## As1App

Original path: `database-firebase/1 Anon Auth/As1/As1App.swift`

```swift
//
//  As1App.swift
//  As1
//
//

import SwiftUI
import FirebaseCore

class AppDelegate: NSObject, UIApplicationDelegate {
  func application(_ application: UIApplication,
                   didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    FirebaseApp.configure()
    return true
  }
}

@main
struct As1App: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var delegate
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

## ContentView

Original path: `database-firebase/1 Anon Auth/As1/ContentView.swift`

```swift
//
//  ContentView.swift
//  As1
//
//

import SwiftUI
import FirebaseCore
import FirebaseAuth

struct ContentView: View {

    @State var status = "Signing in..."

    var body: some View {
        VStack {
            Text(status)
        }
        .onAppear {
            signIn()
        }
    }

    // Authenticate
    func signIn() {
        Auth.auth().signInAnonymously { result, error in
            if let error = error {
                status = "Auth error: \(error.localizedDescription)"
            } else {
                status = "Signed in as anonymous user: \(result?.user.uid ?? "Unknown")"
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## ContentView

Original path: `database-firebase/2 Email Auth/As1/ContentView.swift`

```swift
//
//  ContentView.swift
//  As1
//
//

import SwiftUI
import FirebaseAuth

struct ContentView: View {
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var status: String = ""
    @State private var isSignedIn: Bool = false

    var body: some View {
        VStack(spacing: 20) {
            if isSignedIn {
                Text("Signed in!")
                Text("Welcome, \(email)")
            } else {
                TextField("Email", text: $email)
                    .keyboardType(.emailAddress)
                    .textContentType(.emailAddress)
                    .autocapitalization(.none)
                    .padding()
                    .background(Color(.secondarySystemBackground))
                    .cornerRadius(8)

                SecureField("Password", text: $password)
                    .textContentType(.password)
                    .padding()
                    .background(Color(.secondarySystemBackground))
                    .cornerRadius(8)

                HStack{
                    Button("Sign Up") {
                        signUp()
                    }

                    .buttonStyle(.bordered)
                    Button("Sign In") {
                        signIn()
                    }
                    .buttonStyle(.borderedProminent)
                }
                Text(status)
                    .foregroundColor(.red)
                    .multilineTextAlignment(.center)
            }
        }
        .padding()
    }

    func signIn() {
        Auth.auth().signIn(withEmail: email, password: password) { result, error in
            if let error = error {
                status = "Signin failed: \(error.localizedDescription)"
            } else {
                isSignedIn = true
                status = "Signed in as \(email)"
            }
        }
    }

    func signUp() {
        Auth.auth().createUser(withEmail: email, password: password) { result, error in
            if let error = error {
                status = "Signup failed: \(error.localizedDescription)"
            } else {
                status = "Account created!"
            }
        }
    }
}

#Preview {
    ContentView()
}
```

## Auth

Original path: `database-firebase/3 Post Data/As1/Auth.swift`

```swift
//
//  Authenticate.swift
//  As1
//
//

// Auth
import FirebaseAuth

func signIn() {
    Auth.auth().signInAnonymously { result, error in
        if let error = error {
            print("Auth error: \(error.localizedDescription)")
        } else {
            print("Signed in anonymously")
        }
    }
}
```

## ContentView

Original path: `database-firebase/3 Post Data/As1/ContentView.swift`

```swift
//
//  ContentView.swift
//  As1
//
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Button("Post") {
                postMessage()
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
        .onAppear {
            signIn()
        }
    }
}

#Preview {
    ContentView()
}
```

## Post

Original path: `database-firebase/3 Post Data/As1/Post.swift`

```swift
//
//  Post.swift
//  As1
//
//

//Make a new Post
import FirebaseAuth
import FirebaseFirestore

func postMessage() {
    guard let uid = Auth.auth().currentUser?.uid else { //Checks if the uid is valid
        print("User not signed in")
        return
    }
    //print(uid) //If you want to use the generated user id
    let db = Firestore.firestore()
    let user = "myusername" //We can replace this with a proper login later

    //Some placeholder data
    //[String: Any] is a dictionary that has Strings for the keys but the values can be all different types
    let postData: [String: Any] = [
        "user": user,
        "title": "House Post",
        "content": "I like this house",
        "timestamp": FieldValue.serverTimestamp()
    ]

    db.collection("posts")
      //.document(uid) //You can add these lines if you want to orginize a larger tree
      //.collection("messages")
      .addDocument(data: postData) { error in
        if let error = error {
            print("Post failed: \(error.localizedDescription)")
        } else {
            print("Message posted successfully!")
        }
    }
}
```

## Auth

Original path: `database-firebase/4 Retrieve Data/As1/Auth.swift`

```swift
//
//  Auth.swift
//  As1
//

// Auth
// This is our Anonymous Sign-In Function. The user id is automatically generated.

import FirebaseAuth

func signIn() {
    Auth.auth().signInAnonymously { result, error in
        if let error = error {
            print("Auth error: \(error.localizedDescription)")
        } else {
            print("Signed in anonymously")
        }
    }
}
```

## ContentView

Original path: `database-firebase/4 Retrieve Data/As1/ContentView.swift`

```swift
//
//  ContentView.swift
//  As1
//
//

/*  We can make a @state var for our posts. This will be an array of the type Post that we defined. We will also register a listener. This listener will activate when information on the server changes. This lets us update our view when new information is available and not rely on a button to activate the query or be constantly refreshing. */

import SwiftUI
import FirebaseFirestore

struct ContentView: View {
    @State private var posts: [Post] = []
    @State private var listener: ListenerRegistration?

    var body: some View {
        VStack {
            Text("Posts").font(.title)
            if posts.isEmpty {
                Text("No posts available.")
                    .foregroundColor(.gray)
                    .padding()
            } else {
                List(posts) { post in //List here operates like a ForEach, looping through every post in posts
                    VStack(alignment: .leading, spacing: 4) {
                        Text(post.title)
                            .font(.headline)
                        Text(post.content)
                        Text("By \(post.user)")
                            .font(.caption)
                            .foregroundColor(.gray)
                    }
                    .padding(.vertical, 4)
                }
            }

            Button("Post") {
                postMessage()
            }
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
        .onAppear {
            signIn() //Runs our authentication function
            startListening() //Adds our listener
        }
        .onDisappear {
            listener?.remove()  //Removes our listener if the view changes
        }  //This prevents a memory leak
    }

    //This function retrieves data from the server
    func startListening() {
        let db = Firestore.firestore()

        //Our listener looks for changes to the posts collection
        listener = db.collection("posts")
            .order(by: "timestamp", descending: true)  //It returns the items in that collection based on when it was posted (timestamp)
            .addSnapshotListener { snapshot, error in
                if let error = error {
                    print("Error listening: \(error.localizedDescription)")
                    return
                }
    //This takes the data that is returned and encodes it in the format of the Post struct we created.
    //It then adds it to the posts array.
                posts = snapshot?.documents.compactMap {
                    try? $0.data(as: Post.self)
                } ?? []
    //If it fails, it returns an empty array
                print("Loaded \(posts.count) posts")
            }
    }
}

#Preview {
    ContentView()
}
```

## DataFormat

Original path: `database-firebase/4 Retrieve Data/As1/DataFormat.swift`

```swift
//
//  PostStruct.swift
//  As1
//
//
/*  When retrieving data from Firestore, we first need to define our data object. This is a struct that we formatted to hold our data when the Snapshot comes back from the server. Identifiable means this type must have a stable ID. This lets us use ForEach loops on it later. Codable allows this struct to be easily encoded into an external data format like JSON. @DocumentID Lets us grab the ID from the parent. This eliminates the need for the redundant storage of IDs in the data itself. */

import FirebaseFirestore

struct Post: Identifiable, Codable {
    @DocumentID var id: String?
    let title: String
    let content: String
    let user: String
}
```

## PostAction

Original path: `database-firebase/4 Retrieve Data/As1/PostAction.swift`

```swift
//
//  Post.swift
//  As1
//
//

//Make a new Post
import FirebaseAuth
import FirebaseFirestore

func postMessage() {
    guard let uid = Auth.auth().currentUser?.uid else { //Checks if the uid is valid
        print("User not signed in")
        return
    }
    print(uid) //If you want to use the generated user id

    let db = Firestore.firestore()
    let user = "myusername" //We can replace this with a proper login later

//The postData var can be setup like a dictionary that can be easily formatted to a JSON style string. Dont use capitals for the field names.

    let postData: [String: Any] = [
        "user": user,
        "title": "House Post", // Some placeholder data
        "content": "I like this house",
        "timestamp": FieldValue.serverTimestamp()
    ]

// Add our postData var to the database under posts
// Print the error if there was a problem

    db.collection("posts")
      .addDocument(data: postData) { error in
        if let error = error {
            print("Post failed: \(error.localizedDescription)")
        } else {
            print("Message posted successfully!")
        }
    }
}
```
