// pobranie modułu (include z c w nodejs)
var express = require('express');

//dołączanie modułu ORM 
const Sequelize = require('sequelize')

// dołączenie modułu usuwającego problem z zabezpieczeniem CORS
const cors = require('cors');

// dołączenie modułu obsługi sesji
var session = require('express-session')

//Inicjalizacja aplikacji
var app = express();
//process.env.PORT - pobranie portu z danych środowiska np. jeżeli aplikacja zostanie uruchomiona na zewnętrznej platformie np. heroku
var PORT = process.env.PORT || 8100;
//uruchomienie serwera
var server = app.listen(PORT,() => console.log(`Listening on ${ PORT }`));

const sequelize = new Sequelize('database', 'root', 'root', {
    dialect: 'sqlite',
    storage: 'orm-db.sqlite',
});

const sessionParser = session({
    saveUninitialized: false,
    secret: '$secret',
    resave: false
});

// dołączenie modułu ułatwiającego przetwarzanie danych pochodzących z ciała zaytania HTTP (np. POST)
app.use(express.json());

// dołączenie modułu CORS do serwera
app.use(cors());

// dołączenie obslugi sesji do aplikacji 
app.use(sessionParser);

const WebSocket = require('ws');
const wss = new WebSocket.Server({
    noServer: true,
});

// Stworzenie modelu - tabeli User
const User = sequelize.define('user', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: Sequelize.STRING,
    user_password: Sequelize.STRING
})

const Favourites  =- sequelize.define('favourites', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    beer_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    deleted: Sequelize.BOOLEAN
})

// const Message = sequelize.define('message', {
//     message_id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     message_from_user_id: Sequelize.INTEGER,
//     message_to_user_id: Sequelize.INTEGER,
//     message_text: Sequelize.STRING
// })


// synchroniznacja bazy danych - np. tworzenie tabel
sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`)
})

// rejestrowanie użytkownika
function register(request, response) {
    console.log(request.body)
    var user_name = request.body.user_name;
    var user_password = request.body.user_password;
    if (user_name && user_password) {

        User.count({ where: { user_name: user_name } }).then(
            count => {
                if (count != 0) {
                    response.send({ register: false });
                } else {
                    User.create({user_name: user_name, user_password: user_password})
                        .then(() => response.send({ register: true }))
                        .catch(function (err) { response.send({ register: true })
                      });
                }
            })
    } else {
        response.send({ register: false });
    }
}

// logowanie uzytkownika
function login(request, response) {
    console.log(request.body)
    var user_name = request.body.user_name;
    var user_password = request.body.user_password;
    if (user_name && user_password) {
        User.findOne({ where: { user_name: user_name, user_password: user_password } }).then(
            user => {
                if (user) {
                    request.session.loggedin = true;
                    request.session.user_id = user.user_id;

                    response.send({ 
                        loggedin: request.session.loggedin,
                        user_name: user_name,
                        user_id: request.session.user_id
                    });
                } else {
                    request.session.loggedin = false;
                    response.send({ loggedin: request.session.loggedin });
                }
            })
    } else {
        request.session.loggedin = false;
        response.send({ loggedin: request.session.loggedin });
    }
}

// sprawdzenie logowania jeżeli funkcja checkSessions nie zwróci błędu
function loginTest(request, response) {
    response.send({ loggedin: request.session.loggedin });
}

function logout(request, response) {
    request.session.destroy();
    response.send({ loggedin: false });
}

function checkSessions(request, response, next) {
    if (request.session.loggedin) {
        next();
    } else {
        response.send({ loggedin: false });
    }
}

function getUsers(request, response) {
    if (request.session.loggedin) {
        User.findAll().then(
            users => {
                response.send({ data: users.map(function(u) {
                    let data = {}
                    data["user_id"] = u.user_id
                    data["user_name"] = u.user_name
                    data["online"] = onlineUsers[u.user_id] ? true : false
                    return data
                })})
            })
    } else {
        response.send({ loggedin: false });
    }
}

app.post('/api/register/', [register]);

app.post('/api/login/', [login]);

app.get('/api/login-test/', [checkSessions, loginTest]);

app.get('/api/logout/', [checkSessions, logout]);

app.get('/api/users/', [checkSessions, getUsers]);


app.use(express.static(__dirname + '/static/'));

server.on('upgrade', function (request, socket, head) {
    // Sprawdzenie czy dla danego połączenia istnieje sesja
    sessionParser(request, {}, () => {
        if (!request.session.user_id) {
            socket.destroy();
            return;
        }
        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request);
        });
    });
});

let onlineUsers = {};

wss.on('connection', function (ws, request) {

    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ status: 2 }));
        }
    });
    onlineUsers[request.session.user_id] = ws;

    ws.on('message', function (message) {
        console.log(message)
        // parsowanie wiadomosci z JSONa na obiekt
        try {
            var data = JSON.parse(message);
        } catch (error) {
            return;
        }
    });
    // Dla każdego nowego połączenia można zdefinować co ma wydarzyć się kiedy:
    // - przyjdzie wiadomość
    // ws.on('message', function incoming(message) {
    //     console.log('otrzymano: %s', message);

    //     // przesyłanie otrzymanej wiadomości do wszystkich połączonych ws'ow
    //     wss.clients.forEach(function each(client) {
    //         if (client.readyState === WebSocket.OPEN) {
    //             client.send(message);
    //         }
    //     });
    // });

    ws.on('close', () => {
        delete onlineUsers[request.session.user_id];
    })

});

function getMessages(request, response) {
    if (request.session.loggedin) {
        const fromUserId = request.params.id
        Message.findAll({ where: { message_from_user_id: fromUserId, message_to_user_id: request.session.user_id} }).then(
            messages => {
                response.send({ data: messages.map(function(m) {
                        let data = {}
                        data["message_from_user_id"] = m.message_from_user_id
                        data["message_to_user_id"] = m.message_to_user_id
                        data["message_text"] = m.message_text
                        data["message_date"] = new Date().toISOString().slice(0, 10)
                        return data
                    })})
                
            })
    } else {
        response.send({ loggedin: false });
    }
}
app.get('/api/messages/:id', [checkSessions, getMessages]);

function sendMessages(request, response) {
    var message_text = request.body.message_text;
    var to = request.body.message_to_user_id;
    console.log(`Received message => ${message_text} from ${request.session.user_id} to ${to}`);

    User.findAll({ where: { user_id: to } }).then(
        users => {
            if (users.length >= 1) {
                var mes = {
                    message_from_user_id: request.session.user_id,
                    message_to_user_id: users[0].user_id,
                    message_text: message_text,
                }
                var user = users[0];
                Message.create(mes)
                        .then((mes) => 
                        {
                            if (user.user_id in onlineUsers) {
                                // Wysyłanie wiadomości do użytkownika po WebSocket
                                onlineUsers[user.user_id].send(JSON.stringify({status:1, data: message_text}))
                            }
                            if (mes.message_from_user_id !== mes.message_to_user_id) {
                                if (mes.message_from_user_id in onlineUsers) {
                                     // Wysyłanie wiadomości do samego siebie jeżeli użytkownik nie wysyła wiadomości do siebie.
                                    onlineUsers[user.user_id].send(JSON.stringify({status:1, data: message_text})) //???
                                }
                            }

                            response.send({ sending: true })
                        })
                        .catch(function (err) { console.log(err); response.send({ error: err })
                      });

            } else {
                response.send({ error: "User not exists" });
            }
        })
}
app.post('/api/messages/', [checkSessions, sendMessages]);