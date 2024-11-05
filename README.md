# RxJS Map Operators Demo

An interactive demonstration of RxJS mapping operators using Angular 18. This project helps developers understand the key differences between `concatMap`, `switchMap`, `mergeMap`, and `exhaustMap` through visual examples.

![RxJS Operators Demo](https://angular.dev/assets/images/logos/angular/angular.svg)

## 🚀 Features

- Real-time demonstration of four RxJS mapping operators
- Interactive search input with debounce
- Visual representation of operator behaviors
- Simulated API calls with random delays

## 🔍 Operator Explanations

### concatMap
- Executes operations in sequence
- Maintains order of execution
- Queues subsequent operations
- Best for: Operations that must be executed in order

### switchMap
- Cancels previous operation when new one starts
- Only cares about the latest value
- Best for: Search operations where old results don't matter

### mergeMap
- Executes operations in parallel
- Doesn't cancel previous operations
- Best for: Independent parallel operations

### exhaustMap
- Ignores new operations until current one completes
- Best for: Preventing duplicate form submissions

## 🛠️ Technical Stack

- Angular 18
- RxJS 7.8
- TypeScript 5.5

## 🏃‍♂️ Running the Project

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open your browser and navigate to the provided URL

## 💡 How to Use

1. Type in the search box
2. Observe how each operator handles the input differently:
   - Watch concatMap queue the operations
   - See switchMap cancel previous operations
   - Notice mergeMap running operations in parallel
   - Observe exhaustMap ignoring new inputs until completion

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📝 License

This project is MIT licensed.

---

Made with ❤️ using Angular