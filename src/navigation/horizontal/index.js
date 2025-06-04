// ** Icon imports
import Database from 'mdi-material-ui/Database'
import LeafCircle from 'mdi-material-ui/LeafCircle'
import AccountGroupOutline from 'mdi-material-ui/AccountGroupOutline'
import Shape from 'mdi-material-ui/Shape'
import Apps from 'mdi-material-ui/Apps'
import Store from 'mdi-material-ui/Store'

import Import from 'mdi-material-ui/Import'

import AccountOutline from 'mdi-material-ui/AccountOutline'
import ArchiveOutline from 'mdi-material-ui/ArchiveOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import PaletteSwatchOutline from 'mdi-material-ui/PaletteSwatchOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

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
    },
    {
      icon: Import,
      title: 'Input Data',
      children: [
        {
          title: 'User',
          icon: AccountOutline,
          path: '/apps/user/list'
        },
        {
          title: 'Invoice',
          icon: FileDocumentOutline,
          children: [
            {
              title: 'List',
              path: '/apps/invoice/list'
            },
            {
              title: 'Preview',
              path: '/apps/invoice/preview'
            },
            {
              title: 'Edit',
              path: '/apps/invoice/edit'
            },
            {
              title: 'Add',
              path: '/apps/invoice/add'
            }
          ]
        }
      ]
    },
    {
      icon: PaletteSwatchOutline,
      title: 'Sale',
      children: [
        {
          title: 'Typography',
          icon: FormatLetterCase,
          path: '/ui/typography'
        },
        {
          title: 'Icons',
          path: '/ui/icons',
          icon: GoogleCirclesExtended
        },
        {
          title: 'Cards',
          icon: CreditCardOutline,
          children: [
            {
              title: 'Basic',
              path: '/ui/cards/basic'
            },
            {
              title: 'Statistics',
              path: '/ui/cards/statistics'
            },
            {
              title: 'Advanced',
              path: '/ui/cards/advanced'
            },
            {
              title: 'Gamification',
              path: '/ui/cards/gamification'
            },
            {
              title: 'Actions',
              path: '/ui/cards/actions'
            },
            {
              title: 'Widgets',
              path: '/ui/cards/widgets'
            }
          ]
        },
        {
          title: 'Components',
          icon: ArchiveOutline,
          children: [
            {
              title: 'Accordion',
              path: '/components/accordion'
            },
            {
              title: 'Alerts',
              path: '/components/alerts'
            },
            {
              title: 'Avatars',
              path: '/components/avatars'
            },
            {
              title: 'Badges',
              path: '/components/badges'
            },
            {
              title: 'Buttons',
              path: '/components/buttons'
            },
            {
              title: 'Button Group',
              path: '/components/button-group'
            },
            {
              title: 'Chips',
              path: '/components/chips'
            },
            {
              title: 'Dialogs',
              path: '/components/dialogs'
            },
            {
              title: 'List',
              path: '/components/list'
            },
            {
              title: 'Menu',
              path: '/components/menu'
            },
            {
              title: 'Pagination',
              path: '/components/pagination'
            },
            {
              title: 'Ratings',
              path: '/components/ratings'
            },
            {
              title: 'Snackbar',
              path: '/components/snackbar'
            },
            {
              title: 'Swiper',
              path: '/components/swiper'
            },
            {
              title: 'Tabs',
              path: '/components/tabs'
            },
            {
              title: 'Timeline',
              path: '/components/timeline'
            },
            {
              title: 'Toasts',
              path: '/components/toast'
            },
            {
              title: 'Tree View',
              path: '/components/tree-view'
            },
            {
              title: 'More',
              path: '/components/more'
            },
          ]
        }
      ]
    }
  ]
}

export default navigation
