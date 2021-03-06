# Mock API Service

> ### Get a full fake REST API with zero coding in less than 10 seconds.

Being a part of front-end and back-end development teams, many times the back-end/third party APIs are just not ready for integration and testing. To get around that, you can simply dump the mock JSON responses here with the required endpoint to get API endpoints up and running.
## Usage
> ***WARNING: An earlier version of the package was using `':'` as a separator. Since `':'` is not a valid filename character in windows, we had to migrate to a more generic separator which is `' '`(space).  
We do provide backward compatibility, so even if you are using `':'` as a separator, you have nothing to worry about.***

![How to use](docs/assets/usage.gif)



- Create a JSON file with the name of the endpoint in **`mocks`** folder. Place the mock response content in the file. Example creating a file with the name *`hello.json`* with the content.
    ```
    {
        "message": "Hello World"
    }
    ```
    will create an endpoint *`/hello`* and return the content in API response.
- You can also create nested sub-directories inside `mocks` to generate a nested route.
- Naming Convention for the files inside `mocks` folder: **`<HTTP-METHOD><SPACE><ENDPOINT_NAME>.json`**  
    By default, the HTTP method is assumed to be `GET`.
    | Http Method | Endpoint | Filename |
    | --- | --- | --- |
    | `HTTP-METHOD` | `/endpoint` | `method-in-lower-case endpoint.json` |
    | GET | /ping | get ping.json or ping.json |
    | POST | /user | post user.json |
    | PUT | /user | put user.json |
    | DELETE | /user | delete user.json |
    #### Example:
    **A directory structure like this generates the following routes**
    ```
    mocks
    ├── ping.json
    ├── students
    │   └── teams
    │       ├── alpha.json
    │       ├── beta.json
    │       └── post teams.json
    └── users
        ├── new.json
        └── old.json
    ```

    **List of all generated routes**
    ```
    Adding route:  GET /ping
    Adding route:  GET /students/teams/alpha
    Adding route:  GET /students/teams/beta
    Adding route:  POST /students/teams/teams
    Adding route:  GET /users/new
    Adding route:  GET /users/old
    ```
    
- Run `npx json-mocks` to start the server.
> ***WARNING:***  
    - Ensure to run the command `npx json-mocks` at the same level where the `mocks` folder is created.  
    DO NOT RUN IT INSIDE THE `mocks` FOLDER.  
    - The filenames should be in urlencoded format else the endpoints won't accesible. This essentially means to create an endpoint `/data list` the filename should be `/data%20list`.

## ENV Variables

- **PORT:** Port at which the node server will run. If not specified the server will run at port 8080.
- **SERVICE_NAME:** Service prefix of path at which the files will be exposed. Default value is empty string.  
    #### Usecase  
    If you want to generate the following routes
    ```
    GET /user-service/students/teams/alpha
    GET /user-service/students/teams/beta
    POST /user-service/students/teams/teams
    GET /user-service/users/new
    GET /user-service/users/old
    ```
    i.e. prefix `user-service` to all the end points. Then you can set the value of `SERVICE_NAME` variable to `user-service` and have the following folder structure:
    ```
    mocks
    ├── students
    │   └── teams
    │       ├── alpha.json
    │       ├── beta.json
    │       └── post teams.json
    └── users
        ├── new.json
        └── old.json
    ```

## Development
- Clone the repo.  
Place the mock response JSONs with appropriate filenames inside the `mocks` folder and start the server. You should be good to go.  
    > You can run the node server locally or use docker.
    - #### Docker
        1. Run `docker build . -t mock-api` to build the docker image.
        2. Run `docker run -p 8080:8080 -d mock-api` to run the container at `8080` port.
    - #### Locally
        1. Run `npm install`.
        2. Run `npm start` to start the server at `8080` or the specified port in env variables. Hit the `/ping` route to check the health of the server.  
- Check server logs to get list of all the generated endpoints and any incoming requests. We use [`morgan`]('https://github.com/expressjs/morgan') to log all the incoming requests.  
    #### Sample logs
    ```
    Adding route:  GET /user-service/ping  
    Adding route:  GET /user-service/students/teams/alpha  
    Adding route:  GET /user-service/students/teams/beta  
    Adding route:  POST /user-service/students/teams/teams  
    Adding route:  GET /user-service/users/new  
    Adding route:  GET /user-service/users/old  
    Server is running on PORT 8080  
    ::1 - GET /user-service/ping HTTP/1.1 200 18 - 4.575 ms  
    ::1 - GET /user-service/users/old HTTP/1.1 200 62 - 1.624 ms
    ```
