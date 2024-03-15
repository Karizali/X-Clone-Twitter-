import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import CardMedia from "@mui/material/CardMedia";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./Firebase-config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function AddProduct() {
  const [products, setProducts] = useState([]);
  const [editingProducts, setEditingProducts] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const getProducts = async () => {
    // try {
    //   const response = await axios.get('http://localhost:5000/products');
    //   setProducts(response.data.data.reverse())
    //   console.log(response.data.data)
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const editProduct = async (product) => {
    console.log(product);
    try {
      const response = await axios.put(
        `http://localhost:5000/product/${editingProducts.id}`,
        {
          id: editingProducts._id,
          name: product.editProductName,
          price: product.editProductPrice,
          description: product.editProductDescription,
        }
      );
      // setProducts(response.data.data)
      getProducts();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/product/${id}`,
        {
          name: editingProducts.name,
          price: editingProducts.price,
          description: editingProducts.description,
        }
      );
      // setProducts(response.data.data)
      getProducts();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getProducts()
    let product=[];

    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      snapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        product.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
    });
    console.log(product);
    setProducts(product);

    return () => {
      unsubscribe();
    };
  }, [products]);

  const formik = useFormik({
    initialValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      productPrice: Yup.number().positive("Must positive").required("Required"),
      productDescription: Yup.string()
        .max(500, "Must be 500 characters or less")
        .min(3, "Must be at least 3 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      (async () => {
        // try {
        //   const response = await axios.post('http://localhost:5000/product', {
        //     name: values.productName,
        //     price: values.productPrice,
        //     description: values.productDescription
        //   });
        //   getProducts()
        //   console.log(response)
        // } catch (error) {
        //   console.log(error)
        // }

        try {
          const docRef = await addDoc(collection(db, "products"), {
            name: values.productName,
            price: values.productPrice,
            description: values.productDescription,
          });
          // getProducts()
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })();

      formik.resetForm();
    },
  });

  const editformik = useFormik({
    initialValues: {
      editProductName: "",
      editProductPrice: "",
      editProductDescription: "",
    },
    validationSchema: Yup.object({
      editProductName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      editProductPrice: Yup.number()
        .positive("Must positive")
        .required("Required"),
      editProductDescription: Yup.string()
        .max(500, "Must be 500 characters or less")
        .min(3, "Must be at least 3 characters")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      console.log(editingProducts);
      editProduct(values);
      setIsEditing(!isEditing);

      editformik.resetForm();
    },
  });
  // (async () => {
  //   try {
  //     const response = await axios.put(`http://localhost:5000/product/${editingProducts._id}`, {
  //       name: values.editProductName,
  //       price: values.editProductPrice,
  //       description: values.editProductDescription
  //     });
  //     getProducts()
  //     console.log(response)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // })()
  return (
    <>
      <Card sx={{ minWidth: 275, maxWidth: 500, margin: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <CardContent>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginBottom: 2,
              }}
            >
              <TextField
                id="productName"
                name="productName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productName}
                fullWidth
                label="Product Name"
              />
              {formik.touched.productName && formik.errors.productName ? (
                <div className="error">{formik.errors.productName}</div>
              ) : null}
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginBottom: 2,
              }}
            >
              <TextField
                id="productPrice"
                name="productPrice"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productPrice}
                fullWidth
                label="Product Price"
              />
              {formik.touched.productPrice && formik.errors.productPrice ? (
                <div className="error">{formik.errors.productPrice}</div>
              ) : null}
            </Box>
            <Box
              sx={{
                width: 500,
                maxWidth: "100%",
                marginBottom: 2,
              }}
            >
              <TextField
                id="productDescription"
                name="productDescription"
                type="productDescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.productDescription}
                fullWidth
                label="Product Description"
              />
              {formik.touched.productDescription &&
              formik.errors.productDescription ? (
                <div className="error">{formik.errors.productDescription}</div>
              ) : null}
            </Box>
          </CardContent>
          <CardActions>
            <Button type="submit" size="small" variant="contained">
              Add Product
            </Button>
          </CardActions>
        </form>
      </Card>
      <div>
        {products.map((product) => (
          <Card
            key={product._id}
            sx={{ maxWidth: 345, margin: "1rem", cursor: "pointer" }}
          >
            {isEditing && editingProducts.id === product._id ? (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    editformik.handleSubmit(product);
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        marginBottom: 2,
                      }}
                    >
                      <TextField
                        id="editProductName"
                        name="editProductName"
                        type="text"
                        onChange={editformik.handleChange}
                        onBlur={editformik.handleBlur}
                        value={editformik.values.editProductName}
                        fullWidth
                        label="Product Name"
                      />
                      {editformik.touched.editProductName &&
                      editformik.errors.editProductName ? (
                        <div className="error">
                          {editformik.errors.editProductName}
                        </div>
                      ) : null}
                    </Box>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        marginBottom: 2,
                      }}
                    >
                      <TextField
                        id="editProductPrice"
                        name="editProductPrice"
                        type="text"
                        onChange={editformik.handleChange}
                        onBlur={editformik.handleBlur}
                        value={editformik.values.editProductPrice}
                        fullWidth
                        label="Product Price"
                      />
                      {editformik.touched.editProductPrice &&
                      editformik.errors.editProductPrice ? (
                        <div className="error">
                          {editformik.errors.editProductPrice}
                        </div>
                      ) : null}
                    </Box>
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "100%",
                        marginBottom: 2,
                      }}
                    >
                      <TextField
                        id="editProductDescription"
                        name="editProductDescription"
                        type="editProductDescription"
                        onChange={editformik.handleChange}
                        onBlur={editformik.handleBlur}
                        value={editformik.values.editProductDescription}
                        fullWidth
                        label="Product Description"
                      />
                      {editformik.touched.editProductDescription &&
                      editformik.errors.editProductDescription ? (
                        <div className="error">
                          {editformik.errors.editProductDescription}
                        </div>
                      ) : null}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => {
                        setIsEditing(!isEditing);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      onClick={() => {
                        // editProduct(product)
                      }}
                    >
                      Update
                    </Button>
                  </CardActions>
                </form>
              </>
            ) : (
              <>
                <CardMedia
                  sx={{ height: 140 }}
                  image={"https://cdn.dummyjson.com/product-images/2/2.jpg"}
                  title={product.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      height: "40px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    Rs. {product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      height: "60px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      deleteProduct(product._id);
                      getProducts();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setIsEditing(!isEditing);
                      setEditingProducts({
                        id: product._id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                      });
                      console.log(editingProducts);
                      editformik.setFieldValue("editProductName", product.name);
                      editformik.setFieldValue(
                        "editProductDescription",
                        product.description
                      );
                      editformik.setFieldValue(
                        "editProductPrice",
                        product.price
                      );
                    }}
                  >
                    Edits
                  </Button>
                </CardActions>
              </>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}

export default AddProduct;
