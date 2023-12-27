// const express = require('express');
// const bodyParser = require('body-parser');

// const userRoute=require('./routes/userRoute.js');
import userRoute from "./routes/userRoute.js"
// const todoRoute=require("./routes/todoRoutes.js")
import todoRoute from "./routes/todoRoutes.js"

// const express = require('express');
import express from 'express'
// const bodyParser = require('body-parser');
import bodyParser from 'body-parser'
// const mongoose = require('mongoose');
import mongoose from "mongoose"
const app=express();

app.use(bodyParser.json());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use("/api", userRoute);
app.use("api/todo",todoRoute)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

mongoose
  .connect(
    `mongodb+srv://utsavmadeshia:1111aaaa@cluster0.2glorbk.mongodb.net/Todo?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000,()=>{
        console.log("app runing")
    });
  })
  .catch(err => {
    console.log(err);
  });

