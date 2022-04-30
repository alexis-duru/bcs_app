# -------- ///////////////////  -------- #

# --------   CREATION DES REQUÊTES  -------- #

# -------- ///////////////////  -------- #


# 1 - Test des requêtes dans POSTMAN : 

``Création des requêtes en fonction des entités``

{ GET / POST / PUT / DELETE }

``Ne pas oublier de recuperer l'url de customer pour invoices lors de mes tests dans postman``

### ###  ###  ###  ###  ### 

# ex : {
  "amount": 200,
  "sendingAt": "2022-03-08T10:29:17.214Z",
  "status": "SENDING",
  "customer": "/api/customers/1"
}
### ###  ###  ###  ###  ### 

# Récupérer l'url du customer pour les tests

------------------------------------------

``Dans mon Entity Symfony :``


# Préparation des requêtes dont je vais avoir besoin
#[ApiResource(
    collectionOperations:["GET"],
    itemOperations:[]
)]

# Création de groupes pour chaques méthodes
``Permet d'afficher ce que l'on veut```

ex : #[Groups(["read:Customer:item"])]




