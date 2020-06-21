module.exports = {
  createSchemaCustomization: ({ actions, schema }) => {
    actions.createTypes([
      schema.buildObjectType({
        name: 'Kid',
        fields: {
          firstName: 'String!',
          lastName: {
            type: 'String!',
            resolve: (source, args, context, info) => {
              const parent = { lastName: '???' }
              return source.lastName || parent.lastName
            }
          }
        },
        interfaces: ['Node'],
        extensions: { infer: false }
      }),
      schema.buildObjectType({
        name: 'Parent',
        fields: {
          firstName: 'String!',
          lastName: 'String!',
          kids: '[Kid!]!'
        },
        interfaces: ['Node'],
        extensions: { infer: false }
      })
    ])
  }
}
