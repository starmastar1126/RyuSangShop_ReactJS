// ** JWT import
import jwt from 'jsonwebtoken'

// ** Mock Adapter
import mock from 'src/@fake-db/mock'

const users = [
  {
    id: 1,
    role: 'admin',
    password: 'Silas@1126!',
    fullname: 'Silas Jones',
    username: 'starmastar1126'
  },
  {
    id: 2,
    role: 'admin',
    password: '123456',
    fullname: 'Hwang UnJu',
    username: 'unju'
  },
  {
    id: 3,
    role: 'admin',
    password: '123456',
    fullname: 'Ryang HyoKyong',
    username: 'hyokyong'
  }
]

// ! These two secrets should be in .env file and not in any other file
const jwtConfig = {
  secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
  refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767'
}
mock.onPost('/jwt/login').reply(request => {
  const { username, password } = JSON.parse(request.data)

  let error = {
    username: ['Something went wrong']
  }
  const user = users.find(u => u.username === username && u.password === password)
  if (user) {
    const accessToken = jwt.sign({ id: user.id }, jwtConfig.secret)

    const response = {
      accessToken
    }

    return [200, response]
  } else {
    error = {
      username: ['Username or Password is Invalid']
    }

    return [400, { error }]
  }
})
mock.onPost('/jwt/register').reply(request => {
  if (request.data.length > 0) {
    const { fullname, password, username } = JSON.parse(request.data)
    const isUsernameAlreadyInUse = users.find(user => user.username === username)

    const error = {
      username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
    }
    if (!error.username) {
      const { length } = users
      let lastIndex = 0
      if (length) {
        lastIndex = users[length - 1].id
      }

      const userData = {
        id: lastIndex + 1,
        password,
        username,
        avatar: null,
        fullname: '',
        role: 'admin'
      }
      users.push(userData)
      const accessToken = jwt.sign({ id: userData.id }, jwtConfig.secret)
      const user = { ...userData }
      delete user.password
      const response = { accessToken }

      return [200, response]
    }

    return [200, { error }]
  } else {
    return [401, { error: 'Invalid Data' }]
  }
})
mock.onGet('/auth/me').reply(config => {
  // @ts-ignore
  const token = config.headers.Authorization

  // get the decoded payload and header
  const decoded = jwt.decode(token, { complete: true })
  if (decoded) {
    // @ts-ignore
    const { id: userId } = decoded.payload
    const userData = JSON.parse(JSON.stringify(users.find(u => u.id === userId)))
    delete userData.password

    return [200, { userData }]
  } else {
    return [401, { error: { error: 'Invalid User' } }]
  }
})
