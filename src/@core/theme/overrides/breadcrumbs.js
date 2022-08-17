export default {
  MuiBreadcrumbs: {
    styleOverrides: {
      li: {
        '& > a': {
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '0.875rem'
        },
        '& > a:hover': {
          textDecoration: 'underline'
        }
      }
    }
  }
}
