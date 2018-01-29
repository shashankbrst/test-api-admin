/**
 * Created by udit on 10/27/17.
 */

import _ from 'lodash'
import moment from 'moment'

const collectionExists = (collectionName, collections) => {
  return _.includes(_.map(collections, collection => collection.name), collectionName)
}

const getCollectionColumns = (collectionName, collections) => {
  let columns = [{ title: 'ID', data: 'id' }]

  const actionColumn = {
    title: '',
    data: 'id',
    searchable: false,
    orderable: false,
    render(data, type, row) {
      const editBtn = `<a class="btn btn-xs btn-warning" href="/collection/${collectionName}/${data}/">
        <i class="fa fa-pencil-square-o"></i>
      </a>`
      const deleteBtn = !(collectionName == 'users' && row.is_super_admin)
        ? `<a class="btn btn-xs btn-danger js-om-api-delete-obj" data-collection-name="${collectionName}" data-obj-id="${data}" href="#">
          <i class="fa fa-times"></i>
        </a>`
        : ''
      return editBtn + '\n' + deleteBtn
    },
  }

  if (collectionExists(collectionName, collections)) {
    switch (collectionName) {
      case 'audiences':
        columns = [
          {
            title: 'Name',
            data: 'name',
          },
          {
            title: 'Description',
            data: 'description',
          },
          {
            title: 'Labels',
            data: 'labels',
            render(data) {
              const labels = _.map(data, label => `<span class="label label-default">${label}</span>`)
              return _.join(labels, ', ')
            },
          },
          {
            title: 'Owner',
            data: 'owner',
            searchable: false,
            render(owner) {
              if (owner) {
                if (owner.id) {
                  return `<a target="_blank" href="/collection/user/${owner.id}">${owner.display_name}</a>`
                } else {
                  return owner
                }
              }
              return '-'
            },
          },
          actionColumn,
        ]
        break
      case 'conversations':
        columns = [
          {
            title: 'Name',
            data: 'name',
          },
          {
            title: 'Phone',
            data: 'phone',
          },
          {
            title: 'Owner',
            data: 'owner',
            render(data) {
              return `<a target="_blank" href="/collection/user/${data}">${data}</a>`
            },
          },
          {
            title: 'messages',
            data: 'messages',
            render(data) {
              const links = _.map(data, audience => `<a href="/collection/message/${audience}">${audience}</a>`)
              return _.join(links, ', ')
            },
          },
          {
            title: 'Audiences',
            data: 'audiences',
            render(data) {
              const links = _.map(data, audience => `<a href="/collection/audience/${audience}">${audience}</a>`)
              return _.join(links, ', ')
            },
          },
          {
            title: 'Is Scheduled?',
            data: 'scheduled',
            render(data) {
              return data ? '<i class="fa fa-check-square-o"></i>' : '<i class="fa fa-square-o"></i>'
            },
          },
          actionColumn,
        ]
        break
      case 'customer-infos':
        columns = [
          {
            title: 'First Name',
            data: 'first_name',
          },
          {
            title: 'Last Name',
            data: 'last_name',
          },
          {
            title: 'Email',
            data: 'email',
            render(email) {
              return email ? email : '-'
            },
          },
          {
            title: 'Customer ID',
            data: 'customer',
            searchable: false,
            render(customer) {
              return `<a target="_blank" href="/collection/customer/${customer}">${customer}</a>`
            },
          },
          actionColumn,
        ]
        break
      case 'customers':
        columns = [
          {
            title: 'First Name',
            data: 'customerInfo',
            render(customerInfo) {
              if (customerInfo && _.isArray(customerInfo)) {
                const names = _.map(customerInfo, cInfo => {
                  if (cInfo) {
                    if (cInfo.id) {
                      return cInfo.first_name
                    } else {
                      return cInfo
                    }
                  }
                  return '-'
                })
                return _.join(names, ', ')
              }
              return '-'
            },
          },
          {
            title: 'Last Name',
            data: 'customerInfo',
            render(customerInfo) {
              if (customerInfo && _.isArray(customerInfo)) {
                const names = _.map(customerInfo, cInfo => {
                  if (cInfo) {
                    if (cInfo.id) {
                      return cInfo.last_name
                    } else {
                      return cInfo
                    }
                  }
                  return '-'
                })
                return _.join(names, ', ')
              }
              return '-'
            },
          },
          {
            title: 'Email',
            data: 'customerInfo',
            render(customerInfo) {
              if (customerInfo && _.isArray(customerInfo)) {
                const emails = _.map(customerInfo, cInfo => {
                  if (cInfo) {
                    if (cInfo.id) {
                      return cInfo.email
                    } else {
                      return cInfo
                    }
                  }
                  return '-'
                })
                return _.join(emails, ', ')
              }
              return '-'
            },
          },
          {
            title: 'Phone',
            data: 'phone',
          },
          {
            title: 'Is Mobile?',
            data: 'mobile',
            render(data) {
              return data ? '<i class="fa fa-check-square-o"></i>' : '<i class="fa fa-square-o"></i>'
            },
          },
          {
            title: 'Audiences',
            data: 'audiences',
            render(data) {
              const links = _.map(data, audience => {
                if (audience) {
                  if (audience.id) {
                    return `<a href="/collection/audience/${audience.id}">${audience.name}</a>`
                  } else {
                    return audience
                  }
                } else {
                  return '-'
                }
              })
              return _.join(links, ', ')
            },
          },
          actionColumn,
        ]
        break
      case 'messages':
        columns = [
          {
            title: 'Campaign',
            data: 'campaign',
            render(data) {
              return `<a target="_blank" href="/collection/campaign/${data}">${data}</a>`
            },
          },
          {
            title: 'Starts the Campaign',
            data: 'start',
            render(data) {
              return data ? '<i class="fa fa-check-square-o"></i>' : '<i class="fa fa-square-o"></i>'
            },
          },
          {
            title: 'Text',
            data: 'text',
          },
          {
            title: 'No. of times Sent',
            data: 'sent',
          },
          actionColumn,
        ]
        break
      case 'oauth-access-tokens':
        columns = [
          {
            title: 'Access Token',
            data: 'access_token',
          },
          {
            title: 'Expires At',
            data: 'access_token_expires_at',
            searchable: false,
            render(data) {
              return moment(data).format()
            },
          },
          {
            title: 'Scope',
            data: 'scope',
          },
          {
            title: 'OAuth Client',
            data: 'oauth_client',
            searchable: false,
            render(client) {
              if (client) {
                if (client.id) {
                  return `<a target="_blank" href="/collection/oauth-clients/${client.id}">${client.name}</a>`
                } else {
                  return client
                }
              }
              return '-'
            },
          },
          {
            title: 'User',
            data: 'user',
            searchable: false,
            render(user) {
              if (user) {
                if (user.id) {
                  return `<a target="_blank" href="/collection/users/${user.id}">${user.display_name}</a>`
                } else {
                  return user
                }
              }
              return '-'
            },
          },
          actionColumn,
        ]
        break
      case 'oauth-authorization-codes':
        columns = [
          {
            title: 'Code',
            data: 'code',
          },
          {
            title: 'Expires At',
            data: 'authorization_code_expires_at',
            render(data) {
              return moment(data).format()
            },
          },
          {
            title: 'Redirect URI',
            data: 'redirect_uri',
            render(data) {
              if (data) {
                return data
              }
              return '-'
            },
          },
          {
            title: 'Scope',
            data: 'scope',
          },
          {
            title: 'OAuth Client',
            data: 'oauth_client',
            searchable: false,
            render(client) {
              if (client) {
                if (client.id) {
                  return `<a target="_blank" href="/collection/oauth-clients/${client.id}">${client.name}</a>`
                } else {
                  return client
                }
              }
              return '-'
            },
          },
          {
            title: 'User',
            data: 'user',
            searchable: false,
            render(user) {
              if (user) {
                if (user.id) {
                  return `<a target="_blank" href="/collection/users/${user.id}">${user.display_name}</a>`
                } else {
                  return user
                }
              }
              return '-'
            },
          },
          actionColumn,
        ]
        break
      case 'oauth-clients':
        columns = [
          {
            title: 'Name',
            data: 'name',
          },
          {
            title: 'Redirect URIs',
            data: 'redirect_uris',
            width: '90px',
          },
          {
            title: 'Grants',
            data: 'grants',
            render(data) {
              return _.join(_.map(data.split(','), grant => _.startCase(grant)), ', ')
            },
            width: '90px',
          },
          {
            title: 'Scope',
            data: 'scope',
          },
          {
            title: 'User',
            data: 'user',
            searchable: false,
            render(user) {
              if (user) {
                if (user.id) {
                  return `<a target="_blank" href="/collection/users/${user.id}">${user.display_name}</a>`
                } else {
                  return user
                }
              }
              return '-'
            },
          },
          actionColumn,
        ]
        break
      case 'oauth-refresh-tokens':
        columns = [
          {
            title: 'Refresh Token',
            data: 'refresh_token',
          },
          {
            title: 'Expires At',
            data: 'refresh_token_expires_at',
            render(data) {
              return moment(data).format()
            },
          },
          {
            title: 'Scope',
            data: 'scope',
          },
          {
            title: 'OAuth Client',
            data: 'oauth_client',
            searchable: false,
            render(client) {
              if (client) {
                if (client.id) {
                  return `<a target="_blank" href="/collection/oauth-clients/${client.id}">${client.name}</a>`
                } else {
                  return client
                }
              }
              return '-'
            },
          },
          {
            title: 'User',
            data: 'user',
            searchable: false,
            render(user) {
              if (user) {
                if (user.id) {
                  return `<a target="_blank" href="/collection/users/${user.id}">${user.display_name}</a>`
                } else {
                  return user
                }
              }
              return '-'
            },
          },
          actionColumn,
        ]
        break
      case 'oauth-scopes':
        columns = [
          {
            title: 'Scope',
            data: 'scope',
          },
          {
            title: 'Is Default?',
            data: 'is_default',
            render(data) {
              return data ? '<i class="fa fa-check-square-o"></i>' : '<i class="fa fa-square-o"></i>'
            },
          },
          actionColumn,
        ]
        break
      case 'organizations':
        columns = [
          {
            title: 'Name',
            data: 'name',
          },
          {
            title: 'Type',
            data: 'type',
          },
          {
            title: 'Phone',
            data: 'phone_number',
          },
          {
            title: 'Email',
            data: 'email_address',
          },
          actionColumn,
        ]
        break
      case 'responses':
        columns = [
          {
            title: 'Campaign',
            data: 'campaign',
            render(data) {
              return `<a target="_blank" href="/collection/conversations/${data}">${data}</a>`
            },
          },
          {
            title: 'Message Responded To',
            data: 'responded_to.message',
            render(data) {
              return `<a target="_blank" href="/collection/messages/${data}">${data}</a>`
            },
          },
          {
            title: 'From',
            data: 'from',
            render(data) {
              return `<a target="_blank" href="/collection/users/${data}">${data}</a>`
            },
          },
          {
            title: 'Body',
            data: 'body',
          },
          actionColumn,
        ]
        break
      case 'templates':
        columns = [
          {
            title: 'Name',
            data: 'name',
          },
          {
            title: 'Category',
            data: 'category',
          },
          {
            title: 'Type',
            data: 'type',
          },
          actionColumn,
        ]
        break
      case 'users':
        columns = [
          {
            title: 'Username',
            data: 'username',
          },
          {
            title: 'Email',
            data: 'email_address',
          },
          {
            title: 'is Super Admin?',
            data: 'is_super_admin',
            render(data) {
              return data ? '<i class="fa fa-check-square-o"></i>' : '<i class="fa fa-square-o"></i>'
            },
          },
          {
            title: 'Organization',
            data: 'organization',
            searchable: false,
            render(organization) {
              if (organization) {
                if (organization.id) {
                  return `<a target="_blank" href="/collection/organizations/${organization.id}">${
                    organization.name
                  }</a>`
                } else {
                  return organization
                }
              }
              return '-'
            },
          },
          actionColumn,
        ]
        break
    }
  }

  return columns
}

export default {
  collectionExists,
  getCollectionColumns,
}
