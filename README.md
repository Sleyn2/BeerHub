# BeerHub
BeerHub jest to aplikacja webowa stworzona w ramach projektu z przedmiotów na Studiach, która używa open source [API](https://punkapi.com/). Back-end aplikacji został stworzony w oparciu o środowisko [Node.js](https://nodejs.org/en/). [Angular framework (version 15.0.0)](https://angular.io/) został użyty do stworzenia front-endu aplikacji. W celu stworzenia aplikacji zostały użyte pakiety [Bootstrap](https://ng-bootstrap.github.io/#/home), [MaterialUI](https://material.angular.io/). Również zostały użyte inne dostępne pakiety i serwisy Angulara jak np. NGX Cookie Service.
## Instalacja
### Node.js oraz NPM (Node Package Manager)
- Instalator Node.js dostępny jest pod adresem: https://nodejs.org/en/
- Podczas instalacji Node.js domyślnie instalowany jest również NPM (Node Package Manager).
#### Komendy wiersza poleceń do wykonania w katalogu z serverem node (BeerHub/BeerHub-server):
- Instalacja pakietów:
npm i
### Aplikacja Angular
#### Komendy wiersza poleceń do wykonania w katalogu z aplikacją Angular (BeerHub/BeerHub):
- Instalacja Angulara:
npm install -g @angular/cli
- Instalacja pakietów:
npm i
#### Inne przydatne komendy:
- Dodawanie komponentów:
ng generate component xyz
## Uruchomienie aplikacji
### Node.js
#### Komendy wiersza poleceń do wykonania w katalogu z serverem node (BeerHub/BeerHub-server): 
-  Uruchomienie:
node server.js
### Aplikacja Angular
#### Komendy wiersza poleceń do wykonania w katalogu z aplikacją Angular (BeerHub/BeerHub):
-  Uruchomienie:
ng serve
### Używanie aplikacji
- Gdy Node server oraz aplikacja Angular zostaną uruchomione, to aplikacja jest dostępna pod adresem: http://localhost:4200/
## Najważniejsze pakiety
- Bootstrap:
https://ng-bootstrap.github.io/#/home
- MaterialUI:
https://material.angular.io/
## Pomocne strony
- Node.js:
https://nodejs.org/en/
- Angular:
https://angular.io/
- SQLite Viewer:
https://inloop.github.io/sqlite-viewer/
- Punk API:
https://punkapi.com/
- Dokumentacja Punk API:
https://punkapi.com/documentation/v2