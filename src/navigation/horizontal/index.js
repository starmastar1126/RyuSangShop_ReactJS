// ** Icon imports
import Database from 'mdi-material-ui/Database'
import LeafCircle from 'mdi-material-ui/LeafCircle'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import Shape from 'mdi-material-ui/Shape'
import Apps from 'mdi-material-ui/Apps'
import Store from 'mdi-material-ui/Store'

const navigation = () => {
  return [
    {
      icon: Database,
      title: 'Basic Data',
      children: [
        {
          icon: LeafCircle,
          title: 'Organization',
          path: '/basic-data/organization'
        },
        {
          icon: AccountGroupOutline,
          title: 'Client',
          path: '/basic-data/client'
        },
        {
          icon: Shape,
          title: 'Category',
          path: '/basic-data/category'
        },
        {
          icon: Apps,
          title: 'Product',
          path: '/basic-data/product'
        },
        {
          icon: Store,
          title: 'Spot',
          path: '/basic-data/spot'
        }
      ]
    }
  ]
}

export default navigation
