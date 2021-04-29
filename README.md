# Mock API Service

## Usage
- Create a JSON file with the name of the endpoint in **mocks** folder. Place the mock response content in the file. Example creating the a file with the name *hello.json* with the content
    ```
    {
        "message": "Hello World"
    }
    ```
    will create an endpoint */health* and return the content in API response.
- You can also create nested sub-directories inside `mocks` to generate a nested route

    #### Example:
    **A directory structure like this generates the following routes**
    ```
    mocks
    ├── ping.json
    ├── students
    │   └── teams
    │       ├── alpha.json
    │       ├── beta.json
    │       └── post:teams.json
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
    
- Start the server and you should be good to go.

## ENV Variables

- PORT : port at which the node server will run. If not specified the server will run at port 8080
- SERVICE_NAME : service prefix of path at which the files will be exposed.

## Development
- Clone the repository and run `npm install`.
- Run `npm start` to start the server at the specified port. Hit the `/ping` route to check the health of the server.
