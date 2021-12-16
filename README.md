# _Storagemate_
## _Laobokside välja rentimise app_


![GitHub issues](https://img.shields.io/github/issues/rakenduste-programmeerimine-2021/storagemate)
![GitHub pull requests](https://img.shields.io/github/issues-pr/rakenduste-programmeerimine-2021/storagemate)

## _Autorid_
- Ken Pikanõmme
- Karl-Reimond Kõrs

## _Lühikirjeldus / idee_
Väikeste laobokside välja rentimise app, mis võimaldab näha erineval ajavahemikul rentimiseks vabu laobokse, saada nende kohta infot(hind, mõõdud, maht) ning sobiva leidmisel seda mingiks ajavahemikuks broneerida. Broneerimiseks peab kasutaja omale kasutaja looma ja sisse logima. Sisselogitud kasutaja saab  viia broneeringu lõpuni ja "minu laod" alt näha informatsiooni välja renditud ladudest, rentimise perioodi pikendada ja ka lao rentimist lõpetada. Rentimsie perioodil saavad olema piirangud(ette rentimine maksimaalne periood ja minimaalne rentimisperiood. Lisaks administeerimise pool,kus saab laoboxe ajutiselt rentimsiest eemaldada, broneeringuid kinnitada, lõpetada. Adminil oma eraldiseisev login. Lisaks ka tiitelleht ja kontaktinfo leht. Teavitused meili teel(maksejuhis, kinnitus).


## _Kasutatavad tehnoloogiad_
 - [Docker]
 - [React]
 - [Node.js]
 - [Express]
 - [MongoDB]

## _Funktsionaalsused_

- kasutajakonto loomine ja login
- laobokside informatsooni kuvamine vastavalt valitud perioodile
- sisselogitud kasutajal lao broneerimine
- kasutajapoolne rentimisperioodi pikendamine ja lõpetamine
- administraatori login
- administraatori poolne ülevaade ladudest
- administraatori poolne lao rendile andmise peatamine(lukustus).
- administraatori poolne rentimise  lõpetamine.
- email teavitused broneerimisel, kinnitamisel.

## _Wireframe_
   **[Miro link]**


## _Installeerimisjuhis_
Eeldused:
 Dockeri ja vsCode installeeritud
-Klooni repositoorium (võib ka lihtsalt alla laadida)

```sh
git  clone https://github.com/rakenduste-programmeerimine-2021/storagemate.git
```
-Navigeeri kausta local_dev
```sh
cd storagemate/local-dev
```
-Installeeri backend (node-modules)
```sh
docker-compose run --rm --no-deps backend-node install
```
-Installeeri frontend (node-modules)
```sh
docker-compose run --rm --no-deps frontend-react install
```
-Stardi Dockeris
```sh
docker-compose up -d
```
-Edasi käivita Dockeris vajutades local-dev järel start nuppu
Rakendusele saab ligi Dockeris frontend järel nuppu OPEN IN BROWSER klikkides või aadressilt locahost:3000 

Enjoy!






[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Docker]: <https://www.docker.com/get-started>
   [React]: <https://reactjs.org/>
   [Node.js]: <http://nodejs.org>
   [Express]: <http://expressjs.com>
   [MongoDB]: <https://www.mongodb.com/>
   [Miro link]: <https://miro.com/app/board/o9J_lkgtdlc=/>

  
