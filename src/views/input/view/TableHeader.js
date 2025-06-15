// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const TableHeader = props => {
  // ** Props
  const { handleBack } = props

  return (
    <Box
      sx={{
        p: 5,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
        <Button sx={{ mt: 5 }} variant='contained' onClick={handleBack}>
          Back
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
