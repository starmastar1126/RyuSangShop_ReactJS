import mock from './mock'
import './auth/jwt'
import './basic/organization'

mock.onAny().passThrough()
