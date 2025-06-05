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
          path: '/basic/organization'
        },
        {
          icon: AccountGroupOutline,
          title: 'Client',
          path: '/basic/client'
        },
        {
          icon: Shape,
          title: 'Category',
          path: '/basic/category'
        },
        {
          icon: Apps,
          title: 'Product',
          path: '/basic/product'
        },
        {
          icon: Store,
          title: 'Spot',
          path: '/basic/spot'
        }
      ]
    }
  ]
}

export default navigation
