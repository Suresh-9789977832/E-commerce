import Button from '@mui/material/Button';
import { FaSave } from "react-icons/fa";

export default function CustomButton({btntitle,handleclick}) {
  return (
      <div className='mt-5 w-full flex justify-center'>
        
    <Button
  variant="contained" onClick={handleclick}>
  <FaSave className='mx-2' />
  {btntitle}
  </Button>
      </div>
  );
}
