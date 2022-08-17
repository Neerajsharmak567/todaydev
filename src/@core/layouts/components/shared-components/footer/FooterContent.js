// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      px={{
        fontSize: '14px !important'
      }}
    >
      <Typography
        sx={{ mr: 2 }}
        px={{
          fontSize: '14px !important'
        }}
      >
        {`© ${new Date().getFullYear()} `}
        <Box component='span'>- All right reserved </Box>

        <Link target='_blank' href='/'>
          Utilitech.
        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target='_blank' href='https://themeforest.net/licenses/standard'>
            Legal terms
          </Link>
          <Link target='_blank' href='https://1.envato.market/pixinvent_portfolio'>
            Privacy policy
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
