# volito-test

A location-based notes app. Developed by [Von Divino](https://www.linkedin.com/in/von-divino/), an applicant for Mobile Developer position at Volito.

## Installable application

- [Android (.apk)](https://expo.dev/accounts/vrfdivino/projects/volito-test/builds/0dc990a3-fc1f-43fd-8a71-be978c849376)
- No iOS build since it requires certification from Apple Developer. You may run it locally using the Simulator as discussed in [Technical design](#technical-design) section.

## Link to full project code

- [GitHub](https://github.com/vrfdivino/volito-test)

## Technical design

### Getting started

1. Download the [repository](#link-to-full-project-code).
2. Software needed: `node@lts` and `Android Studio`/`XCode` to run the simulator.
3. Inside the repository, install by running the command `npm i`.
4. Run the project using the command `npm run [ios|android]`.

### Tech stack

#### Tooling

1. [expo](https://docs.expo.dev/) - modern tooling for React Native applications.
2. [eas](https://docs.expo.dev/tutorial/eas/introduction/) - build services for React Native applications.

#### State managment

1. [mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome) - represent centralized state as tree.
2. [formik](https://formik.org/docs/overview) - state management for forms.

#### Others

1. [react-navigation](https://reactnavigation.org/) - for stack and tab routing.
2. [luxon](https://moment.github.io/luxon/#/) - used for date formatting.
3. [firebase](https://firebase.google.com/) - services for authentication, database, and storage.
4. Other `expo`-related services like `location`, `map`, `date-picker`, and etc.
5. For styling, I simply use the native `Stylsheet`.

### Models

![uml](/docs//uml.png)

1. Each notes has an owner of User.
2. When a Note is created, the current Location of the owner will be applied.

### Features implemented

#### Main features

![main features](/docs//main.gif)

- [x] The user should be able to log in.
- [x] The user should be able to register.
- [x] The user should be able to log out.
- [x] The user should be able to see the welcome message.
- [x] The user should be able to see the notes list.
- [x] The user should be able to sort the notes list by creation.
- [x] The user should be able to see the notes map.
- [x] The user should be able to see the details of note.
- [x] The user should be able to add new note.
- [x] The user should be able to edit existing note.
- [x] The user should be able to delete existing note.

#### Advanced features

![advanced features](/docs//advanced.gif)

- [x] The user should be able to attach image in the note.
- [x] The user should be able to see real-time updates of the notes.
- [x] Persistent log in.

## List of known bugs

- [ ] Welcome message persists even the user is already logged in. It should be shown one time after sign up.
- [ ] Some UI quirks.
- [ ] iOS maps configuration
