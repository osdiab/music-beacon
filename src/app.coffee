# libs
director = require 'director'

# pages
splash  = require './pages/splash.coffee'
room    = require './pages/room.coffee'

ensureURL = () ->
  hash_delim = '#/'
  hash_missing = String(window.location).indexOf(hash_delim) == -1
  window.location += hash_delim if hash_missing

runApp = () ->
  router = new director.Router({
    '/': splash,
    '/:roomName': room
  })
  router.init()
  ensureURL()

module.exports =
  run: runApp
