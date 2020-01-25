const express = require("express");
const verifyID = require("./middlewares/middleware");

server = express();
server.use(express.json());

const projects = [];

let count = 0;

server.use((req, res, next) => {
  count++;
  console.log(`Aplicação ja foi usada ${count}`);
  next();
});

server.post(
  "/projects",
  (req, res, next) => {
    let data = req.body;
    if (!data.id || !data.title) {
      return res.status(400).json({
        error_code: 1,
        msg: "Information was missing from the body of the request"
      });
    }
    return next();
  },
  (req, res) => {
    let data = req.body;
    projects.push({ id: data.id, title: data.title, tasks: [] });
    return res.json({
      sucess: true,
      msg: "The project was successfully created"
    });
  }
);

server.get("/projects", (req, res) => {
  res.json({ projects });
});

server.put(
  "/projects/:id",
  verifyID,
  (req, res, next) => {
    if (!req.body.title) {
      return res.status(400).json({
        error_code: 1,
        msg: "Information was missing from the body of the request"
      });
    }
    return next();
  },
  (req, res) => {
    projects.forEach(item => {
      if (item.id == req.params.id) {
        item.title = req.body.title;
      }
    });
    return res.json({
      sucess: true,
      msg: "The projects was successfully update"
    });
  }
);

server.delete("/projects/:id", verifyID, (req, res) => {
  projects.forEach((item, index) => {
    if (item.id == req.params.id) {
      projects.splice(index, 1);
    }
  });
  return res.json({
    sucess: true,
    msg: "The projects was successfully removed"
  });
});

server.post(
  "/projects/:id/tasks",
  verifyID,
  (req, res, next) => {
    if (!req.body.title) {
      return res.status(400).json({
        error_code: 2,
        msg: "Information was missing from the body of the request"
      });
    }
    return next();
  },
  (req, res) => {
    projects.forEach((item, index) => {
      if (item.id == req.params.id) {
        item.tasks.push(req.body.title);
      }
    });

    return res.json({
      success: true,
      msg: "The task was successfully added to the project"
    });
  }
);

server.listen(3000, () => {
  console.log("Server running in port 3000");
});
