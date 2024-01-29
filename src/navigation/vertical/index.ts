// ** Icon imports
import VideoIcon from 'mdi-material-ui/Video'
import TelevisionIcon from 'mdi-material-ui/Television'
import ProfileIcon from '@mui/icons-material/Person2'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ReceiptIcon from '@mui/icons-material/Receipt'

// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'
import { useContext } from 'react'
import { AbilityContext } from 'src/layouts/components/acl/Can'

const navigation = (): VerticalNavItemsType => {
  const ability = useContext(AbilityContext)

  return [
    {
      title: 'Customer Registration',
      icon: ProfileIcon,
      path: '/customer-registration',
      action: 'itsHaveAccess',
      subject: 'customer-registration-page'
    },
    {
      title: 'Invoices',
      icon: ReceiptIcon,
      path: '/invoices',
      action: 'itsHaveAccess',
      subject: 'invoices-page'
    },
    {
      title: 'Profile',
      icon: ManageAccountsIcon,
      path: '/settings/profile',
      action: 'itsHaveAccess',
      subject: 'settings-profile-page'
    }

    //Page with children Example
    // {
    //   title: 'Page With Children',
    //   icon: AccessibilityIcon,
    //   action: 'itsHaveAccess',
    //   subject: 'teachers-page',
    //   children: [
    //     {
    //       title: 'Children 1',
    //       icon: AccessibilityIcon,
    //       path: '/child1',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     },
    //     {
    //       title: 'Children 2',
    //       icon: AccessibilityIcon,
    //       path: '/child2',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     },
    //     {
    //       title: 'Children 3',
    //       icon: AccessibilityIcon,
    //       path: '/child3',
    //       action: 'itsHaveAccess',
    //       subject: 'teachers-page'
    //     }
    //   ]
    // }
  ]
}

export default navigation
