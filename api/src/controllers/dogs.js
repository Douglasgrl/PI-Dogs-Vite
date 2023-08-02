const axios = require('axios')
const URL = 'https://api.thedogapi.com/v1/breeds'
const STATUS_OK = 200;
const STATUS_ERROR = 404;
const { Op} = require("sequelize")
const { Dog, Temperaments } = require("../db");



const getDogsRace = async function(req, res){
    try {
        const { data} = await axios.get(`${URL}`)
        const dogsMap = []
        data.forEach((dogR) =>{
          const dogNews = {
            id : dogR.id,
            name : dogR.name,
            weight : dogR.weight.imperial,
            height : dogR.height.imperial,
            life_span : dogR.life_span,
            image : dogR.image.url,
            temperament: dogR.temperament,
        };
        dogsMap.push(dogNews)
        })
        res.status(STATUS_OK).json(dogsMap)
    } catch (error) {
        res.status(STATUS_ERROR).end(error.message)
    }
}

const getDogsRaceId = async function(req, res){
      try {
    const { id } = req.params;

    const resultDogs = await axios.get(`${URL}`)
    const allDogs = resultDogs.data;
    const dogsMap = []
    allDogs.forEach(dog => {
      const newDog = {
        id: dog.id,
        name: dog.name,
        weight: dog.weight.imperial,
        height: dog.height.imperial,
        life_span: dog.life_span,
        image: dog.image.url,
        temperament : dog.temperament,
      }
      dogsMap.push(newDog);
    });

    const dogsApi = dogsMap.find(dog => dog.id === Number(id));
    let resDb;

    if (!dogsApi) {
      const dogDb = await Dog.findByPk(id, {
        include: [{
          model: Temperaments,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }]
      });

      if (dogDb) {
        resDb = {
          id: dogDb.id,
          name: dogDb.name,
          weight: dogDb.weight,
          height: dogDb.height,
          life_span: dogDb.life_span,
          image: dogDb.image,
          temperament: dogDb.Temperaments.map((temp) => temp.name).join(', '),
        };
      }
    }

    res.status(200).json(dogsApi || resDb);
  } catch (error) {
    res.status(STATUS_ERROR).end(error.message);
  }
}

const getDogsName = async function(req, res){
  try {
    const { name } = req.query;

    const allDogs = await axios.get(`${URL}`);
    const dogsApi = allDogs.data.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

    const dbDogs = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`
        }
      },
      include: Temperaments
    });

    const dogsMap = [];
    
    dogsApi.forEach((dogR) => {
      const dogNews = {
        id: dogR.id,
        name: dogR.name,
        weight: dogR.weight.imperial,
        height: dogR.height.imperial,
        life_span: dogR.life_span,
        temperament: dogR.temperament,
        image: dogR.image.url
      };
      dogsMap.push(dogNews);
    });

    dbDogs.forEach((dbDog) => {
      const dbDogData = {
        id: dbDog.id,
        name: dbDog.name,
        weight: dbDog.weight,
        height: dbDog.height,
        life_span: dbDog.life_span,
        temperament: dbDog.Temperaments.map((temp) => temp.name).join(', '),
        image: dbDog.image
      };
      dogsMap.push(dbDogData);
    });

    if (dogsMap.length > 0) {
      res.status(STATUS_OK).json(dogsMap);
    } else {
      res.status(STATUS_ERROR).json({ message: 'No se encontró una raza de perro con el nombre especificado.' });
    }
  } catch (error) {
    res.status(STATUS_ERROR).json({ error: error.message });
  }
}



module.exports = {
    getDogsRace,
    getDogsRaceId,
    getDogsName,
}