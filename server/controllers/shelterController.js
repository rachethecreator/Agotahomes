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
      const categoryKeywords = categoryToKeywords[req.query.category]; // ['youth', 'young', 'runaway', 'at-risk']
      const selectedLocation = req.query.location;
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
          (categoryKeywords.find(keyword =>
            description.toLowerCase().includes(keyword)
          ) &&
            city === selectedLocation)
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
      res.locals.shelters = { results: sheltersArr };
      return next();
    })
    .catch(err => console.log("You're in the shelterController!", err));
};

const categoryToKeywords = {
  Women: ['women', 'pregnant', 'battered', 'domestic violence', 'victims'],
  Families: ['families', 'children', 'family'],
  Youth: ['youth', 'young', 'runaway', 'at-risk'],
  Substance: ['substance', 'drug'],
  Mental: ['mental', 'mentally ill'],
  Veterans: ['veterans'],
  Housing: ['housing', 'shelter', 'motel'],
  Food: ['food'],
  Counseling: ['counseling'],
  Transportation: ['transportation'],
  Employment: ['employment'],
  Disabled: ['developmental', 'disabilities'],
  Holiday: ['holiday'],
  Std: ['hiv', 'aids'],
  Education: ['education'],
  Refugees: ['refugees'],
  Translator: ['translator', 'interpreter']
};

module.exports = shelterController;
