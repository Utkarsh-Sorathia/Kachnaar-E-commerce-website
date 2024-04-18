import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";

function AddProduct({ onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [firestoreProducts, setFirestoreProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const admin = useSelector((state) => state.admin);
  const products = useSelector((state) => state.products);
  const notify = () =>
    toast.warning("Please Fill all the details.", { autoClose: 1500 });
  const notifyAdd = () =>
    toast.success("New Product Added.", { autoClose: 1500 });
  const db = firebase.firestore();
  const storage = firebase.storage();

  useEffect(() => {
    const unsubscribe = db
      .collection("productDataset")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setFirestoreProducts(data);
      });

    return () => unsubscribe();
  }, [db]);

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
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setProductImage(imageFile);
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setEditingProductId(productId);
      setProductName(productToEdit.name);
      setProductPrice(productToEdit.price);
      setProductDescription(productToEdit.description);
      setProductImage(productToEdit.imageUrl);
    }
  };

  const handleSaveEditProduct = async (e) => {
    e.preventDefault();

    if (!productName || !productPrice || !productDescription) {
      notify();
      return;
    }

    let updatedProduct = {
      id: editingProductId,
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
    };

    // If productImage is not null, update imageUrl
    if (productImage) {
      try {
        const imageRef = storage.ref().child(`product_images/${uuidv4()}`);
        await imageRef.put(productImage);
        const imageUrl = await imageRef.getDownloadURL();
        updatedProduct = { ...updatedProduct, imageUrl };
      } catch (error) {
        console.error("Error uploading image to Storage: ", error);
        return;
      }
    }

    // Update product in Firestore
    db.collection("productDataset")
      .doc(editingProductId)
      .update({
        name: updatedProduct.name,
        price: updatedProduct.price,
        description: updatedProduct.description,
        // If productImage is not null, update imageUrl
        ...(updatedProduct.imageUrl && { imageUrl: updatedProduct.imageUrl }),
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
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      {admin ? (
        <>
          <h2 className="mt-5 text-center">Add/Manage Products</h2>
          <div
            className="container mt-5 border rounded p-3"
            style={{ minWidth: "700px" }}
          >
            <div className="row g-2">
              <div className="col-lg-6 border rounded shadow-sm p-3">
                <form>
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
                </form>
              </div>

              <div className="col-lg-6 p-4">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th className="text-center">Name</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {firestoreProducts.map((product) => (
                        <tr key={product.id}>
                          <td>{product.name}</td>
                          <td>₹{product.price}</td>
                          <td>
                            <button
                              className="btn btn-primary mx-2"
                              onClick={() => handleEditProduct(product.id)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>You Don't Have access to this Page.</>
      )}
    </>
  );
}

export default AddProduct;
