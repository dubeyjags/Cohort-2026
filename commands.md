## Docker & MongoDB Quick Notes

### Docker Core Concepts

Image = Blueprint | Container = Running app | Volume = Persistent storage | Compose =
Multi-container tool

### Common Docker Commands

```js
docker run -d -p 27017:27017 mongo // Run container
docker ps // List containers
docker ps -a // List containers
docker compose up // up docker
docker compose down // down the docker
docker stop mongodb // Stop / Start container
docker start mongodb // Stop / Start container
docker rm mongodb //Remove container
docker logs -f mongodb  // Logs
docker exec -it mongodb mongosh //Access container
```

### MongoDB Commands

```js
docker exec -it mongodb mongosh // Access Mongo shell
show dbs //Show databases
use mydb  //Use database
show collections // Show collections
db.users.insertOne({ name: "Aman", age: 25 }) // Insert data
db.users.find().pretty() // View data
db.users.find({ age: 25 }) //Filter data
db.users.find().limit(5) //Limit results
```
