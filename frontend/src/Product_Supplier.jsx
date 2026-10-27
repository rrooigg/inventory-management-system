import api from './api';

const Product_Supplier = () => {
  const [ supplier, setSupplier ] = useState({
    company_name:'',
    phone_number:''

  });
  const [ suppliers, setSuppliers ] = useState([]);
  const [ supplier_editingId, setSupplier_EditingId ] = useState(null);


  const [ product, setProduct ] = useState({
    product_name:'',
    in_stock:0,
    sold:0,
    unit_price:0,
    supplier_id:''

  });
  const [ products, setProducts ] = useState([]);
  const [ product_editingId, setProduct_EditingId ] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchSuppliers();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

  };

  // fetch suppliers and products
  const fetchProducts =  async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);

    } catch (error) {
      console.log("Error fetching products", error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data)

    } catch (error) {
      console.log("Error fetching suppliers", error);
    }
  };

  // add products and suppliers
  const addProduct = async () => {
    try {
      const response = await api.post('/products', {
        product_name: product_name.trim(),
        in_stock: in_stock,
        sold: sold,
        unit_price: unit_price,
        supplier_id: supplier_id.trim()

      });
      setProduct((currentProducts) => [...currentProducts, response.data]);

    } catch (error) {
      console.log("Error adding product", error);
    }
  };

  const addSupplier = async () => {
    try {
      const response = await api.post('/suppliers', {
        company_name: company_name.trim(),
        phone_number: phone_number.trim()
      });
      setSupplier((currentSuppliers) => [...currentSuppliers, response.data]);

    } catch (error) {
      console.log("Error adding supplier", error);

    }
  };

  // cancel Edit for products and suppliers
  const cancelProductEdit = async () => {
    setProduct_EditingId(null),
    product_name='',
    in_stock=0,
    sold=0,
    unit_price=0,
    supplier_id=0

  };

  const cancelSupplierEdit = async () => {
    company_name='',
    phone_number=''    
  };

  // delete product and supplier
  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== product_id));

    } catch (error) {
        console.log('Error deleting the product', error);

    }

  };

  const deleteSupplier = async (id) => {
    try {
      await api.delete(`/suppliers/${id}`);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));

    } catch (error) {
        console.log('Error deleting supplier', error);

    }
  };

  // update products and supplier
  const updateProduct = async () => {
    try {
      const response = await api.put(`/products/${product_editingId}`, {
        product_name: product_name.trim(),
        in_stock: in_stock,
        sold: sold,
        unit_price: unit_price,
        supplier_id: supplier_id.trim()

      });
      setProducts(currentProducts => currentProducts.map((product) => product.id === product_editingId ? response.data : product));

      cancelProductEdit();

    } catch (error) {
      console.log('Error updating the student', error);

    }
  };

  const updateSupplier = async () => {
    try {
      const response = await api.put(`/suppliers/${supplier_editingId}`, {
        company_name: company_name.trim(),
        phone_number: phone_number.trim()

      });
      setSuppliers(currentSuppliers => currentSuppliers.map((supplier) => supplier.id === supplier_editingId ? response.data : supplier));
      cancelSupplierEdit();

    } catch (error) {
      console.log('Error updating supplier', error);
    }
  };
};
export default Product_Supplier