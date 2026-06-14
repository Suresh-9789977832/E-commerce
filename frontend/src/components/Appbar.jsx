import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useLocation, useNavigate, useParams} from 'react-router-dom'

export default function Appbar({title,setuser,user,pagename}) {

    const navigate = useNavigate()
    
     const location = useLocation();

    const handleRegister = () =>{
        navigate('/register')
    }

    const handleLogin = () =>{
        navigate('/login')
    }

     const handleLogout = () => {
    localStorage.removeItem("Token");
    setuser(null);
    navigate("/login", { replace: true });
    };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton>
          </IconButton>
          <Typography className='hidden md:flex md:flex-row w-200' variant="h6" component="div" sx={{ flexGrow: 1 }}>
            E Commerce {'>'} {pagename}
          </Typography>
               <div className='flex justify-between w-full md:justify-end'>
               <Button color="inherit" onClick={title == 'Register' ? handleRegister : handleLogin }>{title}</Button>
           {
                location.pathname === '/login' || location.pathname === '/register'
                  ? ''
                  : (
                      <button
                        type="button"
                        className="mx-4 flex justify-center items-center bg-red-500 px-3 py-2 rounded-lg cursor-pointer"
                        onClick={handleLogout}>
                        Logout
                      </button>
                    )
              }
          
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}