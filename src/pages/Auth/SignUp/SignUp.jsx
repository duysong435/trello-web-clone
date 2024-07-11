import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { path } from '~/utils/constants'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { authSignUp } from '~/redux/authSlice'
import LeftBG from '~/assets/left-bg.svg'
import RightBG from '~/assets/right-bg.svg'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { styled } from '@mui/material/styles'
import { ReactComponent as Google } from '~/assets/google.svg'
import LogoAlassion from '~/assets/logo-alassian.svg'

const GoogleButton = styled(Button)({
  border: '1px solid',
  lineHeight: 1.5,
  borderColor: '#bcc2ccf7',
})

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    data.name = data.firstName + ' ' + data.lastName
    delete data.firstName
    delete data.lastName
    console.log('🚀 ~ onSubmit ~ data:', data)
    dispatch(authSignUp(data))
  }

  return (
    <Box
      component="main"
      sx={{
        bgcolor: '#fafbfc',
        height: '100vh',
        position: 'relative',
        top: '0',
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
            width: '27%',
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
            width: '27%',
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '400px',
          margin: 'auto',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={(theme) => ({
            //  bgcolor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 5,
            p: 6,
            boxShadow: theme.shadowCustom.md,
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
            Sign up to Continue
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                size="small"
                {...register('firstName', {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors?.firstName?.type === 'required' && (
                <Typography sx={{ color: 'red' }}>
                  This field is required
                </Typography>
              )}
              {errors?.firstName?.type === 'maxLength' && (
                <Typography sx={{ color: 'red' }}>
                  Email cannot exceed 100 characters
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                size="small"
                {...register('lastName', {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors?.lastName?.type === 'required' && (
                <Typography sx={{ color: 'red' }}>
                  This field is required
                </Typography>
              )}
              {errors?.lastName?.type === 'maxLength' && (
                <Typography sx={{ color: 'red' }}>
                  Email cannot exceed 100 characters
                </Typography>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                size="small"
                {...register('email', {
                  required: true,
                  maxLength: 100,
                  // eslint-disable-next-line no-useless-escape
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                size="small"
                {...register('password', {
                  required: true,
                  maxLength: 25,
                  minLength: 6,
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
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                sx={{ textAlign: 'center', fontSize: '11px', marginTop: '8px' }}
              >
                By signing up, I accept the Atlassian Cloud Terms of Service and
                acknowledge the Privacy Policy.
              </Typography>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: '#0052cc' }}
          >
            Sign up
          </Button>
          <Typography sx={{ color: 'grey' }}>Or continue with:</Typography>
          <GoogleButton fullWidth color="text" sx={{ mt: 2, mb: 2 }}>
            <SvgIcon
              component={Google}
              fontSize="medium"
              inheritViewBox
              sx={{ padding: '2px' }}
            />
            <Typography>Google</Typography>
          </GoogleButton>
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
              width: '100%',
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
