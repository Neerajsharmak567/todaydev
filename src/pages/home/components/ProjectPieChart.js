// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Third Party Imports
import { Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'

const data = [
  { name: 'Completed', value: 15, color: '#27B148' },
  { name: 'In progress', value: 85, color: '#FDB528' }
]
const RADIAN = Math.PI / 180

const renderCustomizedLabel = props => {
  // ** Props
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill='#fff' textAnchor='middle' dominantBaseline='central'>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const ProjectPieChart = () => {
  return (
    <Card>
      <CardHeader
        title='May 2022 Report'
        titleTypographyProps={{ variant: 'h6' }}
        subheader='Project status for the month of May'
        subheaderTypographyProps={{ variant: 'body2', sx: { mt: 1 } }}
      />
      <CardContent>
        <Box sx={{ height: 350 }}>
          <ResponsiveContainer>
            <PieChart height={350} style={{ direction: 'ltr' }}>
              <Pie data={data} innerRadius={80} dataKey='value' label={renderCustomizedLabel} labelLine={false}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 4, justifyContent: 'center' }}>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: '#27B148' }} />
            <Typography>Completed</Typography>
          </Box>
          <Box sx={{ mr: 6, display: 'flex', alignItems: 'center' }}>
            <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: '#FDB528' }} />
            <Typography>In progress</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProjectPieChart
