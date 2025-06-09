// ** MUI Imports
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

const TableHeader = props => {
  // ** Props
  const { value, handleSearch } = props

  return (
    <Grid container spacing={10}>
      <Grid item xs={12} sm={4}>
        <TextField
          size='small'
          value={value}
          placeholder='Search Organization'
          sx={{ ml: 5, mt: 5, mb: 5, width: '100%' }}
          onChange={e => handleSearch(e.target.value)}
        />
      </Grid>
    </Grid>
  )
}

export default TableHeader
