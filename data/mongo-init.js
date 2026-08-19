db = db.getSiblingDB("solar-system");
db.createCollection("planets");
db.planets.insertMany(JSON.parse(fs.readFileSync("/docker-entrypoint-initdb.d/planets.json", "utf8")));
