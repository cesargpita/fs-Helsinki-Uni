const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  return blogs.map(_ => _.likes).reduce((a, b) => a + b, 0)
}

const favouriteBlog = (blogs) => blogs.reduce((a, b) => a?.likes > b?.likes ? a : b, null)

module.exports = { dummy, totalLikes, favouriteBlog }