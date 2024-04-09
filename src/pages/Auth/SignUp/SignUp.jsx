import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { path } from '~/utils/constants'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { authSignIn, authSignUp } from '~/redux/authSlice'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}


export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
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
                {...register('firstName', {
                  required: true,
                  maxLength: 100
                })}
              />
              {errors?.firstName?.type === 'required' && <Typography sx={{ color: 'red' }}>This field is required</Typography>}
              {errors?.firstName?.type === 'maxLength' && (
                <Typography sx={{ color: 'red' }}>Email cannot exceed 100 characters</Typography>
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
                {...register('lastName', {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors?.lastName?.type === 'required' && <Typography sx={{ color: 'red' }}>This field is required</Typography>}
              {errors?.lastName?.type === 'maxLength' && (
                <Typography sx={{ color: 'red' }}>Email cannot exceed 100 characters</Typography>
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
                {...register('email', {
                  required: true,
                  maxLength: 100,
                  // eslint-disable-next-line no-useless-escape
                  pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })}
              />
              {errors?.email?.type === 'required' && <Typography sx={{ color: 'red' }}>This field is required</Typography>}
              {errors?.email?.type === 'maxLength' && (
                <Typography sx={{ color: 'red' }}>Email cannot exceed 100 characters</Typography>
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
                {...register('password', {
                  required: true,
                  maxLength: 25,
                  minLength: 6
                  // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/
                })}
              />
              {errors?.password?.type === 'required' && <Typography sx={{ color: 'red' }}>This field is required</Typography>}
              {errors?.password?.type === 'maxLength' && (
                <Typography sx={{ color: 'red' }}>Password cannot exceed 25 characters</Typography>
              )}
              {errors?.password?.type === 'minLength' && (
                <Typography sx={{ color: 'red' }}>Password must not be less than 6 characters</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href={path.SignIn} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}