# AffordableHousingSearchToolFinal
The AffordableHousingSearchToolFinal is a mobile responsive web application created as part of a Code for America Community Fellowship in Austin TX. It can be used on a desktop browser but is primarily meant for mobile users. It allows users to search for Affordable Housing inventory by connecting to Austin's AffordableHousingDataHub. An instance of this application was deployed for Austin TX so that residents could have one place to access the entirety of Austin's affordable housing inventory, and also filter by critiera that fit their specific needs.

### Technologies
The AffordableHousingSearchToolFinal uses node on the backend and javascript / JQuery / css on the frontend. It uses Leaflet's javascript library for interactive maps, with a dependency on Mapbox's API. A Mapbox service account will be needed to utilize this Mapbox mapping layer that is built into the application. Any API can be used to retrieving housing data, but the one configured by default by this project is Austin's AffordableHousingDataHub.

### Installation
1. npm install.
2. create an additional file in the public folder: `mapbox_public_key.js`. This file should include a variable called `mapbox_public_key`, which should be set to the public key (string) that you get from mapbox. A public key from mapbox is required in order to access the mapping layer utlized by this application. The file `mapbox_public_key.js` is ignored by git by default. See here for more information about requesting an access token: https://www.mapbox.com/account/access-tokens/.
3. create an additional file in the public folder: `data_hub_api_endpoint.js`. This file should include a variable called `data_hub_api_endpoint`, which should be set to the api endpoint (url, string) from which the affordable housing endpoint should be pulled. This data endpoint was originally an instance hosted by CTM, Austin's City IT, but to get an updated endpoint location, you should contact Josh Rudow at the City of Austin's Neighborhood Housing and Community Development. The file `data_hub_api_endpoint.js` is ignored by git by default.
4. to run the application in development mode, simply run node server.js dev. to run in production, run node server.js. NOTE: on production, we have historically used the npm package called pm2 as a process manager. But you should be able to use any process manager you wish



https://medium.freecodecamp.org/how-to-continuously-deploy-a-static-website-in-style-using-github-and-aws-3df7ecb58d9c

https://medium.freecodecamp.org/how-to-host-a-website-on-s3-without-getting-lost-in-the-sea-e2b82aa6cd38

