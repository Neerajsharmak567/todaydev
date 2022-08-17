// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// Styled component for the upload image inside the dropzone area

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderMultiple = () => {
  // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file)))
    }
  })

  const renderFilePreview = file => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <FileDocumentOutline />
    }
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Close fontSize='small' />
      </IconButton>
    </ListItem>
  ))

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  return (
    <Fragment>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
            <Typography color='textSecondary' align='center'>
              {' '}
              <CloudUploadIcon sx={{ fontSize: { xs: '40px', sm: '50px', md: '50px' } }} color='primary' />
              <br />
              <Typography
                sx={{
                  fontWeight: 600
                }}
              >
                Drop your attachments here or{' '}
                <Link href='/' onClick={handleLinkClick}>
                  browse
                </Link>{' '}
                through your machine.
              </Typography>
            </Typography>
          </Box>
        </Box>
      </div>
      {files.length ? (
        <Fragment>
          <List>{fileList}</List>
          <div className='buttons'>
            <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
              Remove All
            </Button>
            <Button variant='contained'>Upload Files</Button>
          </div>
        </Fragment>
      ) : null}
    </Fragment>
  )
}

export default FileUploaderMultiple
