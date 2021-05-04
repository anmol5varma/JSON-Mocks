# Mock API Service

## Usage
- Create a JSON file with the name of the endpoint in **mocks** folder. Place the mock response content in the file. Example creating the a file with the name *hello.json* with the content
    ```
    {
        "message": "Hello World"
    }
    ```
    will create an endpoint */hello* and return the content in API response.
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
    > You can run the server locally or use docker.
    - #### Docker
        1. Run `docker build . -t mock-api` to build the docker image.
        2. Run `docker run -p 8080:8080 -d mock-api` to run the container at `8080` port.
    - #### Locally
        1. Run `npm install` to install all the dependencies.
        2. Run `npm start` to start the server at `8080` or the specified port in env variables.

## ENV Variables

- PORT : port at which the node server will run. If not specified the server will run at port 8080
- SERVICE_NAME : service prefix of path at which the files will be exposed. Default value is empty string.  
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
    │       └── post:teams.json
    └── users
        ├── new.json
        └── old.json
    ```

## Development
- Clone the repository and run `npm install`.
- Place the mock response JSONs with appropiate filenames inside the *mocks* folder.
- Run `npm start` to start the server at the specified port. Hit the `/ping` route to check the health of the server.
- Check server logs to get list of all the generated endpoints and any incoming requests.  
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
