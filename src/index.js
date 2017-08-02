import React from "react" // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom" 
import App from "./App"
import "./index.css"

ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>, 
    document.getElementById("root"))

    //LEFT OFF HERE: install this plugin and potentially add the rule mentioned here: https://github.com/eslint/eslint/issues/6303