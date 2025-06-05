import mock from './mock'
import './auth/jwt'
import './basic-data/organization'

mock.onAny().passThrough()
