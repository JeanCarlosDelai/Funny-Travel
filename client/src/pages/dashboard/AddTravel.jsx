import { FormRow } from "../../components";
import ImageUpload from "../../components/ImageUpload";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import {
  handleChange,
  clearValues,
  createTravel,
  editTravel,
} from "../../features/travel/travelSlice.jsx";
import { useEffect } from "react";
const AddTravel = () => {
  const {
    isLoading,
    travelName,
    location,
    description,
    characteristics,
    image,
    price,
    isEditing,
    editTravelId,
  } = useSelector((store) => store.travel);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!travelName || !location) {
      toast.error("Por favor prencha todos os campos");
      return;
    }
    if (isEditing) {
      dispatch(
        editTravel({
          travelId: editTravelId,
          travel: {
            travelName,
            location,
            description,
            characteristics,
            image,
            price,
          },
        })
      );
      return;
    }
    dispatch(
      createTravel({
        travelName,
        location,
        description,
        characteristics,
        image,
        price,
      })
    );
  };

  const handleTravelInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };

  const handleTravelInput2 = async (e) => {
    const name = e.target.name;
    const imageFile = e.target.files[0];

    let value = "";
    try {
      value = await handleImageUpload(name, imageFile);
    } catch (error) {
      console.log(error);
    }

    console.log(name, value);
    dispatch(handleChange({ name, value }));
  };

  const handleImageUpload = async (name, imageFile) => {
    const url = "http://localhost:3000/api/v1/auth";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const {
        data: {
          image: { src },
        },
      } = await axios.post(`${url}/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return src;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: "location",
          value: user.location,
        })
      );
    }
  }, []);

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Editar Viagem" : "Adicionar Viagem"}</h3>
        <div className="form-center">
          {/* Travel Name */}
          <FormRow
            type="text"
            name="travelName"
            labelText="Nome da viagem"
            value={travelName}
            handleChange={handleTravelInput}
          />
          {/* travelLocation */}
          <FormRow
            type="text"
            name="location"
            labelText="Localização da viajem"
            value={location}
            handleChange={handleTravelInput}
          />
          {/* Description */}
          <FormRow
            type="text"
            name="description"
            labelText="Descrição"
            value={description}
            handleChange={handleTravelInput}
          />
          {/* Caracteristics */}
          <FormRow
            type="text"
            name="characteristics"
            labelText="Características"
            value={characteristics}
            handleChange={handleTravelInput}
          />
          {/* price*/}
          <FormRow
            type="number"
            name="price"
            labelText="Preço"
            value={price}
            handleChange={handleTravelInput}
          />
          {/* Image*/}
          <ImageUpload
            type="file"
            id="image"
            name="image"
            labelText="Imagens"
            handleChange={handleTravelInput2}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearValues())}
            >
              Limpar
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Enviar
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddTravel;
