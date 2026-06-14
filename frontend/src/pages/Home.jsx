import React, { useEffect, useLayoutEffect, useState } from 'react'
import Appbar from '../components/Appbar'
import { getallproducts } from '../services/ProductService'
import Button from '@mui/material/Button'
import { GoBook } from "react-icons/go";
import { PiDress } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { PiWatchLight } from "react-icons/pi";
import { IoFootstepsOutline } from "react-icons/io5";
import { CiMobile3 } from "react-icons/ci";
import { CiLaptop } from "react-icons/ci";
import { PiBabyLight } from "react-icons/pi";
import { CiShoppingCart } from "react-icons/ci";
import {jwtDecode} from 'jwt-decode'
import { get_profilethunk } from '../features/auth/authThunk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addtocart_thunk, getallproducts_thunk } from '../features/addtocart/addtocartThunk';
import { toast } from "react-toastify";
import { getall_cartproducts } from '../services/addtocartService';
import { get_allproducts } from '../features/addtocart/addtocartSlice';




const Home = ({user,setuser}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [products,setProducts] = useState([])
  const [isScrolled, setIsScrolled] = useState(false);
  const [activecategory,setactiveCategory] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const filteredProducts = currentProducts.filter((product) =>
  product.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [pages, setPages] = useState([1,2,3,4,5]);
  const dispatch = useDispatch();
  const getproducts = useSelector(get_allproducts).items


  async function getall_cartproducts() {
        const token = localStorage.getItem("Token");
        if (!token) return;
      
        const id = jwtDecode(token).id;
      
        const data = await dispatch(
          getallproducts_thunk({ token, id })
        ).unwrap();
        console.log("Data:", data);
      }

    useEffect(() => {
      getall_cartproducts();
    
    }, [dispatch]);


  useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
  }, []);


    const totalQuantity = getproducts.reduce(
      (total, item) => total + item.quantity,
      0
    );
  


  useEffect(() => {

  const maxPageButtons = 5;

  let startPage = Math.max(currentPage - 2, 1);
  let endPage = startPage + maxPageButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(totalPages - maxPageButtons + 1, 1);
  }
  
  const newPages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  setPages(newPages);

  }, [currentPage,products]);




  const category = [
    {
      id:1,
      name:"KFootwear",
      icon:<IoFootstepsOutline size={35}/>,
      value:'kidsfootwear'
    },
    {
      id:2,
      name:"Mobiles",
      icon:<CiMobile3 size={35}/>,
      value:'mobiles'

    },
    {
      id:3,
      name:"MFootwear",
      icon:<IoFootstepsOutline size={35}/>,
      value:'malefootwear'
    },
    {
      id:4,
      name:"Books",
      icon:<GoBook size={35}/>,
      value:'books'
    },
    {
      id:5,
      name:"Kidswear",
      icon:<PiBabyLight size={35}/>,
      value:'kidswear'
    },
    {
      id:6,
      name:"Womenswear",
      icon:<PiDress size={35}/>,
      value:'womenswear'
    },
    {
      id:7,
      name:"Menswear",
      icon:<IoShirtOutline size={35}/>,
      value:'menswear'
    },
    {
      id:8,
      name:"Watches",
      icon:<PiWatchLight size={35}/>,
      value:'watches'
    },
     {
      id:9,
      name:"Laptops",
      icon:<CiLaptop size={35}/>,
      value:'laptops'
    },
    {
      id:10,
      name:"WFootwear",
      icon:<IoFootstepsOutline size={35}/>,
      value:'femalefootwear'
    },
    

  ]

const navigate = useNavigate();
const handlecategory = (categoryname) => {
  localStorage.setItem("categoryname", categoryname);
  setactiveCategory(categoryname);
};



useEffect(() => {
  const category = localStorage.getItem("categoryname");
  setactiveCategory(category);

}, []);





useEffect(() => {
  if (!activecategory) return;

  const getall_products = async () => {
    const data = await getallproducts(activecategory);
    setProducts(data.data);
  };

  getall_products();

}, [activecategory]);



const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};


const gotocartpage = () =>{
  navigate('/cart')
}


