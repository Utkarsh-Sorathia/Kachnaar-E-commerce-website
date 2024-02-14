import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { editProduct, removeProduct } from "../redux/userSlice";

function AddProduct({ onAddProduct }) {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [editingProductId, setEditingProductId] = useState(null); 
  const admin = useSelector((state) => state.admin);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddProduct = (e) => {

    e.preventDefault();

    if (!productName || !productPrice) return;
    const product = {
      id: uuidv4(),
      name: productName,
      price: parseFloat(productPrice),
    };
    onAddProduct(product);
    setProductName("");
    setProductPrice("");
  };

  const handleRemoveProduct = (productId) => {
    dispatch(removeProduct({ id: productId }));
    console.log("Removing product with ID:", productId);
  };

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    if (productToEdit) {
      setEditingProductId(productId);
      setProductName(productToEdit.name);
      setProductPrice(productToEdit.price);
    }
  };

  const handleSaveEditProduct = (e) => {

    e.preventDefault();
    
    if (!productName || !productPrice) return;
    dispatch(
      editProduct({
        id: editingProductId, 
        name: productName,
        price: parseFloat(productPrice),
      })
    );
    setEditingProductId(null); 
    setProductName("");
    setProductPrice("");
  };

  return (
    <>
      {admin ? (
        <>
          <form>
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3 p-3">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Product Price"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      required
                    />
                  </div>
                  {editingProductId ? ( 
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-success mx-2"
                        onClick={handleSaveEditProduct}
                      >
                        Save
                      </button>
                    </div>
                  ) : ( 
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-success mx-2"
                        onClick={handleAddProduct}
                      >
                        Add Product
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
          <br />
          <br />
          <div>
            <table className="table table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
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
