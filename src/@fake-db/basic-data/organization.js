// ** Mock
import mock from 'src/@fake-db/mock'

const data = {
  organizations: [
    {
      id: 1,
      organizationName: 'Galen Slixby',
    },
    {
      id: 2,
      organizationName: 'Halsey Redmore',
    },
    {
      id: 3,
      organizationName: 'Marjory Sicely',
    },
    {
      id: 4,
      organizationName: 'Cyrill Risby',
    },
    {
      id: 5,
      organizationName: 'Maggy Hurran',
    },
    {
      id: 6,
      organizationName: 'Silvain Halstead',
    },
    {
      id: 7,
      organizationName: 'Breena Gallemore',
    },
    {
      id: 8,
      organizationName: 'Kathryne Liger',
    },
    {
      id: 9,
      organizationName: 'Franz Scotfurth',
    },
    {
      id: 10,
      organizationName: 'Jillene Bellany',
    },
    {
      id: 11,
      organizationName: 'Jonah Wharlton',
    },
    {
      id: 12,
      organizationName: 'Seth Hallam',
    },
    {
      id: 13,
      organizationName: 'Yoko Pottie',
    },
    {
      id: 14,
      organizationName: 'Maximilianus Krause',
    },
    {
      id: 15,
      organizationName: 'Zsazsa McCleverty',
    },
    {
      id: 16,
      organizationName: 'Bentlee Emblin',
    },
    {
      id: 17,
      organizationName: 'Brockie Myles',
    },
    {
      id: 18,
      organizationName: 'Bertha Biner',
    },
    {
      id: 19,
      organizationName: 'Travus Bruntjen',
    },
    {
      id: 20,
      organizationName: 'Wesley Burland',
    },
    {
      id: 21,
      organizationName: 'Selina Kyle',
    },
    {
      id: 22,
      organizationName: 'Jameson Lyster',
    }
  ]
}

// POST: Add new organization
mock.onPost('/basic-data/organization/add').reply(config => {
  // Get event from post data
  const organization = JSON.parse(config.data).data
  const { length } = data.organizations
  let lastIndex = 0
  if (length) {
    lastIndex = data.organizations[length - 1].id
  }
  organization.id = lastIndex + 1
  data.organizations.unshift({ ...organization })

  return [201, { organization }]
})

// GET: Updated DATA
mock.onGet('/basic-data/organization/list').reply(config => {
  const { q = '' } = config.params ?? ''
  const queryLowered = q.toLowerCase()

  const filteredData = data.organizations.filter(
    organization => organization.organizationName.toLowerCase().includes(queryLowered)
  )

  return [
    200,
    {
      allData: data.organizations,
      organizations: filteredData,
      params: config.params,
      total: filteredData.length
    }
  ]
})

// GET: particular organization data
mock.onGet('/basic-data/organization').reply(config => {
  const { id } = config.params
  const organizationData = data.organizations.filter(organization => organization.id === parseInt(id, 10))
  if (organizationData.length) {
    return [200, organizationData[0]]
  } else {
    return [404, { message: 'Unable to find the requested organization!' }]
  }
})

// DELETE: Deletes organization
mock.onDelete('/basic-data/organization/delete').reply(config => {
  // Get organization id from URL
  const organizationId = config.data
  const organizationIndex = data.organizations.findIndex(t => t.id === organizationId)
  data.organizations.splice(organizationIndex, 1)

  return [200]
})
