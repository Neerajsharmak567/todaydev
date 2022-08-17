// ** React Import
import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports

import TableListing from './components/TableListing'
import MonthlyGraph from './components/ProjectOverviewGraph'
import ProjectOverview from './components/ProjectOverview'

// ** graph imports
import ProjectPieChart from './components/ProjectPieChart'

const CrmDashboard = () => {
  return (
    <React.Fragment>
      <ApexChartWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={12}>
            <ProjectOverview />
          </Grid>
          <Grid item xs={12} md={4}>
            <ProjectPieChart />
          </Grid>
          <Grid item xs={12} md={8}>
            <MonthlyGraph />
          </Grid>
          <Grid item xs={12} md={12}>
            <TableListing />
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </React.Fragment>
  )
}

export default CrmDashboard
