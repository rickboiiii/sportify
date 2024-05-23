# Sportify

<div align="center">
  <img src="https://github.com/rickboiiii/sportify/blob/master/files/images/sportify_logo1.png?raw=true" alt="Sportify Logo by @nejra20" height="300">
</div>

---

## O projektu - `BS`

Sportify - full stack FASTAPI-Next.js projekat \
Razvijen u svrhu sticanja i širenja znanja vezanog za našu dragu profesiju. \
Da ne spominjemo da se predmet položi odličnim uspijehom - :heart: Dinamički Web Sistemi.

## Tim

- Đeneta V. [@asasad204](https://github.com/asasad204)
- Emina B. [@eminabesic](https://github.com/eminabesic)
- Matej P. [@PMatej1](https://github.com/PMatej1)
- Nejra A. [@nejra20](https://github.com/nejra20)
- Riad P. [@rickboiiii](https://github.com/rickboiiii) 

## Postavke za lokalno okruženje
### Aplikacijski zahtjevi

- Python [(currently 3.12.3)](https://www.python.org/ftp/python/3.12.3/python-3.12.3-amd64.exe)
- PostgreSQL [(currently 16.2)](https://sbp.enterprisedb.com/getfile.jsp?fileid=1258893)
- GitBash [(currently 2.44.0)](https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe)
- IDE ili Code Editor vašeg izbora

### Pokretanje

Nakon kloniranja repozitorija, u terminal-u potrebno je upisati sljedeće komande

- `cd sportify/backend` 
- `python -m venv env`
- `source ./env/Scripts/activate`
- `pip install -r requirements.txt`
- `cd ../`
- `cp .env.example .env`
- `cd frontend`
- `npm install`

#### Backend pokretanje

Potrebno je uraditi sljedeće:
 1. dotENV fajl prilagoditi lokalnom okruženju
 2. Pokrenuti bazu (pgAdmin4) 
 3. Unutar root folder-a samog projekta (sportify), otvoriti terminal, te upisati sljedeću komandu
    - `uvicorn backend.main:app --reload`
 
 *Poznati problemi - kada nije moguće **uvicorn** lokalni server prekinuti sa `Ctrl+C`,
 potrebno je pronaci unutar **Task Manager-a** sve procese `python.exe`, te ih prekinuti.*

#### Frontend pokretanje

Unutar root folder-a samog projekta (sportify), otvoriti terminal i upisati sljedeće komande
- `cd frontend`
- `npm run dev`

#### Seed-anje baze podataka

*Bitno je pokrenuti barem jednom FASTAPI backend, kako bi seed-eri funkcionisali.*
Terminal komanda za seedanje baze podataka:
- `python -m backend.seeders`

## Generalne smjernice

- Pravilo **KISS** - ***K**eep **I**t **S**tupid **S**imple*
- Uvijek komentarisati kompleksan kod
- Sve (varijable, funkcije, metode itd.) pisati razumljivo ili smisleno 
- **REST**ful je put
- *Commit poruke trebaju biti čiste, čitljive i objašnjive*

---

## About - `EN`

Sportify a full stack FASTAPI-Next.js project \
Developed for acquiring and expanding knowledge regarding our beloved profession. \
Not to mention passing the class with flying colors - :heart: Dynamic Web Systems.

## Team

- Đeneta V. [@asasad204](https://github.com/asasad204)
- Emina B. [@eminabesic](https://github.com/eminabesic)
- Matej P. [@PMatej1](https://github.com/PMatej1)
- Nejra A. [@nejra20](https://github.com/nejra20)
- Riad P. [@rickboiiii](https://github.com/rickboiiii) 

## Setup locally
### Requirements

- Python [(currently 3.12.3)](https://www.python.org/ftp/python/3.12.3/python-3.12.3-amd64.exe)
- PostgreSQL [(currently 16.2)](https://sbp.enterprisedb.com/getfile.jsp?fileid=1258893)
- GitBash [(currently 2.44.0)](https://github.com/git-for-windows/git/releases/download/v2.44.0.windows.1/Git-2.44.0-64-bit.exe)
- IDE or Code Editor of your choosing

### Starting up

After cloning the repository, in the terminal window write the following commands

- `cd sportify/backend` 
- `python -m venv env`
- `source ./env/Scripts/activate`
- `pip install -r requirements.txt`
- `cd ../`
- `cp .env.example .env`
- `cd frontend`
- `npm install`

#### Backend starting up

Necessary steps:
 1. Adjust dotENV file according to your local environment
 2. Start database (pgAdmin4) 
 3. Inside root directory (sportify), open a new terminal window, then write following command
    - `uvicorn backend.main:app --reload`
 
 *Known issues - when you are not able to stop **uvicorn** local server with `Ctrl+C`, 
 you have to find all `python.exe` processes inside **Task Manager** and end them.*

#### Frontend starting up

Inside root directory (sportify), open a new terminal window and write the following commands 
- `cd frontend`
- `npm run dev`

#### Database seeding

*It's necessary to run FASTAPI backend at least once, so that seeders would function.*
Terminal command for database seeding:
- `python -m backend.seeders`

## General guidelines

- Rule **KISS** - ***K**eep **I**t **S**tupid **S**imple* 
- Always comment complex code
- Write sensible / clean names for everything (variables, functions, methods, etc.)
- **REST**ful is the way
- *Commit messages should be clean, readable and explainable*
