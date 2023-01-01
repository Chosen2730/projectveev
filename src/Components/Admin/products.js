import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
// import { allProducts } from "../../Redux/features/adminSlice";
import Currency from "../Configs/currency";
import { AiOutlineEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Form from "./form";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  updateProduct,
  updateProductStatus,
} from "../../Utils/functions";
import { deleteProduct } from "../../Utils/deleteFunctions";
import upload from "../../images/upload.png";
import Input from "../Form/input";
import { IoClose } from "react-icons/io5";
import {
  setProductModalShown,
  setProducts,
} from "../../Redux/features/adminSlice";
import { FaUsers, FaUsersSlash } from "react-icons/fa";
import { ImCart, ImUsers } from "react-icons/im";
import { RiLuggageCartFill } from "react-icons/ri";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from "../Configs/spinner";
import { createProduct } from "../../Utils/createFunctions";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const productHeader = [
    "product",
    "date",
    "description",
    "price",
    "status",
    "actions",
  ];

  const [allProducts, setAllProducts] = useState([]);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);

  const category = ["Select", "Men", "Women", "Kids", "Fabrics", "Custom"];
  const statusList = ["Select", "In Stock", "Out of Stock"];
  const discountValues = ["Set Discount", 10, 25, 50, 75, 100];
  const { isProductModalShown } = useSelector((state) => state.admin);
  const [allImages, setAllImages] = useState([]);
  const [discount, setDiscount] = useState(false);
  const [fabricInput, setFabricInput] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    discountValue: "",
    trending: "",
    featured: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = getAllProducts(
      (querySnapshot) => {
        const updatedItems = querySnapshot.docs.map((docSnapshot) => ({
          productId: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setAllProducts(updatedItems);
        dispatch(setProducts(updatedItems));
      },
      (error) => setError(error)
    );
    return unsubscribe;
  }, [dispatch]);
  error && console.log(error);

  const updateStatus = (productId) => {
    var value = "In stock";
    updateProductStatus(isLoggedIn, productId, value);
    // updateProduct(isLoggedIn, 'status', 'In Stock', productId)
  };

  const next = async () => setPage(page + 1);
  const prev = async () => setPage(page > 1 ? page - 1 : page);

  const editFunc = (id) => {
    setIsEditing(true);
    dispatch(setProductModalShown());
    const productToEdit = allProducts.find(
      (product) => product.productId === id
    );
    setCurrentItem({
      category: productToEdit.category,
      desc: productToEdit.desc,
      image: productToEdit.imageUrl,
      price: productToEdit.price,
      title: productToEdit.title,
    });
  };

  const handleInputChange = (e) => {
    setCurrentItem({
      ...currentItem,
      [e.target.name]: e.target.value,
      allImages,
    });
    // console.log(currentItem);
  };

  useEffect(() => {
    if (currentItem.category === "Fabrics") {
      setFabricInput(true);
    } else {
      setFabricInput(false);
    }
  }, [currentItem]);

  const uploadProduct = async (e) => {
    setIsLoading(true);
    // e.preventDefault();
    const {
      title,
      desc,
      price,
      discountValue,
      category,
      status,
      featured,
      trending,
    } = currentItem;
    // console.log(currentItem);
    var data = {};
    data = {
      title,
      desc,
      price,
      discountValue,
      category,
      status,
      featured,
      trending,
      _createdAt: new Date().toDateString(),
      _updatedAt: new Date().toDateString(),
    };
    if (category === "Fabrics") {
      data = {
        ...data,
        fabricName: currentItem.fabricName,
        colors: currentItem.colors,
        length: currentItem.length,
      };
    }
    // console.log({ data });
    const createProductRef = await createProduct(isLoggedIn, data, allImages);
    setIsLoading(false);
    dispatch(setProductModalShown());
    console.log({ createProductRef });
    setIsLoading(false);
  };
  // console.log(isLoading);
  const goToSingleProduct = (id) => {
    navigate(`/admin/product/${id}`);
  };

  const handleSubmit = () => {
    if (isEditing) {
    } else {
      uploadProduct();
    }
  };

  const imageUploadHandler = (e) => {
    const newImage = Array.prototype.slice.call(e.target.files);
    const uploaded = [...allImages];
    newImage.some(file => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
      }
      return 0;
    })
    setAllImages(uploaded);
  };
  // console.log(allImages);

  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 my-10'>
        <div className='rounded-xl shadow-xl bg-black text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>All Products</p>
            <i className='bg-white text-black text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <RiLuggageCartFill />
            </i>
          </div>
          <p className='text-4xl font-medium'>{allProducts?.length}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-blue-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>In Stock</p>
            <i className='bg-white text-blue-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <ImCart />
            </i>
          </div>
          <p className='text-4xl font-medium'>{0}</p>
        </div>
        <div className='rounded-xl shadow-xl bg-red-800 text-white p-8'>
          <div className='flex justify-between gap-2 items-center'>
            <p className='text-lg font-medium my-2'>Out of Stock</p>
            <i className='bg-white text-red-800 text-2xl w-8 rounded-md h-8 flex items-center justify-center'>
              <MdRemoveShoppingCart />
            </i>
          </div>
          <p className='text-4xl font-medium'>{0}</p>
        </div>
      </div>
      <div className='flex flex-col my-4 gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-xl font-bold'>
          All Products ({allProducts.length})
        </h2>
        <button
          className='flex items-center justify-center text-white p-4 px-8 rounded-md bg-black gap-2 hover:scale-105 transition w-fit'
          onClick={() => dispatch(setProductModalShown())}
        >
          Upload Product
          <IoMdAdd className='text-2xl' />
        </button>
      </div>
      <div className='overflow-x-scroll'>
        <div className='grid'>
          <div className='grid gridLayout my-5 bg-gray-100 rounded-md p-5 '>
            {productHeader?.map((item, index) => {
              return (
                <h2 className='capitalize font-bold text-base' key={index}>
                  {item}
                </h2>
              );
            })}
          </div>
          <div className=''>
            {allProducts?.map(
              (
                {
                  productId,
                  title,
                  imageUrl,
                  price,
                  desc,
                  status,
                  imageStoragePATH,
                },
                index
              ) => {
                // console.log(productId);
                return (
                  <div
                    key={index}
                    className='grid gridLayout px-5 py-2 text-xs items-center'
                  >
                    <div className='flex gap-2 items-center'>
                      <img
                        className='w-10 h-10 rounded-md object-cover'
                        src={imageUrl}
                        alt={title}
                      />
                      <h2 className='font-medium'>{title}</h2>
                    </div>
                    <h2 className='capitalize'>02/04/22</h2>
                    <h2 className='capitalize'>{desc.slice(0, 50)}...</h2>
                    <Currency amount={price} className='font-medium' />
                    <h2 className='capitalize'>{status}</h2>
                    <div className='flex justify-between gap-2 text-xl'>
                      <AiOutlineDelete
                        className='bg text-red-500 cursor-pointer rounded-md'
                        onClick={async () => {
                          if (
                            window.confirm(
                              "do you want to delete this product?"
                            )
                          ) {
                            // ADD LOADING....
                            await deleteProduct(
                              isLoggedIn,
                              productId,
                              imageStoragePATH
                            );
                            // KILL LOADING....
                          }
                        }}
                      />
                      <AiOutlineEdit
                        className='bg- text-blue-500 cursor-pointer rounded-md'
                        onClick={() => editFunc(productId)}
                      />
                      <AiOutlineEye
                        className='bg-g text-gray-500 cursor-pointer rounded-md'
                        onClick={() => goToSingleProduct(productId)}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
        <div className='flex gap-10 my-5'>
          <button
            className='flex items-center justify-center text-white p-4 px-8 rounded-md bg-black gap-2 hover:scale-105 transition w-fit'
            onClick={() => prev()}
          >
            Prev
          </button>
          <button
            className='flex items-center justify-center text-white p-4 px-8 rounded-md bg-black gap-2 hover:scale-105 transition w-fit'
            onClick={() => next()}
          >
            Next
          </button>
        </div>
      </div>

      {/* <Form /> */}
      <div
        className={`${
          isProductModalShown ? "category" : "category hider"
        } overflow`}
      >
        <div className='bg-white shadow-md rounded-md p-4 overflow'>
          <IoClose
            className='bg-black text-white text-4xl p-2 ml-auto rounded-md'
            onClick={() => {
              dispatch(setProductModalShown());
              setCurrentItem({});
              setIsEditing(false);
            }}
          />
          <h1 className='text-center text-xl sm:text-2xl font-semibold my-3'>
            {isEditing ? "Update Product" : "Upload Product"}
          </h1>

          {/* ====================FORM================ */}
          <Input
            type='text'
            input
            id='title'
            title='Name of Product'
            setItem={handleInputChange}
            value={currentItem.title || ""}
          />
          <Input
            textarea
            id='desc'
            title='Product Description'
            setItem={handleInputChange}
            value={currentItem.desc || ""}
          />
          <Input
            dropdown
            data={category}
            id='category'
            title='Select Category'
            setItem={handleInputChange}
            value={currentItem.category || ""}
          />
          {fabricInput && (
            <div>
              <Input
                type='text'
                input
                id='fabricName'
                title='Fabric Name'
                setItem={handleInputChange}
                value={currentItem.fabricName || ""}
              />
              <Input
                type='text'
                input
                id='length'
                title='Length'
                setItem={handleInputChange}
                value={currentItem.length || ""}
              />
              <Input
                type='text'
                input
                id='colors'
                title='Colors'
                setItem={handleInputChange}
                value={currentItem.colors || ""}
              />
            </div>
          )}
          <Input
            dropdown
            data={statusList}
            id='status'
            title='Product Status'
            setItem={handleInputChange}
            value={currentItem.status || ""}
          />
          <div className='rounded-md border p-4 bg-gray-100'>
            <h2>Market Status</h2>
            <div className='flex gap-2 items-center'>
              <Input
                value={currentItem.featured || ""}
                check
                id='featured'
                title='Featured'
                setItem={handleInputChange}
              />
              <Input
                value={currentItem.trending || ""}
                check
                id='trending'
                title='Trending'
                setItem={handleInputChange}
              />
            </div>
          </div>
          <Input
            type='number'
            input
            id='price'
            title='Price'
            setItem={handleInputChange}
            value={currentItem.price || ""}
          />
          <Input
            setCheck={() => setDiscount(!discount)}
            check
            id='discount'
            title='Discount (%)'
            setItem={handleInputChange}
            value={currentItem.discount || ""}
          />
          {discount && (
            <Input
              dropdown
              data={discountValues}
              id='discountValue'
              setItem={handleInputChange}
              value={currentItem.discountValue || ""}
            />
          )}
          <div className='text-center bg-gray-100 my-2 p-4'>
            <h2 className='font-semibold text-sm'>Upload Image</h2>
            <p className='text-sm my-2'>
              Upload the picture of the product. Accepted format : .jpg, .png,
              .jpeg
            </p>
            <div className='bg-gray-300 m-2 p-4 rounded-md'>
              <label htmlFor='image' className='cursor-pointer text-sm'></label>
              <input
                type='file'
                placeholder='Browse to upload your file'
                id='image'
                accept='image/*'
                multiple
                onChange={imageUploadHandler}
              />
            </div>
            <div className='preview_img grid place-items-center my-5 grid-cols-5'>
              {allImages &&
                Array.from(allImages).map((image, i) => {
                  return (
                    <img
                      key={i}
                      src={URL.createObjectURL(image)}
                      alt=''
                      width={100}
                      className='w-20 h-20 object-contain'
                    />
                  );
                })}
            </div>
          </div>
          <button
            className='bg-black text-white rounded-md text-sm md:text-base py-4 px-8 font-normal tracking-wider w-full my-2'
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Spinner loaderText={isEditing ? "Updating" : "Uploading"} />
            ) : isEditing ? (
              "Update"
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
