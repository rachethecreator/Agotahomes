const path = require('path');
const shelterController = {};
const fetch = require('node-fetch');

shelterController.getShelters = (req, res, next) => {
  const url =
    'https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/158/query?where=1%3D1&outFields=*&outSR=4326&f=json';
  fetch(url)
    .then(data => data.json())
    .then(shelters => {
      const sheltersArr = [];
      const categoryKeywords = categoryToKeywords[req.body.category]; // ['youth', 'young', 'runaway', 'at-risk']
      for (let i = 0; i < shelters.features.length; i++) {
        const {
          OBJECTID,
          Name,
          description,
          addrln1,
          addrln2,
          city,
          zip,
          hours,
          phones,
          email,
          url
        } = shelters.features[i].attributes;
        // if there is no category word or if the description contains any of the keywords, then push it
        if (
          !categoryKeywords ||
          categoryKeywords.find(keyword =>
            description.toLowerCase().includes(keyword)
          )
        ) {
          sheltersArr.push({
            OBJECTID,
            Name,
            description,
            addrln1,
            addrln2,
            city,
            zip,
            hours,
            phones,
            email,
            url
          });
        }
      }
      res.locals.shelters = sheltersArr;
      return next();
    })
    .catch(err => console.log("You're in the shelterController!", err));
};

const categoryToKeywords = {
  women: ['women', 'pregnant', 'battered', 'domestic violence', 'victims'],
  families: ['families', 'children', 'family'],
  youth: ['youth', 'young', 'runaway', 'at-risk'],
  substance: ['substance', 'drug'],
  mental: ['mental', 'mentally ill'],
  veterans: ['veterans'],
  housing: ['housing', 'shelter', 'motel'],
  food: ['food'],
  counseling: ['counseling'],
  transportation: ['transportation'],
  employment: ['employment'],
  disabled: ['developmental', 'disabilities'],
  holiday: ['holiday'],
  std: ['hiv', 'aids'],
  education: ['education'],
  refugees: ['refugees'],
  translator: ['translator', 'interpreter']
};

module.exports = shelterController;
