// Authentication  - SignIn register

import { useState, useEffect } from 'react'
import { signInWithGoogle } from '~/redux/authSlice'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useDispatch } from 'react-redux'
import LeftBG from '~/assets/left-bg.svg'
import RightBG from '~/assets/right-bg.svg'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import LogoAlassion from '~/assets/logo-alassian.svg'
import { Grid } from '@mui/material'
import { path } from '~/utils/constants'
import { testLoginGG } from '~/apis'
function CreateUserGoogle() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (!user) {
      const fetchData = async () => {
        try {
          const res = await testLoginGG()
          setUser(res.metadata.user)
        } catch (error) {
          // console.error('Error fetching data:', error)
        }
      }
      fetchData()
    }
  })
  // console.log(user);
  const dispatch = useDispatch()
  const handleDispatch = () => {
    dispatch(signInWithGoogle())
  }

  // log out function to log the user out of google and set the profile array to null
  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#fafbfc',
        height: '100vh',
        position: 'relative',
        top: '0'
      }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 } }}>
        <img
          src={LeftBG}
          alt=""
          style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '27%'
          }}
        />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex', gap: 1 } }}>
        <img
          src={RightBG}
          alt=""
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '27%'
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '400px',
          margin: 'auto'
        }}
      >
        <Box
          component=""
          noValidate
          sx={theme => ({
            //  bgcolor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 10,
            p: 6,
            boxShadow: theme.shadowCustom.md
          })}
        >
          <Box sx={{ display: 'flex' }}>
            <SvgIcon
              component={TrelloIcon}
              fontSize="large"
              inheritViewBox
              sx={{ color: '#0052cc' }}
            />

            <Typography component="h1" variant="h5" sx={{ fontWeight: '800' }}>
              Trello
            </Typography>
          </Box>
          <Typography sx={{ fontWeight: '500', p: 2 }}>
            Creat your account
          </Typography>
          <Box sx={{ width: '100%' }}>
            {user ? (
              <Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: '#6b778c', fontSize: '12px' }}
                  >
                    Email address
                  </Typography>
                  <Typography variant="subtitle2">{user.email}</Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: '#6b778c', fontSize: '12px' }}
                  >
                    Name
                  </Typography>
                  <Typography variant="subtitle2">{user.name}</Typography>
                </Box>
              </Box>
            ) : null}
          </Box>
          <Typography
            align="left"
            variant="body2"
            sx={{ textAlign: 'center', fontSize: '11px', marginTop: '8px' }}
          >
            This site is protected by reCAPTCHA and the Google{' '}
            <Link href="#" sx={{ textDecoration: 'none' }}>
              Privacy Policy
            </Link>
            and{' '}
            <Link href="#" sx={{ textDecoration: 'none' }}>
              Term of Service
            </Link>{' '}
            apply.
          </Typography>
          <Button
            onClick={handleDispatch}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#0052cc' }}
          >
            Create your account
          </Button>
          <Grid container justifyContent="center" sx={{ marginBottom: '8px' }}>
            <Grid item>
              <Link
                href={path.SignIn}
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              borderTop: '1px solid #c1c7d0',
              width: '100%'
            }}
          >
            <img
              src={LogoAlassion}
              style={{ marginTop: '30px', width: '160px' }}
            />
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', fontSize: '11px', paddingTop: '8px' }}
            >
              One account for Trello, Jira, Confluence and{' '}
              <Link href="#" sx={{ textDecoration: 'none' }}>
                more
              </Link>
              .
            </Typography>
            <Box sx={{ marginTop: '12px', display: 'flex' }}>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', fontSize: '11px' }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', fontSize: '11px', padding: '0 5px' }}
              >
                •
              </Typography>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', fontSize: '11px' }}
              >
                User Notice
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', fontSize: '11px', marginTop: '8px' }}
            >
              This site is protected by reCAPTCHA and the Google{' '}
              <Link href="#" sx={{ textDecoration: 'none' }}>
                Privacy Policy
              </Link>
              and{' '}
              <Link href="#" sx={{ textDecoration: 'none' }}>
                Term of Service
              </Link>{' '}
              apply.
            </Typography>
          </Box>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
    </Box>
  )
}

export default CreateUserGoogle
