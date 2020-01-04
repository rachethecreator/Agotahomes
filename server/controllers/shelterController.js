const path = require('path');
const shelterController = {};
const fetch = require('node-fetch');

shelterController.getShelters = ((req, res, next) => {
  const url = 'https://public.gis.lacounty.gov/public/rest/services/LACounty_Dynamic/LMS_Data_Public/MapServer/158/query?where=1%3D1&outFields=*&outSR=4326&f=json'
  console.log('inside shelterController above the fetch')
  fetch(url)
  .then(data => data.json())
  .then(shelters => {
    const sheltersArr = [];
    for (let i = 0; i < shelters.features.length; i++) {
      const { OBJECTID, Name, description, addrln1, addrln2, city, zip, hours, phones, email, url } = shelters.features[i].attributes
      sheltersArr.push({OBJECTID, Name, description, addrln1, addrln2, city, zip, hours, phones, email, url})
    }
    res.locals.shelters = sheltersArr;
    return next()
  })
  .catch(err => console.log('You\'re in the shelterController!', err))
})

module.exports = shelterController;