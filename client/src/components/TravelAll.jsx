import { CgDollar } from "react-icons/cg";
import { AiFillCaretRight } from "react-icons/ai";
import Wrapper from "../assets/wrappers/travel";
import { useDispatch } from "react-redux";
import TravelInfo from "./TravelInfo";
import moment from "moment";
const Travel = ({
  id,
  travelName,
  location,
  description,
  characteristics,
  image,
  price,
  createdAt,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format("MMM Do, YYYY");

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{travelName}</h5>
          <p>{location}</p>
          <TravelInfo icon={<CgDollar />} text={price} />
        </div>
      </header>
      <div className="content">
        <div
          className="image-container"
          style={{ width: "400px", height: "300px" }}
        >
          <img
            className="image"
            src={image}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="content-center">
          {/* Image HERE <TravelInfo icon={<FaBriefcase />} number={price} /> */}
          <TravelInfo icon={<AiFillCaretRight />} text={description} />
        </div>
        <div className="content-center">
          <TravelInfo icon={<AiFillCaretRight />} text={characteristics} />
        </div>
      </div>
    </Wrapper>
  );
};
export default Travel;
