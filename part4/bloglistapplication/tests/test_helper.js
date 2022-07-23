const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const getToken = async () => {
  const usersAtStart = await helper.usersInDb()

}

module.exports = {
  usersInDb
}