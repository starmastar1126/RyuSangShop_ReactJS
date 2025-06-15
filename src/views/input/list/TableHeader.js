// ** React Imports
import { forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

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
  const { fromDate, toDate, handleDates } = props

  const CustomInput = forwardRef((props, ref) => {
    const startDate = format(props.start, 'yyyy-MM-dd')
    const endDate = props.end !== null ? ` - ${format(props.end, 'yyyy-MM-dd')}` : null
    const value = `${startDate}${endDate !== null ? endDate : ''}`

    return <TextField
      inputRef={ref}
      label={props.label || ''}
      {...props}
      value={value}
      sx={{ width: '250px' }} />
  })

  return (
    <Box
      sx={{
        p: 5,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        <Link href='/input/add' passHref>
          <Button sx={{ mt: 5 }} variant='contained'>
            Add
          </Button>
        </Link>
      </Box>
    </Box>
  )
}

export default TableHeader
