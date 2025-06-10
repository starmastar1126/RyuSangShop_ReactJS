// ** React Imports
import { forwardRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const TableHeader = props => {
  // ** Props
  const { value, fromDate, toDate, handleDates, handleSearch } = props

  const CustomInput = forwardRef((props, ref) => {
    const startDate = format(props.start, 'yyyy-MM-dd')
    const endDate = props.end !== null ? ` - ${format(props.end, 'yyyy-MM-dd')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField
      inputRef={ref}
      label={props.label || ''}
      {...props}
      value={value}
      sx={{ width: '210px' }} />
  })

  return (
    <Box
      sx={{
        p: 5,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }} className='demo-space-x'>
        <Box>
          <DatePickerWrapper>
            <DatePicker
              selectsRange
              monthsShown={2}
              endDate={toDate}
              selected={fromDate}
              startDate={fromDate}
              shouldCloseOnSelect={false}
              id='search-dates'
              onChange={handleDates}
              customInput={<CustomInput
                size='small'
                label='Select Dates'
                end={toDate}
                start={fromDate}
              />}
            />
          </DatePickerWrapper>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          placeholder='Search Input'
          sx={{ ml: 5, mt: 4, width: '100%' }}
          onChange={e => handleSearch(e.target.value)}
        />
      </Box>
    </Box>
  )
}

export default TableHeader
