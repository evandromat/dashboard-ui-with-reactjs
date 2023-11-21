import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { GrUpdate } from "react-icons/gr";
import { BiSolidTrash } from "react-icons/bi";
import { Form, Row, Col, Button } from "react-bootstrap";
import { FaRegImages } from "react-icons/fa";
import ContentTop from "../ContentTop/ContentTop";
import Loader from "../loader/Loader";
import StickyHeadTable from "../table/Table";
import Paper from "@mui/material/Paper";
import {
  getCategory,
  registerCategory,
} from "../../redux/features/category/categoryReduce";
import {
  cadProduto,
  getProducts,
} from "../../redux/features/produtos/productService";

import "../../layout/Content/Content.css";
import "./ProductForm.css";
import ButtonLoader from "../loader/ButtonLoader";
import TableProduct from "../table/TableProduct";
import DataGridProduct from "../table/DataGridProduct";

const initial_state = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  color: "",
  quantity: 0,
  sold: 0,
  regularPrice: 0,
  price: 0,
  description: [],
  images: [],
};

const columnsCategory = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "categoria", label: "CATEGORIA", minWidth: 100 },
  { id: "actions", label: "Ação", minWidth: 100 },
];
const columnsProduct = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "name", label: "PRODUTO" },
  { id: "sku", label: "sku" },
  { id: "category", label: "CATEGORIA" },
  { id: "brand", label: "MARCA" },
  { id: "color", label: "COR" },
  { id: "sold", label: "DESCONTO" },
  { id: "regularPrice", label: "PREÇO NORMAL" },
  { id: "price", label: "PREÇO" },
  { id: "images", label: "QTD FOTOS" },
  { id: "actions", label: "ação" },
];

const CategoriaForm = ({ formData, handleCategorySubmit }) => {
  return (
    <form className="form-cat">
      <div>
        <label>
          Cadastrar Nova Categoria
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleCategorySubmit}
            required
          />
        </label>

        <button onClick={handleCategorySubmit}>Cadastrar categoria</button>
      </div>
    </form>
  );
};

const CategoriaTable = ({ rowsCategory }) => {
  return (
    <StickyHeadTable
      widthPaper={70}
      columns={columnsCategory}
      rows={rowsCategory}
      linhasPorPagina={3}
      rowsPerPageOptions={[3, 6, 12]}
    />
  );
};
const ProductTable = ({ rowsProduct }) => {
  return (
    <StickyHeadTable
      widthPaper={90}
      columns={columnsProduct}
      rows={rowsProduct}
      linhasPorPagina={5}
      rowsPerPageOptions={[5, 10, 20]}
    />
  );
};

