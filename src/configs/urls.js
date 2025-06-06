const BASEURL = 'http://172.20.1.5:3902';

export default {
    access: 'accessToken',
    signin: `${BASEURL}/auth/signin`,
    signup: `${BASEURL}/auth/signup`,
    signed: `${BASEURL}/auth/me`
}
