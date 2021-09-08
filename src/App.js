import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

import React, { useState, useEffect } from "react";

import { Route, Switch, Link } from "react-router-dom";

function App() {
  //////////////////////
  // style objects
  //////////////////////
  const h1 = {
    textAlign: "center",
    margin: "10px",
  };

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }


  /////////////////////////
  // State & Other Variables
  /////////////////////////

  // API URL
  const url = "https://am-628-django-todos.herokuapp.com/todos/";

  // State to Hold List of Todos
  const [posts, setPosts] = useState([]);

  //////////////////////////
  // Functions
  //////////////////////////

  const getTodos = async () => {
    const response = await fetch(url)
    const data = await response.json()
    setPosts(data)
  }

  const addTodos = async (newTodo) => {
    const response = await fetch(url, {
      method:"post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })

    getTodos()
  }

  const nullTodo = {
    subject: "",
    details: ""
  }

  //////////////////////////
  // useEffects
  //////////////////////////

  useEffect(() => {getTodos()}, [])

  //////////////////////////////
  // Returned JSX
  //////////////////////////

  return (
    <div className="App">
      <h1 style={h1}> My Todo List </h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerProps) => <AllPosts {...routerProps} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerProps) => <SinglePost {...routerProps} posts={posts} />}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form {...routerProps}/>}
        />
        <Route
          path="/edit"
          render={(routerProps) => <Form {...routerProps}/>}
        />
        <Route
          path="/new"
          render={(routerProps) => <Form 
            {...routerProps}
            initialTodo={nullTodo}
            handleSubmit={addTodos}
            buttonLabel="Create Todo"
            />}
        />

      </Switch>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
    </div>
  );
}

export default App;
