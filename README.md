# Mock API Service

## ENV Variables

- PORT : port at which the node server will run. If not specified the server will run at port 8080
- SERVICE_NAME : service prefix of path at which the files will be exposed.

## Development
- Clone the repository and run `npm install`.
- Run `npm start` to start the server at the specified port. Hit the `/ping` route to check the health of the server.

## Usage
- Create a JSON file with the name of the endpoint in **mocks** folder. Place the mock response content in the file. Example creating the a file with the name *hello.json* with the content
    ```
    {
        "message": "Hello World"
    }
    ```
    will create an endpoint */health* and return the content in API response.
- Start the server and you should be good to go.