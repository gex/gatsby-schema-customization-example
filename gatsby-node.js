module.exports = {
  onCreateNode: async ({
    actions: { createNode, createParentChildLink },
    createContentDigest,
    createNodeId,
    loadNodeContent,
    node
  }) => {
    if (node.internal.mediaType !== `application/json`) {
      return
    }

    const content = await loadNodeContent(node)
    let ancestor = JSON.parse(content)

    const ancestorNodeId = createNodeId(`${node.id}-ancestor`)
    const ancestorNode = {
      ...ancestor,
      id: ancestorNodeId,
      parent: node.id,
      internal: {
        type: 'Ancestor',
        contentDigest: createContentDigest(ancestor)
      }
    }

    descendantNodeIds = ancestor.descendants.map((descendant, i) => {
      const descendantNodeId = createNodeId(`${ancestorNodeId}-descendant-${i}`)
      const descendantNode = {
        ...descendant,
        id: descendantNodeId,
        parent: ancestorNodeId,
        internal: {
          type: 'Descendant',
          contentDigest: createContentDigest(descendant)
        },
        ancestor___NODE: ancestorNodeId
      }
      createNode(descendantNode)
      return descendantNodeId
    })

    ancestorNode.descendants___NODE = descendantNodeIds
    createNode(ancestorNode)

    createParentChildLink({
      parent: node,
      child: ancestorNode
    })
  },

  createSchemaCustomization: ({ actions, schema }) => {
    actions.createTypes([
      schema.buildObjectType({
        name: 'Descendant',
        fields: {
          firstName: 'String!',
          lastName: {
            type: 'String!',
            resolve: (source, args, context, info) => {
              const ancestor = context.nodeModel.getNodeById({
                id: source.parent
              })
              return source.lastName || ancestor.lastName
            }
          },
          ancestor: {
            type: 'Ancestor!',
            extensions: { link: { from: 'ancestor___NODE' } }
          }
        },
        interfaces: ['Node'],
        extensions: { infer: false }
      }),
      schema.buildObjectType({
        name: 'Ancestor',
        fields: {
          firstName: 'String!',
          lastName: 'String!',
          descendants: {
            type: '[Descendant!]!',
            extensions: { link: { from: 'descendants___NODE' } }
          }
        },
        interfaces: ['Node'],
        extensions: { infer: false }
      })
    ])
  }
}
