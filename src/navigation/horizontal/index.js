// ** Icon imports
import DatabaseSettings from 'mdi-material-ui/DatabaseSettings'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import AccountSupervisor from 'mdi-material-ui/AccountSupervisor'
import Shape from 'mdi-material-ui/Shape'
import BagChecked from 'mdi-material-ui/BagChecked'
import StoreSettings from 'mdi-material-ui/StoreSettings'
import Unicode from 'mdi-material-ui/Unicode'


const navigation = () => [
  {
    title: 'Basic Data',
    icon: DatabaseSettings,
    children: [
      {
        icon: AccountGroup,
        title: 'Organization',
        path: '/basic/organization'
      },
      {
        icon: AccountSupervisor,
        title: 'Client',
        path: '/basic/client'
      },
      {
        icon: Shape,
        title: 'Category',
        path: '/basic/category'
      },
      {
        icon: BagChecked,
        title: 'Product',
        path: '/basic/product'
      },
      {
        icon: StoreSettings,
        title: 'Shop',
        path: '/basic/spot'
      },
      {
        icon: Unicode,
        title: 'Unit',
        path: '/basic/unit'
      }
    ]
  }
]

export default navigation
