import React from 'react'
import Typography from '@mui/material/Typography'

const NotFoundPage = () => {
  return (
    <div style={{minHeight:400,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <Typography textAlign="center" variant='h3' color='error'>404- Page is not Found</Typography>
        <Typography textAlign="center" variant='body1'>Please Give Correct URL</Typography>
         
    </div>
  )
}

export default NotFoundPage