db = db.getSiblingDB("solarsystemdb");
db.createCollection("planets");
db.planets.insertMany(JSON.parse(cat("/docker-entrypoint-initdb.d/planets.json")));
