export const toURL = ({ url, id, query }) => {
    let newURL = `${url}${id ? `/${id}` : ''}${query && Object.keys(query).length ? '?' : ''}`
    const queryParams = []

    if (query) {
        for (const key of Object.keys(query)) {
            const value = query[key]
            if (value != null) {
                if (Array.isArray(value)) {
                    value.forEach(item => queryParams.push(`${key}=${item}`))
                } else {
                    queryParams.push(`${key}=${value}`)
                }
            }
        }
    }

    newURL += queryParams.join('&')
    return newURL
}

export default {
    toURL
}