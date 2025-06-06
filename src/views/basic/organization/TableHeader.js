// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const TableHeader = props => {
  // ** Props
  const { value, handleSearch } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search Organization'
          sx={{ mr: 4, mb: 2, maxWidth: '500px' }}
          onChange={e => handleSearch(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default TableHeader
