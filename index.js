const express = require("express");
const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", "./public")

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

const players = [];

const pixels = [];
const pixelsGridSize = 16;

// 16 x 16 (256 pixels)
for (let x = 1; x <= pixelsGridSize; x++) {
  pixels[x] = [];
  for (let y = 1; y <= pixelsGridSize; y++) {
    pixels[x][y] = {color: "#000000"};
  }
}

const generateColor = () => {
  return Math.floor(Math.random()*16777215).toString(16);
}

const validPixel = (pixel) => {
  return (typeof pixel == "number" && pixel >= 1 && pixel <= pixelsGridSize);
}

const getPlayer = (id) => {
  return players.find(player => player.id == id);
}

app.get("/", (request, response) => {
  // response.sendFile(`${__dirname}/public/index.html`,)
  response.render("index.ejs", {players: players, pixels: pixels});
})

// hello
app.get("/1", (request, response) => {
  // intro call to json
  response.json({hello: "world!"});
})

// connect
app.post("/2", (request, response) => {
  try {
    // join with username
    if(request.body.name) {
      // assign socket to user

      const id = require("crypto").randomUUID();
      const user = {id, user: request.body.name, color: `#${generateColor()}`};

      const exists = players.find(player => player.user == user.user);

      if(exists) {
        response.status(400).json({success: false, error: "user already there"});
      } else {
        players.push(user);
        io.emit("user", {user: user.user, color: user.color});
        response.json({success: true, id});
      }
    } else {
      response.status(400).json({success: false, error: "invalid request: requires name attribute"});
    }
  } catch (e) {
    response.status(400).json({success: false, error: "failed request"});
  }
})

const requests = []

// request
app.put("/3", (request, response) => {
  try {
    const x = request.body.x;
    const y = request.body.y;
    const player = getPlayer(request.body.id);
  
    if(validPixel(x) && validPixel(y) && player) {
      requests.push({x, y, player});
      
      // emit: flash pixel and set it to player color
      io.emit("flash", {x, y, color: player.color});
      
      response.json({success: true});
    } else {
      response.status(400).json({success: false, error: "invalid request: pixel requires x (< 16), y (< 16) and id attribute"})
    }
  } catch (e) {
    response.status(400).json({success: false, error: "failed request"});
  }
})

// retreive
app.put("/4", async (request, response) => {
  if(request.body.url) {
    try {
      const res = await fetch(url);
      const json = await res.json();
      const {x, y, color, id} = json;
      const player = getPlayer(id);

      if(validPixel(x) && validPixel(y) && color && player) {
        response.status(400).json({success: false, error: "invalid data provided, requires: x (< 16), y (< 16), color and id"})
      } else {
        pixels[x][y] = color;

        // emit color
        io.emit("pixel", {x, y, color: color});

        response.json({success: true, x, y, color});
      }
    } catch (e) {
      response.status(400).json({success: false, error: "could not get data"})
    }
  } else {
    response.status(400).json({success: false, error: "requires url to retreive data"})
  }
})


server.listen(4000, () => {
  console.log("listening on *:4000");
});
