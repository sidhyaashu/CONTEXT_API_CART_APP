import { Form, Button } from "react-bootstrap";
import "./styles.css";
import Rating from "./Rating";
import { cartState } from "../config/Context";
import { CLEAR_FILTERS, FILTER_BY_DELIVERY, FILTER_BY_RATING, FILTER_BY_STOCK, HIGH_TO_LOW, LOW_TO_HIGH, SORT_BY_PRICE } from "../config/Action";

const Filters = () => {
  const {
    productState: { byStock, byFastDelivery, byRating, sort },
    productDispatch,
  } = cartState();

  // console.log(byStock, byFastDelivery, byRating, searchQuery, sort);

  return (
    <div className="filters">
      <span className="title">Filter Products</span>
      <span>
        <Form.Check
          inline
          label="Ascending"
          name="group1"
          type="radio"
          id={`inline-1`}
          onChange={() =>
            productDispatch({
              type: SORT_BY_PRICE,
              payload: LOW_TO_HIGH,
            })
          }
          checked={sort === "lowTowHigh" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Descending"
          name="group1"
          type="radio"
          id={`inline-2`}
          onChange={() =>
            productDispatch({
              type: SORT_BY_PRICE,
              payload: HIGH_TO_LOW,
            })
          }
          checked={sort === "highToLow" ? true : false}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Include out of stocks"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={()=>productDispatch({
            type:FILTER_BY_STOCK
          })}
          checked={byStock}
        />
      </span>
      <span>
        <Form.Check
          inline
          label="Fast Deleviry only"
          name="group1"
          type="checkbox"
          id={`inline-3`}
          onChange={()=>productDispatch({
            type:FILTER_BY_DELIVERY
          })}
          checked={byFastDelivery}
        />
      </span>

      <span>
        <label style={{ paddingRight: 10 }}>Rating</label>
        <Rating
          rating={byRating}
          onClick={(i) =>
            productDispatch({
              type: FILTER_BY_RATING,
              payload: i + 1,
            })
          }
          style={{ cursor: "pointer" }}
        />
      </span>

      <Button variant="light" onClick={()=>productDispatch({
        type:CLEAR_FILTERS
      })} >Clear Filters</Button>
    </div>
  );
};

export default Filters;