function removeprice_symbol(price) {
  return Number(
    String(price)
      .replace("₹", "")
      .replaceAll(",", "")
      .trim()
  );
}



const handleaddtocart = async(el) => {
    try {
      const token = localStorage.getItem('Token')
      const datas = {
        "description":el.Description,
        "product_price":removeprice_symbol(el.Price),
        "quantity":1,
        "image":el.Image
      }
      const response = await dispatch(addtocart_thunk({datas,token}))
       toast.success(response.payload.message)
      console.log(response)
    } catch (error) {
      console.log(error.response)
    }
}



  return (
    <div className='bg-gray-300'>
        <Appbar user={user} setuser={setuser} pagename={'Home'} title={user ? `Welcome ${user.username}` : ''}/>
        
      <div
  className={`sticky top-0 z-[9999] p-4 transition-all duration-100 ${
    isScrolled
      ? "bg-white/90 backdrop-blur-md shadow-xl"
      : ""
  }`}
>
         <div className='container mx-auto flex justify-center mt-6'>

          <div id='filter' className='flex md:gap-6 gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide'>
              {
                category.map((item)=>(
                  <div className={activecategory === item.value?'active hover:cursor-pointer mx-4 my-1 py-2 px-2 rounded-lg rounded-lg cursor-pointer transition-all duration-300 ease-out':
                    "cursor-pointer px-2 py-1 rounded-lg rounded-lg cursor-pointer transition-all duration-300 ease-out"} 
                  onClick={()=>handlecategory(item.value)}>
                <div className='flex justify-center items-center'>{item.icon}</div>
                <p>{item.name}</p>
             </div>
                ))
              }
          </div>

       
        </div>
              
         <div className='flex mt-5 w-full container mx-auto gap-2 md:gap-10 '>
  <div id='search' className='w-4/5'>
    <input
      type='text'
      className='w-full border-3 border-blue-500 p-2 rounded-lg focus:outline-none'
      placeholder='Search products...'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div onClick={gotocartpage} className="w-1/5 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl px-4 py-2 shadow-lg cursor-pointer hover:scale-105 transition-all duration-300 relative">
  <div className="relative">
   
    <CiShoppingCart className="text-2xl" />
    
   

  </div>

  <p className="font-semibold md:flex hidden">Cart</p>
</div>

        </div>
       </div>


           {
          filteredProducts.length <= 0 ?(
              <div className="h-screen w-full flex justify-center items-center">
  <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center">
    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

    <h2 className="mt-4 text-xl font-bold">
      Loading Store
    </h2>

    <p className="text-gray-500 mt-2">
      Getting the latest products...
    </p>
  </div>
</div>
            )  : 
                    <div className='mt-5 grid grid-cols-2 md:grid-cols-4 container mx-auto gap-4'>
                
              { 
                        filteredProducts.map((item,i)=>(
            <div key={i} className='bg-white w-full h-80 md:h-65 py-2 px-2 shadow-lg rounded-lg cursor-pointer'>
                <img src={item.Image} className='w-full h-40 object-cover rounded-lg'/>
                <div className='mb-4'>{item.Description?.length > 35 ? item.Description.slice(0,30)+'...':item.Description}</div>
                
                  <div className='flex flex-col md:flex-row justify-between'>
                    <p className='font-bold text-xl mb-2'>{item.Price}</p>
                    <Button variant="contained" onClick={()=>handleaddtocart(item)}>Add To Cart</Button>
                    </div>
                </div>
          ))
          }

          
                    </div>
                    }


            <div className='flex justify-center py-10'>
                <nav className="mt-6 flex justify-center">
  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md">

    {/* Prev */}
    <button
      onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
      className="px-3 py-1 rounded-lg hover:bg-gray-100"
    >
      Prev
    </button>

  {pages.map((num) => (
  <button
    key={num}
    onClick={() => setCurrentPage(num)}
    className={`w-9 h-9 rounded-lg ${
      currentPage === num ? "bg-blue-500 text-white" : "hover:bg-gray-100"
    }`}>
    {num}
  </button>
  ))}



    <button
      onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
      className="px-3 py-1 rounded-lg hover:bg-gray-100">
      Next
    </button>

  </div>
</nav>
            </div>
                 

    </div>
  )
}

export default Home