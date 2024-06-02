import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { path } from '~/utils/constants'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { authSignIn } from '~/redux/authSlice'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { styled } from '@mui/material/styles'
import { ReactComponent as Google } from '~/assets/google.svg'
import LeftBG from '~/assets/left-bg.svg'
import RightBG from '~/assets/right-bg.svg'
// import { Input } from '@mui/material';
import LogoAlassion from '~/assets/logo-alassian.svg'
const GoogleButton = styled(Button)({
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#bcc2ccf7'
})
export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const dispatch = useDispatch()

  const handleSignInWithGoogle = () => {
    window.open('http://localhost:8080/v1/auth/google', '_self')
  }
  const onSubmit = data => {
    console.log('🚀 ~ onSubmit ~ data:', data)
    dispatch(authSignIn(data))
  }

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
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={theme => ({
            //  bgcolor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
            p: 6,
            boxShadow: theme.shadows.md
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
            Sign In to Continue
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            size="small"
            {...register('email', {
              required: true,
              maxLength: 100,
              // eslint-disable-next-line no-useless-escape
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            })}
          />
          {errors?.email?.type === 'required' && (
            <Typography sx={{ color: 'red' }}>
              This field is required
            </Typography>
          )}
          {errors?.email?.type === 'maxLength' && (
            <Typography sx={{ color: 'red' }}>
              Email cannot exceed 100 characters
            </Typography>
          )}
          {errors?.email?.type === 'pattern' && (
            <Typography sx={{ color: 'red' }}>example@gmail.com</Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            size="small"
            {...register('password', {
              required: true,
              maxLength: 25,
              minLength: 6
              // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
            })}
          />
          {errors?.password?.type === 'required' && (
            <Typography sx={{ color: 'red' }}>
              This field is required
            </Typography>
          )}
          {errors?.password?.type === 'maxLength' && (
            <Typography sx={{ color: 'red' }}>
              Password cannot exceed 25 characters
            </Typography>
          )}
          {errors?.password?.type === 'minLength' && (
            <Typography sx={{ color: 'red' }}>
              Password must not be less than 6 characters
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#0052cc' }}
          >
            Sign In
          </Button>
          <Typography sx={{ color: 'grey' }}>Or continue with:</Typography>
          <GoogleButton
            fullWidth
            color="text"
            sx={{ mt: 2, mb: 2 }}
            onClick={handleSignInWithGoogle}
          >
            <SvgIcon
              component={Google}
              fontSize="medium"
              inheritViewBox
              sx={{ padding: '2px' }}
            />
            <Typography>Google</Typography>
          </GoogleButton>
          <Grid container sx={{ marginBottom: '16px' }}>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ textDecoration: 'none' }}>
                Can't sign in?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href={path.SignUp}
                variant="body2"
                sx={{ textDecoration: 'none' }}
              >
                {"Don't have an account? Sign Up"}
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
