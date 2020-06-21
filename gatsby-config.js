const path = require('path')

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: path.resolve(__dirname, 'data')
      }
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        typeName: ({ object }) => object.__typename
      }
    }
  ]
}
