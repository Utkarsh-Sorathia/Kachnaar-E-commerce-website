import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { editProduct, removeProduct } from "../redux/userSlice";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct({ onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const admin = useSelector((state) => state.admin);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const notify = () => toast.warning("Please Fill all the details.");
  const notifyAdd = () => toast.success("New Product Added.");
  const db = firebase.firestore();
  const storage = firebase.storage();

  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productDescription) {
      notify();
      return;
    }

    const imageRef = storage.ref().child(`product_images/${uuidv4()}`);
    await imageRef.put(productImage);
    const imageUrl = await imageRef.getDownloadURL();

    const product = {
      id: uuidv4(),
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      imageUrl: imageUrl,
      stock: stock,
    };
    onAddProduct(product);
    db.collection("productDataset")
      .doc(product.id)
      .set(product)
      .then(() => {
        console.log("Product added to Firestore:", product);
        notifyAdd();
      })
      .catch((error) => {
        console.error("Error adding product to Firestore: ", error);
      });
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setProductImage(null);
    setStock(0);
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct({ id: productId }));
    console.log("Removing product with ID:", productId);
    // Remove product from Firestore
    db.collection("productDataset")
      .doc(productId)
      .delete()
      .then(() => {
        console.log("Product removed from Firestore:", productId);
      })
      .catch((error) => {
        console.error("Error removing product from Firestore: ", error);
      });
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setEditingProductId(productId);
      setProductName(productToEdit.name);
      setProductPrice(productToEdit.price);
      setProductDescription(productToEdit.description);
      setProductImage(productToEdit.imageUrl);
      setStock(productToEdit.stock);
    }
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productDescription) {
      notify();
      return;
    }
    dispatch(
      editProduct({
        id: editingProductId,
        name: productName,
        price: parseFloat(productPrice),
        description: productDescription,
        imageUrl: productImage,
        stock: parseInt(stock),
      })
    );
    db.collection("productDataset")
      .doc(editingProductId)
      .update({
        name: productName,
        price: parseFloat(productPrice),
        description: productDescription,
        stock: parseInt(stock),
      })
      .then(() => {
        console.log("Product updated in Firestore:", editingProductId);
      })
      .catch((error) => {
        console.error("Error updating product in Firestore: ", error);
      });
    setEditingProductId(null);
    setProductName("");
    setProductPrice("");
    setProductDescription("");
    setStock(0);
  };

  return (
    <>
      <ToastContainer />
      {admin ? (
        <>
          <form className="form">
            <div className="border p-2 container">
              <div className="row">
                <div className="col-md-6 offset-md-3 p-3">
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                  />
                  <textarea
                    className="form-control mb-3"
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  />
                  <input
                    type="file"
                    accept=".jpg,.png"
                    onChange={handleImageChange}
                    className="form-control mb-3"
                    required
                  />
                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-success mx-2"
                    onClick={
                      editingProductId
                        ? handleSaveEditProduct
                        : handleAddProduct
                    }
                  >
                    {editingProductId ? "Save" : "Add Product"}
                  </button>
                </div>
              </div>
            </div>
          </form>
          <br />
          <br />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Stock</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>You Don't Have access to this Page.</>
      )}
    </>
  );
}

export default AddProduct;
