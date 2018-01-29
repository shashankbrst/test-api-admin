/**
 * Created by udit on 10/24/17.
 */

import _ from 'lodash'
import fs from 'fs'
import Collections from '../collections'
import path from 'path'

const getCollections = () => {
  const collections = []
  const collectionObjectNames = _.keys(Collections.collections)
  /*
   * This is came from old API repo.
   * But we may exclude few collections in future. So keep it.
   */
  const excludeObjectNames = []

  _.each(collectionObjectNames, collectionObjectName => {
    if (!_.includes(excludeObjectNames, collectionObjectName)) {
      collections.push({
        name: Collections.getCollectionName(collectionObjectName),
        label: _.startCase(collectionObjectName),
        href: '/collection/' + Collections.getCollectionName(collectionObjectName),
      })
    }
  })

  return collections
}

const collectionExists = collectionName => {
  const collections = getCollections()
  return _.includes(_.map(collections, collection => collection.name), collectionName)
}

export default {
  getCollections,
  collectionExists,
}
