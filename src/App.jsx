import { Provider } from "react-redux"

import { HashRouter as Router, Route, Routes } from "react-router-dom"

import { store } from "./store/store.js"

import { AppHeader } from "./cmps/AppHeader.jsx"
import { AppFooter } from "./cmps/AppFooter.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"

import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/" />
              <Route element={<AboutUs />} path="/about" />
              <Route element={<ToyIndex />} path="/toy" />
            </Routes>
          </main>
          <AppFooter />
          <UserMsg />
        </section>
      </Router>
    </Provider>
  )
}
