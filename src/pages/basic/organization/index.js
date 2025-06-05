// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { fetchData, deleteOrganization } from 'src/store/basic/organization'

// ** Custom Components Imports
import TableHeader from 'src/components/TableHeader'
import AddOrganizationDrawer from 'src/pages/basic/organization/AddOrganizationDrawer'

import { useTranslation } from 'react-i18next'
import Translations from 'src/layouts/components/Translations'

const RowOptions = ({ id }) => {
  // ** Hooks
  const dispatch = useDispatch()
  const { t } = useTranslation()

  // ** State
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteOrganization(id))
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleRowOptionsClose}>
          <PencilOutline fontSize='small' sx={{ mr: 2 }} />
          {t('Edit')}
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          {t('Delete')}
        </MenuItem>
      </Menu>
    </>
  )
}

const columns = [
  {
    flex: 0.95,
    field: 'organization',
    sortable: true,
    headerName: <Translations text='Organization Name' />,
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.organizationName}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 10,
    sortable: false,
    field: 'actions',
    headerName: '',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const Organizations = () => {
  // ** State
  const [role, setRole] = useState('')
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [addOrganizationOpen, setAddOrganizationOpen] = useState(false)

  // ** Hooks
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const store = useSelector(state => state.organization)
  useEffect(() => {
    dispatch(
      fetchData({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const toggleAddOrganizationDrawer = () => setAddOrganizationOpen(!addOrganizationOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableHeader
            title={t('Organization')}
            placeholder={t('Search Organization')}
            button={t('Add Organization')}
            value={value}
            handleFilter={handleFilter}
            toggle={toggleAddOrganizationDrawer}
          />
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            // checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <AddOrganizationDrawer open={addOrganizationOpen} toggle={toggleAddOrganizationDrawer} />
    </Grid>
  )
}

export default Organizations