const ProdutoForm = ({
  formData,
  handleInputChange,
  handleImageChange,
  handleDescriptionChange,
  imagesURL,
  categoryData,
}) => {
  return (
    <Form>
      <Row className="g-3 mx-6 gx-6">
        <div className="col-md-6">
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            SKU:
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Categoria :
            <select name="category" onChange={handleInputChange}>
              <option value="GERAL"></option>
              {categoryData.map((item) => (
                <option key={item.category} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Marca:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Cor:
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Quantidade
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Preço:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Desconto (%):
            <input
              type="text"
              name="sold"
              value={formData.sold}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Preço Regular:
            <input
              type="number"
              name="regularPrice"
              value={formData.regularPrice}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Caract. 01
            <input
              name="d1"
              value={formData.description["d1"]}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Caract. 02
            <input
              name="d2"
              value={formData.description["d2"]}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Caract. 03
            <input
              name="d3"
              value={formData.description["d3"]}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Caract. 04
            <input
              name="d4"
              value={formData.description["d4"]}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Caract. 05
            <input
              name="d5"
              value={formData.description["d5"]}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>
        <div className="col-md-3">
          <label>
            Caract. 06
            <input
              name="d6"
              value={formData.description["d6"]}
              onChange={handleDescriptionChange}
            />
          </label>
        </div>

        <Col md={12}>
          <Form.Group>
            <Form.Label htmlFor="images" className="d-flex align-items-center">
              <FaRegImages size={30} style={{ cursor: "pointer" }} />
              <span className="ms-2">Adicionar Imagens</span>
            </Form.Label>
            <Form.Control
              style={{ display: "none" }}
              id="images"
              type="file"
              name="images"
              onChange={handleImageChange}
              accept="image/png, image/jpeg"
              multiple
            />

            {imagesURL &&
              formData.images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Thumbnail ${index}`}
                />
              ))}
            {!imagesURL &&
              formData.images.map((image, index) => (
                <img key={index} src={image} alt={`Thumbnail ${index}`} />
              ))}
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

const ProdutoPage = () => {
  const { data: categoryData, isLoading: isLoadingCategory } = useQuery(
    "category",
    getCategory
  );
  const { data: productData, isLoading: isLoadingProduct } = useQuery(
    "product",
    getProducts
  );
  const { mutate: registerCategoryMutation } = useMutation(
    registerCategory,
    () => {
      setFormData(initial_state);
    }
  );

  const [formData, setFormData] = useState(initial_state);
  const [openFormCategory, setOpenFormCategory] = useState(false);
  const [imagesURL, setImagesURL] = useState(true);
  const [isLoadSaveData, setIsLoadSaveData] = useState(false);
  if (isLoadingCategory || isLoadingProduct) {
    return <Loader />;
  }
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (!e.target.value) {
      toast.info("Nome da categoria é obrigatório");
    } else {
      const res = await registerCategory(formData.category);
      setFormData(initial_state);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (e) => {
    const imagesArray = Array.from(e.target.files);
    setFormData((prevData) => ({
      ...prevData,
      images: imagesArray,
    }));
  };
  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      description: { ...formData.description, [name]: value },
    }));
  };

  const handleCadProdutoSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.color || !formData.sku) {
      return toast.info("Verifique os campos de preenchimento obrigatórios");
    }
    const formDataImg = new FormData();
    try {
      let ArrayImage = [];
      setIsLoadSaveData(true);
      for (let i = 0; i < formData.images.length; i++) {
        formDataImg.append("file", formData.images[i]);
        formDataImg.append(
          "upload_preset",
          import.meta.env.VITE_APP_UPLOAD_PRESET
        );
        formDataImg.append("clould_name", import.meta.env.VITE_APP_CLOUD_NAME);

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/evandro-rocha/image/upload/",
          {
            method: "POST",
            body: formDataImg,
          }
        );
        const data = await response.json();
        ArrayImage.push(data.secure_url);
      }
      setImagesURL(false);
      formData.images = ArrayImage;

      const res = cadProduto(formData);
      setFormData(initial_state);

      toast.success("Produto cadastrado com sucesso...");
      setIsLoadSaveData(false);
    } catch (error) {
      toast.error("error ao salvar dados");
      setIsLoadSaveData(false);
    }
  };

  const createDataCategory = (id, categoria, actions) => {
    return { id, categoria, actions };
  };
  const createDataProduct = (
    id,
    name,
    sku,
    category,
    brand,
    color,
    sold,
    regularPrice,
    price,
    images,
    actions
  ) => {
    return {
      id,
      name,
      sku,
      category,
      brand,
      color,
      sold,
      regularPrice,
      price,
      images,
      actions,
    };
  };

  const rowsCategory = categoryData.map((item, index) => {
    return createDataCategory(
      index + 1,
      item.category,
      <Box key={item._id} sx={{ display: "flex", gap: 2 }}>
        <GrUpdate size={20} color="green" style={{ cursor: "pointer" }} />
        <BiSolidTrash size={24} color="red" style={{ cursor: "pointer" }} />
      </Box>
    );
  });
  const rowsProduct = productData.map((item, index) => {
    return createDataProduct(
      index + 1,
      item.name,
      item.sku,
      item.category,
      item.brand,
      item.color,
      item.sold,
      item.regularPrice,
      item.price,
      item.images.length,
      <Box key={item._id} sx={{ display: "flex", gap: 2 }}>
        <GrUpdate size={20} color="green" style={{ cursor: "pointer" }} />
        <BiSolidTrash size={24} color="red" style={{ cursor: "pointer" }} />
      </Box>
    );
  });

  return (
    <div className="main-content">
      {/* {isLoading && <Loader />}
      {isLoadSaveData && <Loader />} */}

      <ContentTop />
      <div className="main-content-holder">
        <div className="btn-cad">
          {!openFormCategory ? (
            <button
              className="--btn --btn-primary"
              onClick={() => setOpenFormCategory(true)}
            >
              <AiFillCaretDown /> Ver categorias
            </button>
          ) : (
            <button
              className="--btn --btn-primary"
              onClick={() => setOpenFormCategory(false)}
            >
              <AiFillCaretUp /> Fechar categorias
            </button>
          )}
          <button
            className="--btn --btn-primary"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Cadastrar Novo Produto
          </button>
        </div>
        <hr className="border border-danger border-1 opacity-50"></hr>
        {openFormCategory && (
          <>
            <CategoriaForm
              formData={formData}
              handleCategorySubmit={handleCategorySubmit}
            />
            <CategoriaTable rowsCategory={rowsCategory} />
          </>
        )}
        {/* <ProductTable rowsProduct={rowsProduct} /> */}
        <Paper elevation={4} sx={{ padding: 2,backgroundColor:'var(--clr-primar-light)' }}>
          <DataGridProduct productData={productData} />
        </Paper>
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content --modal">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-warning"
                  id="staticBackdropLabel"
                >
                  Cadastrar Produto
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <ProdutoForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleImageChange={handleImageChange}
                  handleDescriptionChange={handleDescriptionChange}
                  imagesURL={imagesURL}
                  categoryData={categoryData}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="--btn --btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Fechar
                </button>
                {!isLoadSaveData ? (
                  <button
                    type="button"
                    className="--btn --btn-success"
                    onClick={handleCadProdutoSubmit}
                  >
                    Cadastrar
                  </button>
                ) : (
                  <ButtonLoader texto={"Salvando..."} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoPage;
