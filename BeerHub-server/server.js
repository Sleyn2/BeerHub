// pobranie modułu (include z c w nodejs)
var express = require("express");

//dołączanie modułu ORM
const Sequelize = require("sequelize");

//dodanie modułu http
const axios = require("axios");

// dołączenie modułu usuwającego problem z zabezpieczeniem CORS
const cors = require("cors");

// dołączenie modułu obsługi sesji
var session = require("express-session");

//Inicjalizacja aplikacji
var app = express();
//process.env.PORT - pobranie portu z danych środowiska np. jeżeli aplikacja zostanie uruchomiona na zewnętrznej platformie np. heroku
var PORT = process.env.PORT || 8100;
//uruchomienie serwera
var server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

const sequelize = new Sequelize("database", "root", "root", {
  dialect: "sqlite",
  storage: "orm-db.sqlite",
});

const sessionParser = session({
  saveUninitialized: false,
  secret: "$secret",
  resave: false,
});

// dołączenie modułu ułatwiającego przetwarzanie danych pochodzących z ciała zaytania HTTP (np. POST)
app.use(express.json());

// dołączenie modułu CORS do serwera
app.use(cors());

// dołączenie obslugi sesji do aplikacji
app.use(sessionParser);

const WebSocket = require("ws");
const wss = new WebSocket.Server({
  noServer: true,
});

const Favourites = sequelize.define("favourites", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  beer_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER,
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

// synchroniznacja bazy danych - np. tworzenie tabel
sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
});

app.get("/api/beer/:id", [beer]);

app.get("/api/beer/random", [randomBeer]);

app.get("/api/beer-list-all/", [query]);

app.post("/api/user/fav/", [addFavourite]);

app.get("/api/user/fav/", [isFavourite]);

app.use(express.static(__dirname + "/static/"));

// BeerHub - PunkAPI
async function query(request, response) {
  let dataSet = [];
  for (let i = 1; i < 6; i++) {
    let res = await axios.get("https://api.punkapi.com/v2/beers", {
      params: { page: i, per_page: 80 },
    });
    dataSet.push(...res.data);
  }
  response.send(dataSet);
}

async function beer(request, response) {
  if (request.params.id < 1 || request.params.id > 325) {
    response.send({ error: "wrong value" });
    return;
  }
  let res = await axios.get(
    "https://api.punkapi.com/v2/beers/" + request.params.id
  );
  response.send(res.data);
}

async function randomBeer(request, response) {
  let res = await axios.get("https://api.punkapi.com/v2/beers/random");
  response.send(res.data);
}

async function addFavourite(request, response) {
  const beerId = request.body.beer_id;
  const userId = request.body.user_id;
  console.log(beerId);
  console.log(userId);
  if (userId && beerId) {
    Favourites.count({
      where: { user_id: userId, beer_id: beerId, deleted: false },
    }).then(async (count) => {
      if (count != 0) {
        const fav = await Favourites.findOne({
          where: {
            user_id: userId,
            beer_id: beerId,
            deleted: false,
          },
        });
        fav.deleted = true;
        await fav.save();
        response.send({ isFavourite: false });
      } else {
        Favourites.create({ user_id: userId, beer_id: beerId });
        response.send({ isFavourite: true });
      }
    });
  } else response.send({ wrongParams: true });
}

async function isFavourite(request, response) {
  const beerId = request.query.beer_id;
  const userId = request.query.user_id;
  if (userId && beerId) {
    const item = await Favourites.findOne({
      where: {
        user_id: userId,
        beer_id: beerId,
        deleted: false,
      },
    });
    if (item) response.send({ isFavourite: true });
    else response.send({ isFavourite: false });
  }
}

server.on("upgrade", function (request, socket, head) {
  // Sprawdzenie czy dla danego połączenia istnieje sesja
  sessionParser(request, {}, () => {
    if (!request.session.user_id) {
      socket.destroy();
      return;
    }
    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit("connection", ws, request);
    });
  });
});

let onlineUsers = {};

wss.on("connection", function (ws, request) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ status: 2 }));
    }
  });
  onlineUsers[request.session.user_id] = ws;

  ws.on("message", function (message) {
    console.log(message);
    // parsowanie wiadomosci z JSONa na obiekt
    try {
      var data = JSON.parse(message);
    } catch (error) {
      return;
    }
  });

  ws.on("close", () => {
    delete onlineUsers[request.session.user_id];
  });
});
