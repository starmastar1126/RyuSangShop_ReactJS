// ** MUI Imports
import Box from '@mui/material/Box'

// ** Components
import UserDropdown from 'src/layouts/components/UserDropdown'
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import LanguageDropdown from 'src/@core/layouts/components/shared-components/LanguageDropdown'

const AppBarContent = props => {
  // ** Props
  const { settings, saveSettings } = props

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LanguageDropdown settings={settings} saveSettings={saveSettings} />
      <ModeToggler settings={settings} saveSettings={saveSettings} />
      <UserDropdown settings={settings} />
    </Box>
  )
}

export default AppBarContent
