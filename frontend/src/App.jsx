import { useEffect, useState } from 'react'
import './App.css'
import Product_Supplier from './Product_Supplier';


function App() {
  return (
    <>
    <Product_Supplier />
      {/* form to add product */}
      <form onSubmit={handleSubmit}>
        <input type="text" name='product_name' value={product.product_name} placeholder='Enter product name...' onChange={(e) => setProduct(e.target.value)}/>
        <input type="number" name='in_stock' value={product.in_stock} placeholder='Enter stock...' onChange={(e) => setProduct(e.target.value)}/>
        <input type="number" name='sold' value={product.sold} placeholder='Enter product sales...' onChange={(e) => setProduct(e.target.value)}/>
        <input type="number" name='unit_price' value={product.unit_price} placeholder='Enter product unit price...' onChange={(e) => setProduct(e.target.value)}/>
        <label>Choose a supplier:</label>
        <select name="suppliers" onChange={(e) => setProduct(e.target.value)}>
          {suppliers.map(supplier => 
            <option key={supplier.id} value={supplier.id}>{supplier.company_name}</option>
          )}
        </select>
        <button>Add Product</button>
      </form>
      {/* form to add supplier */}
      <form onSubmit={handleSubmit}>
        <input type="text" name='company_name' value={supplier.company_name} placeholder="Enter supplier's name..." onChange={(e) => setSupplier(e.target.value)}/>
        <input type="text" name='phone_number' value={supplier.phone_number} placeholder="Enter supplier's phone number..." onChange={(e) => setSupplier(e.target.value)}/>
        
        <button>Add Supplier</button>
      </form>

      <div className='list'>
        <h3>Product list</h3>
        {products.length === 0 ? <p>No Product found.</p> : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}-{product.in_stock} - {product.sold} - {product.unit_price} - {product.supplier_id}
              <button onClick={() => {
                setProduct_EditingId(product.id)
                product.name=product_name
                product.in_stock=in_stock
                product.sold=sold
                product.supplier_id=supplier_id
              }}>Edit</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className='list'> 
        <h3>Supplier's List</h3>
        {suppliers.length === 0 ? (<p>No Supplier found.</p>) : (
          <ul>
            {suppliers.map((supplier) => (
              <li key={supplier.id}>{supplier.company_name} - {supplier.phone_number}
              <button onClick={() => {
                setSupplier_EditingId(null)
                supplier.company_name=company_name
                supplier.phone_number=phone_number
              }}>Edit</button>
              <button onClick={() => deleteSupplier(supplier.id)}>Delete</button>
              </li>            
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App
