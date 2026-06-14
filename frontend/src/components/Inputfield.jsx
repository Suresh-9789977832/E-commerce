import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Inputfield({inputTitle,onchange,name,type,value}) {


  return (
    <div className='w-full mt-5'>
      <TextField className='w-full' type={type} name={name} value={value} id={inputTitle} label={inputTitle} variant="outlined" onChange={onchange} />
    </div>
  );
}
