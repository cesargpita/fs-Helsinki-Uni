const dummy = (blogs) => {
  return 1
}

const totalLikes = blogs => {
  return blogs.map(_ => _.likes).reduce((a, b) => a + b, 0)
}

const favouriteBlog = (blogs) => blogs.map(blog => ({ title: blog.title, author: blog.author, likes: blog.likes }))
  .reduce((a, b) => a?.likes > b?.likes ? a : b, { title: null, author: null, likes: null })

const mostBlogs = (blogs) => {
  const results = [];
  blogs.map(_ => _.author).forEach(author => {
    const index = results.findIndex(_ => _.author === author)
    if (index !== -1) {
      results[index].blogs++;
    } else {
      results.push({ author, blogs: 1 });
    }
  })
  return results.reduce((a, b) => a?.blogs > b?.blogs ? a : b, null)
}

const mostLikes = (blogs) => {
  const results = [];
  blogs.map(_ => ({ author: _.author, likes: _.likes })).forEach(_ => {
    const index = results.findIndex(res => res.author === _.author)
    if (index !== -1) {
      results[index].likes = results[index].likes + _.likes;
    } else {
      results.push(_);
    }
  })
  return results.reduce((a, b) => a?.likes > b?.likes ? a : b, null)
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }