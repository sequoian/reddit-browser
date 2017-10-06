const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
const axios = require('axios')
const secret = require('./secret')

// Priority serve any static files.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../react/build')));
}

const global_access_token = getAccessToken()

// test route
app.get('/search', (req, res) => {
  const subreddit = req.query.sub || null
  const startTime = req.query.start || null
  const endTime = req.query.end || null

  if (!subreddit || !startTime || !endTime) {
    res.status(400).end()
  }

  const url = `https://oauth.reddit.com/r/${subreddit}/search.json?q=timestamp:${startTime}..${endTime}&sort=top&restrict_sr=1&syntax=cloudsearch`
  
  
  axios({
    method: 'get',
    url: url, 
    headers: {
      'Authorization': `bearer ${global_access_token}`
    }
  })
    .then(response => {
      console.log(response)
      res.status(200).json(response.data)
    })
    .catch(error => {
      console.log(error)
      res.status(500).end()
    })
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react/build', 'index.html'));
});

// Listen for incoming requests
app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

function getAccessToken() {
  return axios({
    method: 'post',
    url: 'https://www.reddit.com/api/v1/access_token',
    data: 'grant_type=client_credentials',
    auth: {
      username: secret.id,
      password: secret.password
    }
  })
    .then(response => {
      return response.data.access_token
    })
    .catch(error => {
      console.log('Failed to retrieve access token')
      return null
    })
}
